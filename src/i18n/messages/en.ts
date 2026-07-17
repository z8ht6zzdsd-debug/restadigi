import type { Messages } from "./types";

const plusBullets = [
  "Clear, compelling base copy for the home, services and contact pages — ready for a small business",
  "A professional website of up to 8 pages tailored to your business",
  "An easy-to-use admin panel so you can update content yourself",
  "Responsive build that works excellently on mobile, tablet and desktop",
  "Integrated contact form so customers can reach you easily",
  "Basic SEO optimisation including meta data, sitemap and performance tuning",
  "Fast delivery — website ready in as little as 5 business days",
  "30 days of customer support after launch for questions and small changes",
];

export const en: Messages = {
  meta: {
    defaultTitle: "Restadigi — Websites and digital visibility for businesses",
    defaultDescription:
      "Restadigi builds modern websites and strengthens businesses’ digital visibility. With the latest technology, sites launch quickly and stay easy to update.",
    ogTitle: "Restadigi — Websites and digital visibility for businesses",
    ogDescription:
      "Modern websites, SEO and digital visibility services to support your business growth.",
  },
  notFound: {
    code: "404",
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
  },
  error: {
    title: "This page didn't load",
    description: "Something went wrong on our end. You can try refreshing or head back home.",
    tryAgain: "Try again",
    goHome: "Go home",
  },
  header: {
    services: "Services",
    industries: "Industries",
    languages: "Languages",
    menu: "Menu",
    homeAria: "Restadigi — home",
    logoAlt: "Restadigi — AI and web",
    industriesIntro:
      "Industry-specific digital solutions — websites, bookings, visibility and AI customer service for service businesses.",
    industriesList: [
      {
        title: "Arenas, events and performers",
        body: "Websites, digital visibility and ticketing solutions that bring fans, tickets and artists together — clearly and on brand.",
      },
      {
        title: "Hotels and hostels",
        body: "Booking management and sales, digital check-in and guest registration, AI customer service 24/7 — the digital backbone of hospitality.",
      },
      {
        title: "Travel and activities",
        body: "Booking systems, visibility and sales solutions plus AI customer service so activities and experiences are easy to find and book.",
      },
      {
        title: "Restaurants",
        body: "From fine dining to fast food: websites, mobile apps, table reservations and AI customer service — sales and service around the clock.",
      },
      {
        title: "Cafés and kiosks",
        body: "Stylish websites and a mobile app with a loyalty programme — brand, repeat visits and customer relationships in one package.",
      },
      {
        title: "Gyms and personal trainers",
        body: "A custom training-schedule dashboard — bookings, timetables and client messaging in one clear view.",
      },
      {
        title: "Barbers, salons and wellness",
        body: "Modern websites and appointment booking so your services are found, booked and sold without endless phone tag.",
      },
    ],
    servicesList: [
      { to: "/kotisivut-yrityksille", label: "Websites" },
      { to: "/diginakyvyys", label: "Visibility & design" },
      { to: "/chatbot", label: "AI customer service" },
      { to: "/potyvarauspalvelu", label: "Table reservations" },
      { to: "/yllapito", label: "Hosting & maintenance" },
    ],
    languagesList: [
      { code: "fi", label: "Suomi" },
      { code: "en", label: "English" },
      { code: "es", label: "Español" },
    ],
  },
  footer: {
    copyright: "© {year} Restadigi — Helsinki",
    instagram: "Instagram",
    behance: "Behance",
    linkedin: "LinkedIn",
  },
  home: {
    meta: {
      title: "Restadigi — Smart websites and digital solutions for service businesses",
      description:
        "We build websites, mobile apps and other smart digital solutions for service businesses — including booking systems, customer service and sales.",
      ogTitle: "Restadigi — A smart website that serves your customers",
      ogDescription: "Websites, mobile apps and smart digital solutions for service businesses.",
    },
    hero: {
      titleBefore: "A smart website that ",
      titleAccent: "serves your customers 24/7",
      titleAfter: ".",
      description:
        "We build websites, mobile apps and other smart digital solutions for service businesses — quickly and cost-effectively. The full package includes websites, booking systems, customer service and sales.",
      cta: "Request a quote",
    },
    intro: {
      titleLine1: "Industry-specific solutions.",
      titleLine2: "Get in touch — let's talk.",
      body: "We want to understand how your business works in detail so we can serve you as well as possible. Every project starts with at least a 30-minute discovery call. Book a time below or call us directly — together we'll find the right solution for you.",
      callCta: "Call us",
      phoneDisplay: "+358 403 738 332",
      phoneTel: "+358403738332",
      whatsappCta: "WhatsApp call",
      bookCta: "Book a time →",
    },
    whyUs: {
      titleBefore: "Why choose ",
      titleAccent: "us",
      titleAfter: "?",
      description:
        "Our clients value industry insight, sensible pricing and digital solutions that grow with the business.",
      items: [
        {
          title: "Business understanding",
          body: "Our long entrepreneurial background in hospitality, travel and restaurants helps us understand your business as a whole. We want to grow your sales from day one and keep growing with you as a digital business partner.",
          href: "/yhteys",
          linkLabel: "Book a discovery call",
        },
        {
          title: "Affordability",
          body: "Costs run high in the service sector, and finding new customers can be hard. Thanks to AI we deliver services at a sensible price without compromising quality — the best value on the market.",
          href: "/kotisivut-yrityksille",
          linkLabel: "See packages",
        },
        {
          title: "Automated operations",
          body: "An AI customer-service bot handles support, bookings via chat, phone and email 24/7 — for a fixed monthly fee from 29 € / month.",
          href: "/chatbot",
          linkLabel: "Explore AI service",
        },
        {
          title: "Effortless content management",
          body: "Update your menu, prices, opening hours and images from your own admin panel. Content maintenance is a few clicks — no technical skills required.",
          href: "/kotisivut-yrityksille",
          linkLabel: "Learn more",
        },
      ],
    },
    projects: {
      titleBefore: "Selected ",
      titleAccent: "projects",
      delfin: {
        logoAlt: "Delfin Check-In app logo",
        screenAlt: "Delfin Check-In app screen",
        calendarAlt: "Delfin Check-In calendar view",
        title: "Delfin Check-In",
        titleAccent: "— service & mobile app",
        platforms: "App Store & Google Play",
        body: "A check-in and guest-registration app for hosts and accommodation businesses. It syncs bookings, manages guests and handles regulatory reporting — available on Apple and Google app stores.",
        link: "View on the App Store →",
      },
      rafa: {
        heroAlt: "Rafa Romera musician website",
        logoAlt: "Rafa Romera logo",
        title: "Rafa Romera",
        titleAccent: "— website & Spotify integration",
        tag: "Artist website",
        body: "Website for Andalusian musician Rafa Romera with Spotify integration — biography, discography, gallery and upcoming concerts in one place that sends listeners straight to the music.",
        link: "Open website →",
      },
    },
    cta: {
      titleBefore: "Ready to take the ",
      titleAccent: "next step",
      titleAfter: "?",
      quoteCta: "Request a quote",
      callCta: "Call us →",
      whatsappCta: "WhatsApp →",
    },
  },
  contact: {
    meta: {
      title: "Contact — Restadigi",
      description:
        "Tell us about your project — we'll get back to you within one business day. info@restadigi.fi",
      ogTitle: "Contact — Restadigi",
      ogDescription: "Tell us about your project — we'll get back to you within one business day.",
    },
    hero: {
      titleBefore: "Tell us about ",
      titleAccent: "your project",
      titleAfter: ".",
      description:
        "We usually reply within one business day. You can also email us directly or book a short call.",
    },
    labels: {
      email: "Email",
      phone: "Phone",
      whatsapp: "WhatsApp",
      studio: "Studio",
      social: "Social",
    },
    email: "info@restadigi.fi",
    phoneDisplay: "+358 403 738 332",
    phoneTel: "+358403738332",
    studioLine1: "Helsinki, Finland",
    studioLine2: "Remote across Europe",
    form: {
      name: "Name",
      company: "Company",
      email: "Email",
      budget: "Budget",
      message: "Message",
      messagePlaceholder: "Tell us about the project, timeline and goals…",
      selectPlaceholder: "Select…",
      submit: "Send message",
      sending: "Opening your email client…",
      budgetOptions: [
        "Under 1 000 €",
        "1 000 – 2 500 €",
        "2 500 – 5 000 €",
        "Over 5 000 €",
        "Not sure yet",
      ],
      mailSubject: "Project enquiry — {name}",
      mailBody:
        "Name: {name}\nCompany: {company}\nEmail: {email}\nBudget: {budget}\n\nMessage:\n{message}",
    },
  },
  about: {
    meta: {
      title: "About us — Restadigi",
      description:
        "Restadigi is a small studio that builds websites and strengthens companies’ digital visibility. Learn how we work.",
      ogTitle: "About us — Restadigi",
      ogDescription:
        "A small studio, big responsibility. Websites and digital visibility for businesses.",
    },
    eyebrow: "About us",
    titleBefore: "A small studio, ",
    titleAccent: "big",
    titleAfter: " responsibility.",
    lead: "Restadigi is an independent digital studio that builds websites and strengthens the digital visibility of small and medium-sized businesses. We use the latest technology so sites launch quickly, work on every device and stay easy to update.",
    secondary:
      "We prefer long-term partnerships: the same hands that design your site also help grow its visibility and development going forward.",
    imageAlt: "Chef preparing a dish in a restaurant kitchen",
    values: [
      {
        titleAccent: "Handcrafted",
        titleRest: "work",
        body: "No templates. Every project is designed from scratch around your goals.",
      },
      {
        titleAccent: "Transparent",
        titleRest: "pricing",
        body: "Clear packages and add-ons — you know what you're paying for, start to finish.",
      },
      {
        titleAccent: "Long-term",
        titleRest: "partnership",
        body: "We help after launch too — with updates, development and maintenance.",
      },
    ],
    process: {
      titleBefore: "Four ",
      titleAccent: "steps",
      titleAfter: " to a finished website.",
      steps: [
        {
          n: "01",
          title: "Conversation",
          body: "We map goals, audience and timeline together.",
        },
        {
          n: "02",
          title: "Design",
          body: "Structure, visual identity and content are refined iteratively.",
        },
        {
          n: "03",
          title: "Build",
          body: "We build the site search-optimised and accessible.",
        },
        {
          n: "04",
          title: "Launch & support",
          body: "Launch, admin training and ongoing support.",
        },
      ],
    },
    cta: {
      titleBefore: "Does a ",
      titleAccent: "partnership",
      titleAfter: " sound good?",
      button: "Get in touch",
    },
  },
  websites: {
    meta: {
      title: "Websites for businesses — Restadigi",
      description:
        "Clear, impactful website packages and graphic add-ons for companies and associations.",
      ogTitle: "Websites for businesses — Restadigi",
      ogDescription: "Website packages and graphic add-ons tailored to your business.",
    },
    hero: {
      titleBefore: "Websites for ",
      titleAccent: "your business",
      titleAfter: ".",
      description:
        "Well-designed websites and web content are your most important digital tools. They strengthen your brand visibility, make it easy for customers to reach you and leave a strong first impression.",
    },
    popular: "Popular",
    requestQuote: "Request a quote",
    packages: [
      {
        name: "Start",
        tagline: "A simple yet impactful site for a small business",
        price: "399 € + VAT",
        bullets: [
          "Clear, compelling base copy for the home, services and contact pages — ready for a small business",
          "A professional 1–3 page website tailored to your business",
          "An easy-to-use admin panel so you can update content yourself",
          "Responsive build that works excellently on mobile, tablet and desktop",
          "Integrated contact form so customers can reach you easily",
          "Basic SEO optimisation including meta data, sitemap and performance tuning",
          "Fast delivery — website ready in as little as 5 business days",
          "30 days of customer support after launch for questions and small changes",
        ],
      },
      {
        name: "Plus",
        tagline: "A polished package that presents your services clearly",
        price: "549 € + VAT",
        bullets: [...plusBullets],
      },
      {
        name: "Gold",
        tagline: "Plus package plus a smart chatbot for customer service",
        price: "759 € + VAT",
        bullets: [...plusBullets, "Website chatbot — answers customers 24/7 and captures leads"],
      },
      {
        name: "Diamond",
        tagline: "Plus package plus Restadigi AI Concierge phone service",
        price: "929 € + VAT",
        featured: true,
        bullets: [
          ...plusBullets,
          "Restadigi AI Concierge — AI phone service for bookings and customer support 24/7",
        ],
      },
    ],
    footnoteBefore: "Package prices are fixed. Domain and hosting are chosen separately from ",
    footnoteLink: "hosting & maintenance",
    footnoteAfter: ".",
  },
  visibility: {
    meta: {
      title: "Digital visibility — Restadigi",
      description:
        "Get your digital visibility sorted: AI optimisation, Google optimisation and an elite sports visibility package.",
      ogTitle: "Digital visibility — Restadigi",
      ogDescription:
        "Three ways to grow visibility: AI optimisation, Google optimisation and an elite sports visibility package.",
    },
    hero: {
      titleBefore: "Digital visibility ",
      titleAccent: "sorted",
      titleAfter: " in one go.",
      description:
        "Three ways to grow visibility: AI optimisation, Google optimisation and micro-partnerships in Finland’s most popular sports leagues.",
    },
    popular: "Popular",
    contactCta: "Get in touch",
    resultPrefix: "You get:",
    packages: [
      {
        name: "AI optimisation",
        tagline: "Visible in ChatGPT, Claude, Gemini and Copilot searches too",
        description:
          "Web search is changing. More people find companies, products and services by talking to AI. Our AI optimisation service helps keep your business data up to date and ensures your website content supports AI tools in recognising your company in the right context.",
        price: "100 € / year",
        bullets: [
          "Baseline AI visibility review of your website",
          "Review of key business information",
          "Recommendations for basic optimisation of core content and meta data",
          "Identification of structural gaps",
          "Annual review and update",
        ],
        result: "Your business is part of tomorrow’s search as well.",
      },
      {
        name: "Google optimisation",
        tagline: "Make sure customers can find your business",
        description:
          "Google is still one of the most important channels for finding companies, products and services. Our Google optimisation is a light annual maintenance service that ensures your site meets key SEO basics and supports discoverability.",
        price: "100 € / year",
        bullets: [
          "Baseline SEO review of your website",
          "Review of page titles and meta descriptions",
          "Assessment of your main search keywords",
          "Check of technical fundamentals",
          "Recommendations to improve visibility",
          "Annual review and update",
        ],
        result: "Your Google visibility stays up to date.",
      },
      {
        name: "Elite sports visibility package",
        tagline: "Visibility in Finland’s most popular sports leagues",
        description:
          "Elite sport gives businesses a unique way to reach customers, strengthen their brand and build trust. We offer affordable micro-partnerships with clubs in Liiga, Veikkausliiga and Superpesis.",
        price: "from 299 € / year",
        featured: true,
        bullets: [
          "Boardside and LED advertising at matches",
          "Visibility on arena media boards",
          "Company presentation or logo on the club website",
          "Visibility in the club’s digital channels",
          "Invitations to partner meetings and networking events",
          "Match tickets for customers or staff",
          "VIP services and match-day experiences",
          "Other club-specific partnership benefits",
        ],
        result:
          "A professional partnership, visibility to thousands of spectators and a positive sports image.",
      },
    ],
    footnote: "Prices are annual. You only pay for what you need — no hidden costs.",
    branding: {
      titleBefore: "Brand identity and ",
      titleAccent: "design",
      titleAfter: ".",
      description:
        "Complete your visibility with a professional brand look — logo and business cards.",
      customQuote: "Ask for a custom quote",
      extras: [
        { name: "Logo design", price: "149 €" },
        { name: "Business card design", price: "89 €" },
      ],
    },
    cta: {
      titleBefore: "Want better ",
      titleAccent: "visibility",
      titleAfter: "?",
      button: "Ask about visibility packages",
    },
  },
  chatbot: {
    meta: {
      title: "AI customer service — Restadigi",
      description:
        "A smart chatbot for your website — serves customers 24/7, answers questions, captures leads and frees up your team.",
      ogTitle: "AI customer service — Restadigi",
      ogDescription: "Website chatbot — round-the-clock sales and customer service.",
    },
    hero: {
      titleBefore: "Smart ",
      titleAccent: "customer service",
      titleAfter: " for your business.",
      description:
        "Restadigi’s chatbot is installed on your website and serves customers around the clock — answers questions, guides people to the right services and captures leads.",
    },
    chatbot: {
      eyebrow: "Chatbot",
      titleBefore: "A smart ",
      titleAccent: "chatbot",
      titleAfter: " — your round-the-clock salesperson and support agent.",
      intro:
        "The chatbot is a smart virtual assistant installed on your website that serves customers 24/7 — answers common questions, guides people to the right services and captures leads. It doesn’t replace people; it acts as a reliable extra pair of hands when your team is off duty.",
      benefits: [
        {
          title: "Customer service 24/7",
          body: "The bot answers the most common questions instantly, so customers don’t have to wait or dig for information.",
        },
        {
          title: "Effective lead capture",
          body: "The bot guides visitors smoothly along the purchase path and collects contact details — even overnight.",
        },
        {
          title: "Higher conversion",
          body: "The barrier to getting in touch is low. With a chatbot, more visitors become paying customers.",
        },
        {
          title: "Resource savings",
          body: "Routine questions move to the bot, freeing time for more demanding work.",
        },
      ],
      safeTitleBefore: "A safe and ",
      safeTitleAccent: "effortless",
      safeTitleAfter: " solution.",
      safeBody:
        "For a chatbot to deliver year after year, it needs ongoing care. Our monthly service model keeps the bot improving and working seamlessly with your changing data and technology.",
      monthly: [
        {
          title: "Always up-to-date technology",
          body: "The web and AI evolve constantly. With a monthly fee we ensure your bot always runs on the latest, most secure platform.",
        },
        {
          title: "Trained on your data",
          body: "The bot can be taught. Monthly maintenance lets us train it with your latest product info, campaigns and answers.",
        },
        {
          title: "Proactive development",
          body: "We analyse conversation history and optimise the bot to meet your customers’ most common needs even better.",
        },
        {
          title: "Turnkey service",
          body: "You don’t need to worry about technical setup or coding. Our specialists handle maintenance.",
        },
      ],
    },
    cta: {
      titleBefore: "Serve better. Capture leads. ",
      titleAccent: "Grow more efficiently.",
      body: "Restadigi builds digital solutions for service businesses. Our chatbot helps you improve the customer experience, streamline operations and grow sales with an easy-to-adopt AI tool.",
      questions: [
        "What are the most common questions your customers ask?",
        "Should the bot focus more on customer service or on sales and lead capture?",
        "Which languages should the bot use with visitors?",
      ],
      button: "Request a free demo",
    },
  },
  booking: {
    meta: {
      title: "Table reservation service — Restadigi",
      description:
        "A modern table reservation service for restaurants — guests book a table directly from your website around the clock.",
      ogTitle: "Table reservation service — Restadigi",
      ogDescription: "Smooth table reservations directly from your restaurant website.",
    },
    hero: {
      titleAccent: "Table reservations",
      titleAfter: " straight from your site.",
      description:
        "We integrate a modern table reservation service into your restaurant website that works around the clock. Guests pick a time and party size, get email confirmation, and your staff see bookings in a clear admin panel.",
    },
    dashboard: {
      eyebrow: "Admin panel",
      titleBefore: "Bookings in a ",
      titleAccent: "calendar",
      titleAfter: " and list.",
      body: "Staff see the day’s table reservations on tablet or desktop — confirm, cancel and track availability at a glance.",
    },
    floorPlan: {
      eyebrow: "Floor plan",
      titleBefore: "The room ",
      titleAccent: "on a map",
      titleAfter: " — phone to big screen.",
      body: "A customized floor plan for your restaurant’s seating. The same view works on phone, tablet and the restaurant’s large display.",
    },
    features: [
      {
        title: "Bookings 24/7",
        body: "Guests can book a table when it suits them — without phone calls.",
      },
      {
        title: "Fewer no-shows",
        body: "Automatic confirmations and reminders reduce missed arrivals.",
      },
      {
        title: "Clear management",
        body: "See the day’s bookings at a glance and adjust availability easily.",
      },
      {
        title: "Integrated into your site",
        body: "The service fits seamlessly with your restaurant website’s look and feel.",
      },
    ],
    cta: {
      titleBefore: "Take control of ",
      titleAccent: "table reservations",
      titleAfter: ".",
      price: "from 29 €",
      priceNote: "/ mo — fixed monthly price",
      button: "Ask for more",
    },
  },
  hosting: {
    meta: {
      title: "Hosting & maintenance — Restadigi",
      description:
        "Hosting and maintenance packages for businesses — fast hosting in Finland, domain, SSL and ongoing support.",
      ogTitle: "Hosting & maintenance — Restadigi",
      ogDescription: "Hosting and maintenance packages: Basic and Pro Business.",
    },
    hero: {
      titleBefore: "Hosting and ",
      titleAccent: "maintenance",
      titleAfter: ".",
      description:
        "We keep your site fast, secure and up to date. Choose a hosting and maintenance package — domain and SSL included.",
    },
    popular: "Popular",
    requestQuote: "Request a quote",
    packages: [
      {
        name: "Basic",
        price: "9,99 € / month + VAT",
        bullets: [
          "Hosting and domain included",
          "Fast, reliable hosting in Finland",
          "SSL certificate (HTTPS) included",
          "Domain (.fi or other) included",
        ],
      },
      {
        name: "Pro Business",
        price: "29,99 € / month + VAT",
        featured: true,
        bullets: [
          "Hosting and domain included",
          "Fast, reliable hosting in Finland",
          "SSL certificate (HTTPS) included",
          "Domain (.fi or other) included",
          "Email addresses included",
          "Ongoing maintenance and updates",
          "Small content changes included",
          "Security updates",
          "Personal phone support",
        ],
      },
    ],
    footnote:
      "Hosting and maintenance fees are billed monthly. Domain and SSL certificate are included.",
  },
  widget: {
    sales: {
      openLabel: "Customer service",
      closeLabel: "Close",
      openAria: "Open Restadigi customer service",
      closeAria: "Close customer service",
      dialogAria: "Restadigi customer service",
      eyebrow: "Restadigi",
      title: "Customer service",
      welcome:
        "Hi! I’m from Restadigi customer service — happy to help you find the right digital solution. Tell me a bit about your business and I’ll walk you through the services that fit. You can also leave your phone and email and we’ll get back to you.",
      placeholder: "Type your message…",
      sendAria: "Send message",
      typing: "Typing…",
      sendFailed: "Failed to send message.",
      genericError: "Something went wrong.",
    },
    booking: {
      openLabel: "Book a table",
      closeLabel: "Close chat",
      openAria: "Open table booking",
      closeAria: "Close table booking",
      dialogAria: "Restaurant table booking",
      eyebrow: "Reservations",
      title: "Book a table",
      welcome:
        "Hi! I can help you book a table. Share your name, party size, date, time (12:00–22:00) and phone number. Email is optional. Standard seating is 2 hours — 3 hours is available on request.",
      placeholder: "Type your message…",
      sendAria: "Send message",
      typing: "Typing…",
      sendFailed: "Failed to send message.",
      genericError: "Something went wrong.",
    },
  },
};
