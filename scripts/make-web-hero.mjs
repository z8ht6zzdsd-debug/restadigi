import puppeteer from "puppeteer";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "src", "assets");
const outFile = path.join(outDir, "hero-web-devices.jpg");

const URL = "https://freddos.es/";

async function capture(page, width, height, name) {
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 90000 });
  await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")];
    const accept = buttons.find((b) =>
      /aceptar|accept|allow|hyväksy/i.test(b.textContent || ""),
    );
    accept?.click();
  });
  await new Promise((r) => setTimeout(r, 1200));
  const file = path.join(outDir, `_freddo-${name}.png`);
  await page.screenshot({ path: file, type: "png" });
  return file;
}

function roundedRectSvg(w, h, r, fill = "#111") {
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="${fill}"/></svg>`,
  );
}

async function framedScreen(shotPath, screenW, screenH, bezel, radius, extraBottom = 0) {
  const frameW = screenW + bezel * 2;
  const frameH = screenH + bezel * 2 + extraBottom;
  const screen = await sharp(shotPath)
    .resize(screenW, screenH, { fit: "cover", position: "top" })
    .png()
    .toBuffer();

  const mask = roundedRectSvg(screenW, screenH, Math.max(4, radius - 6), "#fff");
  const roundedScreen = await sharp(screen)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const frame = await sharp({
    create: {
      width: frameW,
      height: frameH,
      channels: 4,
      background: { r: 28, g: 24, b: 22, alpha: 1 },
    },
  })
    .composite([
      {
        input: roundedRectSvg(frameW, frameH, radius, "#1c1816"),
        blend: "dest-in",
      },
      {
        input: roundedScreen,
        left: bezel,
        top: bezel,
      },
    ])
    .png()
    .toBuffer();

  return { buf: frame, w: frameW, h: frameH };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  const desktopPath = await capture(page, 1440, 900, "desktop");
  const tabletPath = await capture(page, 834, 1112, "tablet");
  const mobilePath = await capture(page, 390, 844, "mobile");
  await browser.close();

  // Device sizes for composition (hero ~2000x1200)
  const canvasW = 2000;
  const canvasH = 1200;

  const laptop = await framedScreen(desktopPath, 980, 620, 18, 18, 36);
  const tablet = await framedScreen(tabletPath, 340, 455, 14, 22, 0);
  const phone = await framedScreen(mobilePath, 190, 410, 10, 28, 0);

  // Soft warm coffee-toned background matching Freddos vibe
  const bg = await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 3,
      background: { r: 58, g: 42, b: 34 },
    },
  })
    .composite([
      {
        input: await sharp({
          create: {
            width: canvasW,
            height: canvasH,
            channels: 4,
            background: { r: 90, g: 60, b: 45, alpha: 0.35 },
          },
        })
          .blur(80)
          .png()
          .toBuffer(),
        blend: "over",
      },
    ])
    .png()
    .toBuffer();

  const laptopX = Math.round((canvasW - laptop.w) / 2) - 40;
  const laptopY = 150;
  const tabletX = laptopX + laptop.w - 80;
  const tabletY = 280;
  const phoneX = laptopX - 70;
  const phoneY = 320;

  await sharp(bg)
    .composite([
      { input: laptop.buf, left: laptopX, top: laptopY },
      { input: tablet.buf, left: tabletX, top: tabletY },
      { input: phone.buf, left: phoneX, top: phoneY },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outFile);

  console.log("Wrote", outFile);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
