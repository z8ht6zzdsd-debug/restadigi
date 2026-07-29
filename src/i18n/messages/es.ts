import type { Messages } from "./types";
import {
  CONTACT_ADDRESS,
  CONTACT_COMPANY,
  CONTACT_EMAIL,
  CONTACT_PERSON,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_DISPLAY,
} from "@/lib/company-contact";

const siteIntroBullet =
  "Textos base claros y atractivos para inicio, servicios y contacto — paquete llave en mano y formación completa de uso";

const siteSharedBullets = [
  "Panel de administración fácil de usar para actualizar contenidos tú mismo",
  "Diseño responsive que funciona excelentemente en móvil, tablet y ordenador",
  "Formulario de contacto integrado para que tus clientes te encuentren fácilmente",
  "SEO básico que incluye metadatos, mapa del sitio y optimización del rendimiento",
  "Entrega rápida — sitio listo en tan solo 5 días laborables",
  "30 días de soporte al cliente tras el lanzamiento para consultas y pequeños cambios",
];

const withSitePages = (pagesBullet: string, extras: string[] = []) => [
  siteIntroBullet,
  pagesBullet,
  ...siteSharedBullets,
  ...extras,
];

export const es: Messages = {
  meta: {
    defaultTitle: "Restadigi — Sitios web y visibilidad digital para empresas",
    defaultDescription:
      "Restadigi crea sitios web modernos y refuerza la visibilidad digital de las empresas. Con la tecnología más reciente, los sitios se lanzan rápido y son fáciles de actualizar.",
    ogTitle: "Restadigi — Sitios web y visibilidad digital para empresas",
    ogDescription:
      "Sitios web modernos, SEO y servicios de visibilidad digital para el crecimiento de tu empresa.",
  },
  notFound: {
    code: "404",
    title: "Página no encontrada",
    description: "La página que buscas no existe o ha sido movida.",
    goHome: "Ir al inicio",
  },
  error: {
    title: "Esta página no se cargó",
    description: "Algo salió mal de nuestra parte. Puedes intentar de nuevo o volver al inicio.",
    tryAgain: "Intentar de nuevo",
    goHome: "Ir al inicio",
  },
  header: {
    services: "Servicios",
    industries: "Sectores",
    pricing: "Precios",
    languages: "Idiomas",
    contact: "Contacto",
    menu: "Menú",
    homeAria: "Restadigi — inicio",
    logoAlt: "Restadigi Finland",
    servicesIntro:
      "Restadigi ofrece una amplia gama de servicios digitales para que restaurantes, alojamiento y empresas de servicios vendan, reserven y atiendan online — con claridad.\n\nDescubre nuestros servicios y encuentra la combinación adecuada para tu negocio.",
    industriesIntro:
      "Restadigi ofrece una amplia gama de soluciones digitales por sector, diseñadas para apoyar el negocio en distintos entornos.\n\nDescubre los servicios desarrollados para cada sector y encuentra el tuyo.",
    industriesList: [
      {
        title: "Estadios, eventos y artistas",
        body: "Sitios web, visibilidad digital y soluciones de entradas y ventas que unen a fans, entradas y artistas — con claridad y fidelidad a la marca.",
      },
      {
        title: "Hoteles y hostales",
        body: "Gestión y venta de reservas, check-in digital y registro de viajeros, atención con IA 24/7 — la columna digital del alojamiento.",
      },
      {
        title: "Turismo y actividades",
        body: "Sistemas de reserva, soluciones de visibilidad y ventas, además de atención con IA para que las actividades y experiencias se encuentren y reserven con facilidad.",
      },
      {
        title: "Restaurantes",
        body: "Del fine dining a la comida rápida: sitios web, apps móviles, reservas de mesa y atención con IA — ventas y servicio las 24 horas.",
      },
      {
        title: "Bares, pubs y discotecas",
        body: "Servicio rápido y ventas claras: sitios web, eventos, reservas de mesa y sala, además de atención con IA para que la noche fluya.",
      },
      {
        title: "Cafeterías y kioscos",
        body: "Sitios web elegantes y una app móvil con programa de fidelización — marca, repetición y relación con el cliente en un solo conjunto.",
      },
    ],
    servicesList: [
      {
        to: "/verkkosivut",
        label: "Sitios web",
        body: "Sitios modernos donde la marca, las ventas y el contenido se mantienen al día.",
      },
      {
        to: "/restatable",
        label: "Restatable",
        body: "Reservas desde canales al salón — gestión en una sola vista.",
      },
      {
        to: "/majoitusvaraus",
        label: "Restabooking",
        body: "Reservas de alojamiento en tu web — hoteles, posadas y cabañas.",
      },
      {
        to: "/restachat",
        label: "Restachat",
        body: "Chatbot inteligente para ventas y atención al cliente 24/7.",
      },
      {
        to: "/nakyvyys",
        label: "Visibilidad",
        body: "Paquetes de visibilidad AI, Google y deporte para crecer.",
      },
      {
        to: "/graafinen-suunnittelu",
        label: "Diseño gráfico",
        body: "Logo, imagen de marca y materiales de marketing en un solo lugar.",
      },
      {
        to: "/yllapito",
        label: "Hosting y mantenimiento",
        body: "Hosting, dominio, SSL y soporte continuo en Finlandia.",
      },
    ],
    languagesList: [
      { code: "fi", label: "Suomi" },
      { code: "en", label: "English" },
      { code: "es", label: "Español" },
    ],
    contactIntro:
      "Aquí encontrarás datos de contacto e información de la empresa. Contáctanos — estaremos encantados de ayudar.",
    contactCta: "Ir a la página de contacto",
    contactLinks: [
      {
        title: "Datos de contacto",
        body: "Teléfono, correo y WhatsApp — escríbenos directamente.",
        to: "/yhteys",
      },
      {
        title: "Sobre nosotros",
        body: "Conoce Restadigi y cómo creamos servicios digitales.",
        to: "/meista",
      },
    ],
    contactPanel: {
      company: CONTACT_COMPANY,
      person: CONTACT_PERSON,
      address: CONTACT_ADDRESS,
      emailLabel: "Correo",
      email: CONTACT_EMAIL,
      phoneLabel: "Teléfono",
      whatsappLabel: "WhatsApp",
      phoneDisplay: CONTACT_PHONE_DISPLAY,
      phoneTel: CONTACT_PHONE_TEL,
      whatsappDisplay: CONTACT_WHATSAPP_DISPLAY,
    },
  },
  footer: {
    copyright: "© {year} Restadigi",
    privacy: "Privacidad",
    cookies: "Cookies",
    terms: "Términos",
    legalNavLabel: "Legal",
  },
  cookies: {
    openAria: "Abrir ajustes de cookies",
    closeAria: "Cerrar ajustes de cookies",
    bannerTitle: "Usamos cookies",
    bannerBody:
      "Usamos cookies necesarias para que el sitio funcione. Las de estadísticas y marketing solo si las aceptas. Puedes cambiar tu elección en cualquier momento.",
    acceptAll: "Aceptar todas",
    necessaryOnly: "Solo necesarias",
    settings: "Ajustes",
    panelTitle: "Ajustes de cookies",
    panelIntro:
      "Elige qué cookies permites. Las necesarias son imprescindibles para el funcionamiento básico y no se pueden desactivar.",
    currentStatus: "Estado actual",
    on: "Activo",
    off: "Inactivo",
    alwaysOn: "Siempre activo",
    hideDetails: "Ocultar detalles",
    showDetails: "Mostrar detalles",
    acceptedAt: "Fecha de consentimiento",
    consentId: "Tu ID de consentimiento",
    withdraw: "Retirar consentimiento",
    saveChanges: "Cambiar consentimiento",
    saveChoices: "Guardar elección",
    privacyLink: "Política de privacidad",
    cookiePolicyLink: "Política de cookies",
    categories: {
      necessary: "Necesarias",
      preferences: "Preferencias",
      statistics: "Estadísticas",
      marketing: "Marketing",
    },
    categoryHelp: {
      necessary: "Inicio de sesión, seguridad y funciones básicas del sitio.",
      preferences: "Recuerda tus opciones (p. ej. idioma) cuando proceda.",
      statistics: "Estadísticas anónimas de uso para mejorar el sitio. No se venden a terceros.",
      marketing:
        "Medición publicitaria y remarketing. Desactivadas por defecto hasta que consientas.",
    },
  },
  legal: {
    privacy: {
      metaTitle: "Política de privacidad — Restadigi",
      metaDescription: "Política de privacidad de Restadigi: qué datos tratamos y por qué.",
      title: "Política de privacidad",
      updated: "Actualizado el 23 de julio de 2026",
      sections: [
        {
          heading: "Responsable",
          body: "Restadigi Finland / Ville Nieminen, Erkkiläntie 47, 04740 Mäntsälä, Finlandia. Contacto: info@restadigi.fi, +358 403 738 332.",
        },
        {
          heading: "Qué datos recogemos",
          body: "Por formularios y chat: nombre, empresa, correo, teléfono y mensaje. Logs técnicos (IP, navegador) por seguridad. No recogemos datos innecesarios.",
        },
        {
          heading: "Finalidad y base legal",
          body: "Tratamos los datos para responder consultas, preparar presupuestos y contratos (contrato / interés legítimo) y cumplir obligaciones legales. Marketing solo con consentimiento u otra base legítima.",
        },
        {
          heading: "Conservación",
          body: "Los datos de contacto se conservan mientras dure la relación o el proceso de oferta, normalmente hasta 24 meses tras el último contacto, salvo obligación legal más larga.",
        },
        {
          heading: "Encargados y transferencias",
          body: "Usamos proveedores de confianza (hosting, correo, base de datos). No vendemos datos. Las transferencias fuera de la UE/EEE usan garantías adecuadas cuando proceda.",
        },
        {
          heading: "Tus derechos",
          body: "Puedes acceder, rectificar, suprimir o limitar el tratamiento y oponerte. También puedes reclamar ante la autoridad de control. Contacto: info@restadigi.fi.",
        },
      ],
    },
    cookies: {
      metaTitle: "Política de cookies — Restadigi",
      metaDescription: "Cómo Restadigi usa cookies y tecnologías similares.",
      title: "Política de cookies",
      updated: "Actualizado el 23 de julio de 2026",
      sections: [
        {
          heading: "Qué son las cookies",
          body: "Son archivos pequeños o almacenamiento local que ayudan al sitio a funcionar, recordar opciones o medir el uso.",
        },
        {
          heading: "Necesarias",
          body: "Imprescindibles para un funcionamiento seguro (p. ej. sesión de admin, guardar preferencias de cookies). No se pueden rechazar.",
        },
        {
          heading: "Preferencias, estadísticas y marketing",
          body: "Solo si las aceptas en los ajustes. Las estadísticas nos ayudan a mejorar el sitio. Las de marketing permanecen desactivadas por defecto.",
        },
        {
          heading: "Gestionar el consentimiento",
          body: "Abre los ajustes de cookies en cualquier momento desde el botón inferior izquierdo. Puedes retirar el consentimiento. Ver también la política de privacidad.",
        },
      ],
    },
    terms: {
      metaTitle: "Términos de uso — Restadigi",
      metaDescription: "Términos generales de uso del sitio y servicios Restadigi.",
      title: "Términos de uso",
      updated: "Actualizado el 23 de julio de 2026",
      sections: [
        {
          heading: "Uso del sitio",
          body: "Restadigi.fi informa sobre servicios digitales. Las condiciones vinculantes se acuerdan por escrito en presupuesto o contrato.",
        },
        {
          heading: "Servicios y precios",
          body: "Los precios y paquetes del sitio pueden cambiar. El precio final se confirma en presupuesto. Las condiciones de pago se acuerdan por proyecto.",
        },
        {
          heading: "Propiedad intelectual",
          body: "Los contenidos y la marca pertenecen a Restadigi o a sus licenciantes. No copies sin permiso.",
        },
        {
          heading: "Responsabilidad",
          body: "Procuramos información actualizada, pero no garantizamos disponibilidad ininterrumpida. No respondemos de daños indirectos en la medida que permita la ley.",
        },
        {
          heading: "Contacto",
          body: "Restadigi Finland, Erkkiläntie 47, 04740 Mäntsälä. info@restadigi.fi · +358 403 738 332.",
        },
      ],
    },
  },
  home: {
    meta: {
      title:
        "Restadigi — Sitios web inteligentes y soluciones digitales para empresas de servicios",
      description:
        "Creamos sitios web, apps móviles y otras soluciones digitales inteligentes para empresas de servicios — incluidos sistemas de reserva, atención al cliente y ventas.",
      ogTitle: "Restadigi — Un sitio web inteligente que atiende a tus clientes",
      ogDescription:
        "Sitios web, apps móviles y soluciones digitales inteligentes para empresas de servicios.",
    },
    hero: {
      titleBefore: "Un sitio web inteligente que ",
      titleAccent: "atiende a tus clientes 24/7",
      titleAfter: ".",
      description:
        "Sitios web, reservas y atención con IA — un conjunto digital para empresas de servicios. Paquetes claros, entrega rápida y soporte al crecimiento.",
      cta: "Solicitar presupuesto",
    },
    sitePreview: {
      navMenu: "Menú",
      navHours: "Horario",
      navContact: "Contacto",
      tagline: "Helsinki · Café",
      openBadge: "Abierto hoy 8–18",
      bookTable: "Pedir para llevar",
      customerService: "Atención al cliente",
      tileSpecialMenus: "Espresso",
      tileEvents: "Latte",
      tileGroups: "Brunch",
    },
    barberPreview: {
      brand: "Freddos",
      menu: "Menú",
      tagline: "Café · Para llevar",
      headline: "Fresco en tu taza.",
      bookCta: "Pedir",
      bookShort: "Pedir",
      services: ["Espresso", "Ice latte", "Brunch"],
    },
    intro: {
      titleLine1: "Soluciones por sector.",
      titleLine2: "Contacta con nosotros, hablemos.",
      body: "Queremos conocer a fondo cómo funciona tu empresa para servirte lo mejor posible. Todos los proyectos empiezan con una llamada de presentación de al menos 30 minutos. Contacta abajo o llámanos directamente — juntos encontraremos la solución adecuada.",
      callCta: "Llámanos",
      phoneDisplay: CONTACT_PHONE_DISPLAY,
      phoneTel: CONTACT_PHONE_TEL,
      whatsappCta: "Llamada WhatsApp",
      bookCta: "Solicitar presupuesto →",
    },
    whyUs: {
      titleBefore: "¿Por qué ",
      titleAccent: "elegirnos",
      titleAfter: "?",
      description:
        "Nuestros clientes valoran el conocimiento del sector, precios sensatos y soluciones digitales que crecen con el negocio.",
      items: [
        {
          title: "Comprensión del negocio",
          body: "Nuestra larga trayectoria emprendedora en hostelería, turismo y restauración nos ayuda a entender tu negocio de forma integral. Queremos aumentar tus ventas desde el primer día y seguir creciendo contigo como socio digital.",
          href: "/form",
          linkLabel: "Solicitar presupuesto",
        },
        {
          title: "Precio asequible",
          body: "Los costes son altos en el sector servicios y encontrar nuevos clientes puede ser difícil. Gracias a la IA ofrecemos servicios a un precio razonable sin sacrificar la calidad — la mejor relación calidad-precio del mercado.",
          href: "/verkkosivut",
          linkLabel: "Ver paquetes",
        },
        {
          title: "Operaciones automatizadas",
          body: "Un bot Restachat gestiona por ti el servicio al cliente y la recepción de reservas por chat, teléfono y correo 24/7. Precio mensual fijo de 29 € / mes.",
          href: "/restachat",
          linkLabel: "Conocer Restachat",
        },
        {
          title: "Gestión de contenidos sin esfuerzo",
          body: "Actualiza el menú, precios, horarios e imágenes desde tu propio panel. El mantenimiento de contenidos se hace con unos clics — sin conocimientos técnicos.",
          href: "/verkkosivut",
          linkLabel: "Más información",
        },
      ],
    },
    serviceTeasers: {
      title: "Servicios inteligentes 24/7",
      items: [
        {
          title: "Restachat",
          body: "Un chatbot atiende a tus clientes — responde preguntas, captura leads y libera a tu equipo.",
          href: "/restachat",
          linkLabel: "Conocer Restachat",
        },
        {
          title: "Restatable & Restabooking",
          body: "Reservas de mesa y alojamiento digitales — Restatable para restaurantes, Restabooking para hoteles, posadas y cabañas.",
          href: "/restatable",
          linkLabel: "Restatable",
          href2: "/majoitusvaraus",
          linkLabel2: "Restabooking",
        },
        {
          title: "Sitios web",
          body: "Sitios web modernos y sectoriales — paquetes claros, panel de administración y soporte para crecer.",
          href: "/verkkosivut",
          linkLabel: "Conocer sitios web",
        },
      ],
    },
    bookingPromo: {
      title: "Restatable — reservas de mesa",
      body: "Precio mensual fijo — 39 € / mes.",
      linkLabel: "Leer más",
    },
    stayBookingPromo: {
      title: "Restabooking — reservas de alojamiento",
      body: "Precio mensual fijo — 45 € / mes.",
      linkLabel: "Leer más",
    },
    dashboardDemoPromo: {
      title: "Descubre el panel de administración personalizable",
      body: "demo.restadigi.fi",
      linkLabel: "Descubrir",
      href: "https://demo.restadigi.fi",
    },
    projects: {
      titleBefore: "Últimas ",
      titleAccent: "referencias",
      delfin: {
        logoAlt: "Logo de la app Delfin Check-In",
        screenAlt: "Pantalla de la app Delfin Check-In",
        calendarAlt: "Vista de calendario de Delfin Check-In",
        title: "Delfin Check-In",
        titleAccent: "— servicio y app móvil",
        platforms: "App Store y Google Play",
        body: "App de check-in y registro de viajeros para anfitriones y empresas de alojamiento. Sincroniza reservas, gestiona huéspedes y se ocupa de los informes oficiales — disponible en las tiendas de Apple y Google.",
        link: "Ver en App Store →",
      },
      rafa: {
        heroAlt: "Sitio web del músico Rafa Romera",
        logoAlt: "Logo de Rafa Romera",
        title: "Rafa Romera",
        titleAccent: "— sitio web e integración con Spotify",
        tag: "Sitio de artista",
        body: "Sitio web del músico andaluz Rafa Romera con integración de Spotify — biografía, discografía, galería y próximos conciertos en un solo lugar que lleva a los oyentes directamente a la música.",
        link: "Abrir sitio →",
      },
    },
    testimonial: {
      quote:
        "Restadigi nos hizo una app móvil con la que los clientes pueden pedir bebidas por adelantado para recoger, pagar directamente en la app y acumular ventajas en el programa de fidelización — el servicio se volvió más rápido y la experiencia del cliente mejoró enseguida.",
      attribution: "Freddo's",
      role: "Café",
    },
    cta: {
      titleBefore: "¿Listo para dar el ",
      titleAccent: "siguiente paso",
      titleAfter: "?",
      quoteCta: "Solicitar presupuesto",
      callCta: "Llámanos →",
      whatsappCta: "WhatsApp →",
    },
  },
  contact: {
    meta: {
      title: "Contacto — Restadigi",
      description: `Cuéntanos tu proyecto; te responderemos en un día laborable. ${CONTACT_EMAIL}`,
      ogTitle: "Contacto — Restadigi",
      ogDescription: "Cuéntanos tu proyecto — te responderemos en un día laborable.",
    },
    hero: {
      titleBefore: "Cuéntanos ",
      titleAccent: "tu proyecto",
      titleAfter: ".",
      description:
        "Normalmente respondemos en un día laborable. También puedes escribirnos por correo o reservar una breve llamada.",
    },
    labels: {
      email: "Correo",
      phone: "Teléfono",
      whatsapp: "WhatsApp",
      studio: "Dirección",
      person: "Persona de contacto",
    },
    email: CONTACT_EMAIL,
    phoneDisplay: CONTACT_PHONE_DISPLAY,
    phoneTel: CONTACT_PHONE_TEL,
    whatsappDisplay: CONTACT_WHATSAPP_DISPLAY,
    studioLine1: CONTACT_ADDRESS,
    studioLine2: CONTACT_COMPANY,
    person: CONTACT_PERSON,
    form: {
      name: "Nombre",
      company: "Empresa",
      email: "Correo",
      budget: "Presupuesto",
      message: "Mensaje",
      messagePlaceholder: "Cuéntanos el proyecto, plazos y objetivos…",
      selectPlaceholder: "Seleccionar…",
      submit: "Enviar mensaje",
      sending: "Abriendo el cliente de correo…",
      budgetOptions: [
        "Menos de 1 000 €",
        "1 000 – 2 500 €",
        "2 500 – 5 000 €",
        "Más de 5 000 €",
        "Aún no lo sé",
      ],
      mailSubject: "Consulta de proyecto — {name}",
      mailBody:
        "Nombre: {name}\nEmpresa: {company}\nCorreo: {email}\nPresupuesto: {budget}\n\nMensaje:\n{message}",
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          question: "¿Cuánto cuesta Restadigi?",
          answer:
            "Los paquetes web empiezan en 399 €. Restachat cuesta 29 € / mes, Restatable 39 € / mes y Restabooking 45 € / mes. Visibilidad y hosting se presupuestan según necesidad — ver precios y páginas de servicio.",
        },
        {
          question: "¿Qué tan rápido se entrega un proyecto?",
          answer:
            "Un sitio básico puede estar listo en unos cinco días laborables si el contenido y las decisiones avanzan bien. Proyectos mayores (reservas, tienda, visibilidad) se planifican juntos.",
        },
        {
          question: "¿Quién es dueño del sitio y del contenido?",
          answer:
            "El sitio y el contenido son tuyos. Recibes un panel de administración para actualizar textos, imágenes y horarios sin conocimientos técnicos.",
        },
        {
          question: "¿Cómo funcionan el mantenimiento y el soporte?",
          answer:
            "Tras el lanzamiento tienes 30 días de soporte. Puedes continuar con hosting finlandés y un paquete de mantenimiento para actualizaciones y cambios pequeños.",
        },
        {
          question: "¿Cómo empieza la colaboración?",
          answer:
            "Empezamos con una breve llamada de presentación. Luego recibes una propuesta y, si hace falta, una demo. Puedes pedir presupuesto por el formulario o llamarnos.",
        },
      ],
    },
  },
  pricing: {
    meta: {
      title: "Precios — Restadigi",
      description:
        "Lista de precios de Restadigi: sitios web, visibilidad digital, diseño gráfico y hosting.",
      ogTitle: "Precios — Restadigi",
      ogDescription:
        "Precios claros de paquetes para sitios web, visibilidad, diseño gráfico y hosting.",
    },
    eyebrow: "Precios",
    titleBefore: "Precios ",
    titleAccent: "claros",
    titleAfter: " sin sorpresas.",
    lead: "Resumen de los precios de los paquetes. Consulta en la página de cada producto el contenido detallado de los paquetes.",
    sections: {
      websites: "Sitios web",
      visibility: "Visibilidad digital",
      branding: "Diseño gráfico",
      hosting: "Hosting y mantenimiento",
    },
    seeMore: "Ver el servicio",
    vatNote: "Los precios se indican sin IVA salvo que se indique lo contrario.",
  },
  about: {
    meta: {
      title: "Sobre nosotros — Restadigi",
      description:
        "Restadigi es un estudio digital fundado por dos emprendedores. Sitios web, visibilidad y servicios digitales — de emprendedores para emprendedores.",
      ogTitle: "Sobre nosotros — Restadigi",
      ogDescription: "Un equipo pequeño, una gran responsabilidad. Estudio digital para pymes.",
    },
    eyebrow: "Sobre nosotros",
    titleBefore: "Un equipo pequeño, ",
    titleAccent: "gran",
    titleAfter: " responsabilidad.",
    paragraphs: [
      "Restadigi es un estudio digital fundado por dos emprendedores que ayuda a pymes a crecer online. Creamos sitios web modernos, realizamos campañas publicitarias con resultados y desarrollamos la visibilidad digital de las empresas — de emprendedores para emprendedores.",
      "Nuestros servicios incluyen sitios web, tiendas online, sistemas de reservas y pedidos, SEO, marketing digital y desarrollo de la identidad visual. Usamos tecnología punta e inteligencia artificial, lo que agiliza las entregas, mejora la calidad y hace las soluciones más rentables.",
      "Aunque disponemos de herramientas modernas, creemos ante todo en el servicio personal. Con nosotros no eres un cliente más de una gran agencia: trabajas directamente con quienes construyen tu proyecto de principio a fin.",
    ],
    teamHeading: "Detrás de Restadigi:",
    team: [
      {
        name: "Ville Nieminen",
        body: "Responsable de marketing, publicidad, ventas, diseño gráfico y del crecimiento de la visibilidad de las empresas.",
      },
      {
        name: "Alberto Arroyo",
        body: "Responsable de la implementación técnica, el desarrollo de software, la construcción de sitios web y sistemas como reservas y pedidos.",
      },
    ],
    closing:
      "Trabajamos a largo plazo con nuestros clientes. Las mismas personas que planifican y construyen tu sitio también ayudan en su desarrollo, mantenimiento y marketing. Nuestro objetivo no es solo publicar sitios web, sino crear soluciones que impulsen el crecimiento de tu empresa a largo plazo.",
    cta: "Solicitar presupuesto",
  },
  websites: {
    meta: {
      title: "Sitios web para empresas — Restadigi",
      description:
        "Paquetes de sitios web claros e impactantes y extras gráficos para empresas y asociaciones.",
      ogTitle: "Sitios web para empresas — Restadigi",
      ogDescription:
        "Paquetes de sitios web y extras gráficos según las necesidades de tu empresa.",
    },
    hero: {
      titleBefore: "Sitios web para ",
      titleAccent: "tu empresa",
      titleAfter: ".",
      description:
        "Unos sitios web y contenidos bien diseñados son tus herramientas digitales más importantes. Refuerzan la visibilidad de tu marca, facilitan el contacto de los clientes y dejan una fuerte primera impresión.",
      priceLabel: "Paquetes web desde 399 €",
      phoneShop: {
        brand: "Freddo's",
        product: "Ice latte",
        price: "5,90 €",
        addToCart: "Añadir",
      },
    },
    popular: "Popular",
    requestQuote: "Solicitar presupuesto",
    explore: "Descubrir",
    packagesTitle: "Paquetes web",
    packages: [
      {
        name: "Start",
        tagline: "Un sitio sencillo pero impactante para una pequeña empresa",
        summary:
          "Un sitio claro de 1–3 páginas que presenta tu negocio de inmediato. Ideal para un pequeño operador que quiere presencia profesional en la red.",
        price: "399 € + IVA",
        bullets: withSitePages("Un sitio web profesional de 1–3 páginas adaptado a tu negocio", [
          "Incluye 1–2 direcciones de correo",
        ]),
      },
      {
        name: "Plus",
        tagline: "Un conjunto elegante que presenta tus servicios con claridad",
        summary:
          "4–6 páginas para servicios, contacto y una primera impresión fuerte. Presenta tu oferta con claridad y guía al visitante hacia el contacto.",
        price: "549 € + IVA",
        bullets: withSitePages("Un sitio web profesional de 4–6 páginas adaptado a tu negocio", [
          "Incluye 1–3 direcciones de correo",
        ]),
      },
      {
        name: "Oro",
        tagline: "7–9 páginas y atención con IA durante 1 año",
        summary:
          "Un sitio más amplio para un negocio en crecimiento. Incluye atención con IA durante un año: el bot responde y captura leads también cuando no estás disponible.",
        price: "759 € + IVA",
        bullets: withSitePages("Un sitio web profesional de 7–9 páginas adaptado a tu negocio", [
          "Incluye 1–5 direcciones de correo",
          "Atención con IA (chatbot) incluida durante 1 año — responde a clientes 24/7 y captura leads",
        ]),
      },
      {
        name: "Diamante",
        tagline:
          "Más de 10 páginas, atención con IA y el servicio de reservas que elijas durante 1 año",
        summary:
          "El paquete más completo: más de 10 páginas, atención con IA y el servicio de reservas que elijas durante un año. Para cuando ventas y servicio deben funcionar online las 24 horas.",
        price: "929 € + IVA",
        featured: true,
        bullets: withSitePages(
          "Un sitio web profesional de más de 10 páginas adaptado a tu negocio",
          [
            "Incluye 1–10 direcciones de correo",
            "Atención con IA (chatbot) incluida durante 1 año — responde a clientes 24/7 y captura leads",
            "El servicio de reservas que elijas durante 1 año — p. ej. mesas, alojamiento o citas de peluquería",
          ],
        ),
      },
    ],
    footnoteBefore:
      "Los precios de los paquetes son fijos. El dominio y el hosting se eligen por separado en ",
    footnoteLink: "servicios de mantenimiento",
    footnoteAfter:
      ". También puedes comprar el dominio y el hosting tú mismo, o usar un dominio que ya tengas.",
    dashboardPromo: {
      title: "Descubre el panel de administración personalizable del sitio web",
      body: "demo.restadigi.fi",
      linkLabel: "Descubrir",
      href: "https://demo.restadigi.fi",
    },
    process: {
      title: "Proceso de compra del sitio web — 8 pasos",
      steps: [
        {
          title: "Análisis de necesidades",
          body: "El proceso comienza aclarando los objetivos del cliente y el uso del sitio web. Al mismo tiempo se definen el contenido, las funciones y el calendario del proyecto.",
        },
        {
          title: "Elección del paquete adecuado",
          body: "El cliente elige la solución web que mejor se adapta a su empresa. Si hace falta, se pueden añadir servicios extra como SEO o producción de contenidos.",
        },
        {
          title: "Confirmación del pedido",
          body: "Cuando el servicio está elegido, se confirma el pedido y arranca el proyecto. Se acuerdan los detalles prácticos y se entregan los materiales necesarios.",
        },
        {
          title: "Diseño del sitio",
          body: "Restadigi diseña la estructura, la apariencia y la experiencia de uso según los deseos del cliente y la identidad visual de la empresa.",
        },
        {
          title: "Desarrollo del sitio web",
          body: "Sobre la base del plan se construye un sitio funcional y responsive, que funciona con fluidez en ordenadores y dispositivos móviles.",
        },
        {
          title: "Revisión y comentarios del cliente",
          body: "El borrador final se presenta al cliente. Las posibles peticiones de cambio se revisan y se aplican antes de la publicación.",
        },
        {
          title: "Publicación online",
          body: "Cuando el sitio está aprobado, se publica en el dominio elegido y se comprueba que todo funciona correctamente.",
        },
        {
          title: "Soporte y desarrollo continuo",
          body: "Tras la publicación, Restadigi puede ofrecer mantenimiento, actualizaciones y servicios de desarrollo para que el sitio se mantenga al día y apoye el crecimiento de la empresa.",
        },
      ],
    },
  },
  visibility: {
    meta: {
      title: "Visibilidad digital — Restadigi",
      description:
        "Pon tu visibilidad digital en orden: optimización IA, optimización Google y paquete de visibilidad en deporte de élite.",
      ogTitle: "Visibilidad digital — Restadigi",
      ogDescription:
        "Tres formas de crecer en visibilidad: optimización IA, optimización Google y paquete de visibilidad en deporte de élite.",
    },
    hero: {
      brand: "Restadigi",
      headlineLine1: "¿Ponemos tu visibilidad",
      headlineLine2: "en orden de una vez?",
      searchPlaceholder: "Buscar",
      searchAriaLabel: "Buscar en visibilidad digital",
    },
    midBanner: {
      title: "¡Tu camino hacia la máxima visibilidad empieza aquí!",
      description:
        "Descubre abajo los paquetes con los que elevarás la visibilidad online de tu empresa.",
    },
    promo: "desde 99€",
    promoLine1: "desde",
    promoLine2: "99€",
    popular: "Popular",
    contactCta: "Contactar",
    resultPrefix: "Obtienes:",
    explore: "Descubrir",
    packagesTitle: "Paquetes de visibilidad",
    packages: [
      {
        name: "Optimización IA",
        tagline: "Visible también en búsquedas de ChatGPT, Claude, Gemini y Copilot",
        summary:
          "Cada vez más personas buscan servicios a través de la IA. Mantenemos tus datos y contenido listos para la visibilidad en ChatGPT, Claude, Gemini y Copilot — año tras año.",
        description:
          "La búsqueda en la web está cambiando. Cada vez más personas encuentran empresas, productos y servicios conversando con la IA. Nuestro servicio de optimización IA ayuda a mantener al día los datos de tu empresa y a que el contenido de tu sitio respalde la capacidad de los servicios de IA para reconocer tu negocio en el contexto correcto.",
        price: "desde 99 € / año",
        bullets: [
          "Revisión básica de visibilidad IA del sitio web",
          "Revisión de la información empresarial clave",
          "Recomendaciones de optimización básica de contenidos y metadatos",
          "Identificación de carencias estructurales",
          "Revisión y actualización anuales",
        ],
        result: "Tu empresa también forma parte de las búsquedas del futuro.",
      },
      {
        name: "Optimización Google",
        tagline: "Asegura que los clientes encuentren tu empresa",
        summary:
          "Google sigue siendo el canal principal cuando un cliente busca una empresa. Mantenemos los fundamentos SEO al día cada año para que la descubribilidad no se deteriore.",
        description:
          "Google sigue siendo uno de los canales más importantes para encontrar empresas, productos y servicios. Nuestra optimización Google es un servicio ligero de mantenimiento anual cuyo objetivo es garantizar que tu sitio cumpla los requisitos básicos de SEO y apoye la descubribilidad.",
        price: "desde 99 € / año",
        bullets: [
          "Revisión SEO básica del sitio web",
          "Revisión de títulos y meta descripciones",
          "Evaluación de las palabras clave principales",
          "Comprobación de aspectos técnicos básicos",
          "Propuestas de mejora de la visibilidad",
          "Revisión y actualización anuales",
        ],
        result: "Tu visibilidad en Google se mantiene al día.",
      },
      {
        name: "Paquete de visibilidad en deporte de élite",
        tagline: "Visibilidad en las ligas deportivas más populares de Finlandia",
        summary:
          "Visibilidad ligada a Liiga, Veikkausliiga y Superpesis. Una microcolaboración asequible lleva tu marca a las gradas, canales digitales y eventos de networking.",
        description:
          "El deporte de élite ofrece a las empresas una oportunidad única de llegar a clientes, reforzar la marca y construir una imagen fiable. Ofrecemos microcolaboraciones asequibles con clubes de Liiga, Veikkausliiga y Superpesis.",
        price: "desde 299 € / año",
        featured: true,
        bullets: [
          "Visibilidad publicitaria en vallas y LED en los partidos",
          "Visibilidad en pantallas mediáticas de los estadios",
          "Presentación de la empresa o logo en la web del club",
          "Visibilidad en los canales digitales del club",
          "Invitaciones a reuniones de partners y networking",
          "Entradas a partidos para clientes o personal",
          "Servicios VIP y experiencias en días de partido",
          "Otros beneficios de partnership según el club",
        ],
        result:
          "Una colaboración profesional, visibilidad ante miles de espectadores e imagen deportiva positiva.",
      },
      {
        name: "Diseño gráfico",
        tagline: "Logo, flyers, plantillas social y trabajo por horas",
        summary:
          "Diseño gráfico de calidad para impresión y digital — precios claros y resultado profesional.",
        description:
          "Logo, tarjetas, flyers, aspecto web, plantillas social, roll-ups y trabajo por horas.",
        price: "desde 99 €",
        bullets: [
          "Diseño de logo — 199 €",
          "Tarjeta o flyer/anuncio — 99 €",
          "Diseño visual web — desde 399 €",
          "Plantillas social o roll-up — desde 149 €",
          "Trabajo por horas — 49 €/h",
        ],
        result: "Una imagen visual profesional para tu empresa.",
      },
    ],
    footnote: "Los precios son anuales. Solo pagas por lo que necesitas — sin costes ocultos.",
    branding: {
      titleBefore: "Diseño ",
      titleAccent: "gráfico",
      titleAfter: "",
      description:
        "Un diseño gráfico de calidad ayuda a tu empresa a destacar y a crear una primera impresión profesional. El equipo de Restadigi diseña materiales claros, duraderos y acordes a tu imagen — para impresión y canales digitales.",
      products: [
        {
          name: "Diseño de logo",
          description:
            "El logo es el símbolo visual más importante de tu empresa. Diseñamos un logo único y adecuado a tu sector, que transmite la imagen correcta y funciona en muchos usos.",
          price: "199 €",
        },
        {
          name: "Diseño de tarjeta de visita",
          description:
            "Una tarjeta elegante completa la imagen visual de tu empresa. La diseñamos según el logo y la identidad para que el conjunto sea coherente y profesional.",
          price: "99 €",
        },
        {
          name: "Diseño de flyer o anuncio de una página",
          description:
            "Diseñamos un flyer o anuncio claro e impactante que capta la atención y transmite tu mensaje con eficacia — ideal para eventos, campañas o presentaciones.",
          price: "99 €",
        },
        {
          name: "Diseño visual de sitio web",
          description:
            "Diseñamos un aspecto web moderno y fácil de usar según la imagen de tu empresa. Un buen diseño refuerza la marca y hace el sitio claro y usable.",
          price: "Desde 399 €",
        },
        {
          name: "Diseño de plantillas para redes sociales",
          description:
            "Diseñamos plantillas listas para redes sociales para que las publicaciones se mantengan visualmente coherentes y fáciles de editar. Aceleran la producción y refuerzan la marca.",
          price: "Desde 149 €",
        },
        {
          name: "Diseño de roll-up o pancarta",
          description:
            "Diseñamos roll-ups y pancartas impactantes para ferias, eventos, tiendas y otras situaciones de marketing — claros, llamativos y acordes a tu imagen.",
          price: "Desde 149 €",
        },
        {
          name: "Trabajo por horas",
          description:
            "¿Necesitas cambios gráficos pequeños o trabajos puntuales? El trabajo por horas de nuestro equipo sirve para actualizar materiales, editar imágenes, maquetación u otras tareas gráficas.",
          price: "49 €/h",
        },
      ],
      billing: {
        title: "Sobre la facturación",
        intro:
          "Aplicamos un anticipo: parte del trabajo se factura antes de empezar el proyecto, una vez aceptado el presupuesto por escrito. Así se comprometen tanto el cliente como el proveedor.",
        providerLead:
          "La facturación de los servicios de Restadigi Finland en Finlandia la gestiona Laskuttamo.",
        providerName: "Laskuttamo",
        providerEmail: "asiakaspalvelu@laskuttamo.com",
        providerPhone: "02 0730 6710",
        providerHours: "lun–vie 8:00–16:00",
        providerSiteLabel: "laskuttamo.com",
        providerSiteUrl: "https://laskuttamo.com/",
        providerAddressNote:
          "Los datos de contacto y las direcciones están en el sitio web de Laskuttamo.",
        groundsTitle: "¿Por qué un anticipo?",
        groundsBody: [
          "Cuando arranca un proyecto, reservamos tiempo en el calendario. Si el pedido se cancela a mitad o se corta la comunicación, perdemos la oportunidad de aceptar otros encargos en ese periodo. El anticipo actúa por tanto como una reserva que confirma el compromiso del cliente.",
          "En el trabajo creativo el resultado — como un logo o una identidad visual — suele tomar forma durante el proceso. Sin anticipo podríamos quedar con una factura sin pagar, un cliente que desaparece o un proyecto interrumpido. Facturar solo al final también podría significar semanas o meses de trabajo sin flujo de caja. El anticipo alivia estos riesgos y garantiza al menos parte de la retribución por el trabajo ya realizado.",
        ],
      },
      form: {
        title: "Solicita presupuesto de diseño gráfico",
        name: "Nombre",
        email: "Correo electrónico",
        phone: "Teléfono",
        submit: "Enviar solicitud",
        sending: "Abriendo el correo…",
        mailSubject: "Solicitud de presupuesto: diseño gráfico — {name}",
        mailBody:
          "Nombre: {name}\nCorreo: {email}\nTeléfono: {phone}\n\nSolicito presupuesto de diseño gráfico.",
      },
    },
    cta: {
      titleBefore: "¿Quieres mejor ",
      titleAccent: "visibilidad",
      titleAfter: "?",
      button: "Preguntar por paquetes de visibilidad",
    },
  },
  chatbot: {
    meta: {
      title: "Restachat — Restadigi",
      description:
        "Restachat — chatbot inteligente para tu web. Atiende clientes 24/7, responde preguntas, captura leads y libera a tu equipo.",
      ogTitle: "Restachat — Restadigi",
      ogDescription: "Restachat — ventas y atención al cliente las 24 horas por chat.",
    },
    hero: {
      titleBefore: "",
      titleAccent: "Restachat",
      titleAfter: " — atención inteligente.",
      description:
        "Restachat se instala en tu web y atiende a los clientes las 24 horas — responde preguntas, guía hacia los servicios adecuados y captura leads.",
      headlineLine1: "El empleado más barato de tu empresa",
      headlineLine2: "está aquí.",
      subtitle: "Conoce el chatbot personalizable Restachat.",
      cta: "Conocer Restachat",
    },
    chatbot: {
      eyebrow: "Restachat",
      titleBefore: "Un ",
      titleAccent: "Restachat",
      titleAfter: " inteligente — vendedor y agente de atención las 24 horas.",
      intro:
        "Restachat es un asistente virtual inteligente instalado en tu web que atiende a los clientes 24/7 — responde preguntas frecuentes, guía hacia los servicios adecuados y captura leads. No sustituye a las personas; es una mano extra fiable cuando tu equipo no está disponible.",
      benefits: [
        {
          title: "Atención al cliente 24/7",
          body: "El bot responde al instante a las preguntas más comunes, sin que el cliente tenga que esperar o buscar información.",
        },
        {
          title: "Captura eficaz de leads",
          body: "El bot guía al visitante con fluidez en el recorrido de compra y recoge datos de contacto también de noche.",
        },
        {
          title: "Mayor conversión",
          body: "El umbral de contacto es bajo. Con el chatbot, más visitantes se convierten en clientes de pago.",
        },
        {
          title: "Ahorro de recursos",
          body: "Las preguntas rutinarias pasan al bot y liberan tiempo para tareas más exigentes.",
        },
      ],
      safeTitleBefore: "Una solución ",
      safeTitleAccent: "segura y sencilla",
      safeTitleAfter: ".",
      safeBody:
        "Para que el chatbot dé resultados año tras año, necesita cuidado continuo. Nuestro modelo mensual garantiza que el bot evolucione y funcione sin fricción con los datos y la tecnología cambiantes de tu empresa.",
      monthly: [
        {
          title: "Tecnología siempre actualizada",
          body: "La web y la IA evolucionan sin parar. Con la cuota mensual aseguramos que tu bot funcione siempre en la plataforma más reciente y segura.",
        },
        {
          title: "Adaptado a los datos de tu empresa",
          body: "El bot se puede entrenar. El mantenimiento mensual permite formarlo con tus últimos datos de producto, campañas y respuestas.",
        },
        {
          title: "Desarrollo proactivo",
          body: "Analizamos el historial de conversaciones y lo optimizamos para cubrir cada vez mejor las necesidades más frecuentes de tus clientes.",
        },
        {
          title: "Servicio llave en mano",
          body: "No tienes que preocuparte por instalaciones técnicas ni código. Nuestros especialistas se ocupan del mantenimiento.",
        },
      ],
    },
    cta: {
      titleBefore: "Atiende mejor. Captura leads. ",
      titleAccent: "Crece con más eficiencia.",
      body: "Restadigi desarrolla soluciones digitales para empresas de servicios. Nuestro chatbot ayuda a mejorar la experiencia del cliente, agilizar la operación y aumentar las ventas con una herramienta de IA fácil de adoptar.",
      questions: [
        "¿Cuáles son las preguntas más frecuentes de vuestros clientes?",
        "¿Queréis que el bot se centre más en la atención o en las ventas y la captura de leads?",
        "¿En qué idiomas queréis que el bot atienda a los visitantes?",
      ],
      price: "29 € / mes",
      priceNote: "Precio mensual fijo",
      button: "Solicitar demo gratuita",
    },
  },
  booking: {
    meta: {
      title: "Restatable — Restadigi",
      description:
        "Restatable — sistema moderno de reservas de mesa para hostelería, turismo, restaurantes y empresas de servicios.",
      ogTitle: "Restatable — Restadigi",
      ogDescription: "Reservas desde canales al salón — Restatable.",
    },
    brand: {
      name: "Restatable",
      titleBefore: "Servicios de reserva ",
      titleAccent: "bajo una marca",
      titleAfter: ".",
      body: "Restatable ofrece un sistema gráfico de reservas de mesa para hostelería, turismo y restauración — y para pymes de servicios.",
    },
    restatable: {
      badge: "Restatable",
      titleBefore: "Reservas desde ",
      titleAccent: "canales al salón",
      titleAfter: ".",
      body: "Restatable es un sistema gráfico de reservas de mesa para restaurantes y empresas de servicios. Recibe reservas de Google y redes sociales, gestiona el salón en un plano y deja que los huéspedes editen sus reservas — como en el ejemplo del Restaurante Kaj.",
      exampleLabel: "Ejemplo: Restaurante Kaj",
    },
    restachat: {
      badge: "Restatable · chat",
      titleBefore: "",
      titleAccent: "Reservas de mesa",
      titleAfter: " directamente desde tu web.",
      description:
        "Integramos en la web de tu restaurante un servicio moderno de reservas de mesa que funciona las 24 horas. El cliente elige hora y tamaño del grupo, recibe confirmación por correo y tu equipo ve las reservas en un panel claro.",
      headlineLine1: "Los clientes reservan mesa",
      headlineLine2: "ellos mismos — 24/7.",
      subtitle: "Conoce Restatable y prueba el bot de reservas.",
      shopHeadline: "La tienda no duerme",
      shopBody:
        "Recibe reservas de mesa digitalmente 24/7 con el sistema online de Restadigi. Tus clientes pueden reservar fácilmente con el widget integrado en tu web o con un chatbot inteligente de reservas — cuando mejor les convenga. Si lo necesitas, también diseñamos una página de reservas con la imagen de tu empresa.",
      tryLabel: "Prueba a reservar mesa con el chatbot de Restadigi:",
    },
    channels: {
      eyebrow: "Canales",
      titleBefore: "Reserva directamente a través de ",
      titleAccent: "canales online populares",
      titleAfter: ".",
      body: "Haz que reservar sea fácil donde ya están tus clientes. Recibe reservas directas desde Google, Instagram y Facebook y llega a más clientes nuevos.",
      items: ["Google", "Instagram", "Facebook"],
      mock: {
        name: "Restaurante Kaj",
        category: "Nórdico moderno",
        status: "Abierto",
        rating: "4,9",
        reviews: "(248)",
        priceLevel: "€€€",
        blurb:
          "Kaj ofrece ingredientes de temporada en un ambiente de fuego abierto. Reserva mesa desde Google — sin llamadas.",
        reserve: "Reservar mesa",
        call: "Llamar",
        directions: "Ruta",
        save: "Guardar",
        website: "Web",
      },
    },
    guestManage: {
      eyebrow: "Autoservicio del huésped",
      titleBefore: "Cancelaciones y ",
      titleAccent: "cambios de reserva",
      titleAfter: ".",
      body: "Los huéspedes pueden cancelar o modificar sus reservas ellos mismos con una gestión clara y fácil de usar. Un proceso sencillo mejora la experiencia y reduce la carga del personal.",
      items: ["Cancelar reserva", "Modificar reserva"],
    },
    experience: {
      eyebrow: "Vistas personalizadas",
      titleBefore: "Mejora tu ",
      titleAccent: "experiencia de reservas",
      titleAfter: "!",
      body: "Personaliza la vista con diagrama, lista o plano de mesas. Un sistema claro e intuitivo facilita la planificación — mientras el salón se ve de un vistazo.",
      views: ["Vista de plano", "Vista de línea de tiempo", "Vista de lista"],
    },
    integration: {
      eyebrow: "Integración",
      titleBefore: "Integración ",
      titleAccent: "fluida",
      titleAfter: ".",
      body: "Facilitamos las reservas integrando Restatable en la web y los canales digitales de tu restaurante. De las redes a Google y las confirmaciones por correo — Restatable funciona donde te encuentran los clientes.",
      logos: ["Google", "Instagram", "Facebook", "Email", "Tu web", "Calendario"],
    },
    dashboard: {
      eyebrow: "Restatable",
      titleBefore: "Sistema de reservas ",
      titleAccent: "online para restaurantes",
      titleAfter: ".",
      body: "Restatable es un sistema de reservas intuitivo e integral para restaurantes. Gestiona las reservas y el negocio — mesa a mesa — en una sola vista clara.",
      ctaPrimary: "Pedir una demo",
      ctaSecondary: "Reservar una llamada",
      ctaNote: "Precio mensual fijo. Sin costes ocultos.",
    },
    floorPlan: {
      eyebrow: "Plano en todos los dispositivos",
      titleBefore: "El salón ",
      titleAccent: "en el mapa",
      titleAfter: " — del móvil a la gran pantalla.",
      body: "Plano personalizado según el aforo de tu restaurante. La misma vista Restatable funciona en móvil, tablet y la pantalla grande del restaurante.",
    },
    features: [
      {
        title: "Reservas 24/7",
        body: "Los clientes pueden reservar mesa cuando les convenga — sin llamadas.",
      },
      {
        title: "Menos no-shows",
        body: "Confirmaciones y recordatorios automáticos reducen las ausencias.",
      },
      {
        title: "Gestión clara",
        body: "Ves las reservas del día de un vistazo y ajustas la disponibilidad con facilidad.",
      },
      {
        title: "Canales y sistema",
        body: "Reservas desde Google, Instagram y Facebook más un plano gráfico — un sistema Restatable.",
      },
    ],
    cta: {
      titleBefore: "Empieza con ",
      titleAccent: "Restatable",
      titleAfter: ".",
      price: "39 € / mes",
      priceNote: "Precio mensual fijo del servicio de reservas Restatable",
      button: "Preguntar más",
    },
    demo: {
      sectionEyebrow: "Restatable · demo del producto",
      sectionTitleBefore: "Así reserva mesa ",
      sectionTitleAccent: "el cliente",
      sectionTitleAfter: " en tu web.",
      sectionBody:
        "Aquí tienes la experiencia de ejemplo de Restatable (Restaurante Kaj). En el panel de administración puedes editar el nombre, los horarios y los textos en finlandés, inglés y español. Los datos de esta demo no se guardan.",
      bannerEyebrow: "Restatable — demo del producto",
      bannerBody:
        "Este flujo muestra las reservas de mesa de Restatable. Lo que rellenes es solo un ejemplo: no se almacena. En una instalación real, las reservas aparecerían en el panel de administración.",
      liveBadge: "Demo",
      stepperAria: "Pasos de la reserva",
      stepInfo: "Tipo",
      stepGuests: "Personas",
      stepDate: "Fecha",
      stepTime: "Hora",
      stepConfirm: "Confirmar",
      infoTitle: "Elige el tipo de reserva",
      infoBody:
        "Empieza eligiendo una opción. Los textos y tipos se configuran desde el panel de administración.",
      guestsTitle: "¿Cuántas personas?",
      guestsLabel: "personas",
      continue: "Continuar",
      back: "Atrás",
      prevMonth: "Mes anterior",
      nextMonth: "Mes siguiente",
      prevDay: "Día anterior",
      nextDay: "Día siguiente",
      noSlots: "No hay horarios disponibles para este día.",
      confirmTitle: "Confirmar reserva",
      place: "Lugar",
      type: "Tipo",
      when: "Día y hora",
      normalType: "Reserva estándar",
      name: "Nombre",
      phone: "Teléfono",
      email: "Correo electrónico",
      comment: "Comentario",
      termsFallback: "Acepto las condiciones. Esto es una demo: no se guarda ningún dato.",
      submit: "Enviar reserva",
      sending: "Enviando…",
      successTitle: "¡Gracias! Demo completada",
      successBody:
        "En una instalación real el cliente recibiría la confirmación por correo y la reserva aparecería en el panel. En esta demo no se ha guardado nada.",
      tryAgain: "Probar de nuevo",
    },
  },
  stayBooking: {
    meta: {
      title: "Restabooking — reservas de alojamiento — Restadigi",
      description:
        "Restabooking: alojamiento, actividades, experiencias, eventos y reservas de grupo en un solo sistema.",
      ogTitle: "Restabooking — reservas de alojamiento — Restadigi",
      ogDescription: "Todas las reservas en un sistema — para hoteles, posadas, cabañas y resorts.",
    },
    hero: {
      eyebrow: "Restabooking",
      title: "Todas las reservas en un solo sistema.",
      paragraphs: [
        "Restabooking es un sistema de reservas versátil para hoteles, posadas, cabañas, resorts y otros alojamientos. Con el mismo sistema gestionas estancias, actividades, experiencias, eventos y reservas de grupo desde un solo lugar.",
        "El proceso automatizado reduce el trabajo manual y mantiene la disponibilidad y el calendario siempre al día. Tus clientes pueden reservar online las 24 horas, lo que mejora la experiencia y ayuda a aumentar las ventas.",
        "Una interfaz clara hace fluida la gestión diaria tanto en pequeños alojamientos como en destinos mayores. Ya sean habitaciones, cabañas, servicios de programa, eventos o grupos, Restabooking lo reúne todo en un sistema fácil de usar.",
        "Ofrece a tus clientes una reserva sin fricción y gestiona todo el negocio de forma eficiente en una plataforma moderna.",
      ],
      cta: "Preguntar más",
    },
    panelFeatures: {
      eyebrow: "Panel de administración",
      titleBefore: "Todas las funciones ",
      titleAccent: "en un solo panel",
      titleAfter: ".",
      body: "El panel de Restabooking reúne alojamiento, reservas, actividades y facturación en una sola vista — sin sistemas separados.",
      coreTitle: "Funciones clave",
      coreItems: [
        "Sistema de gestión de alojamiento (PMS)",
        "Calendario de reservas",
        "Motor de reserva directa",
        "Servicios adicionales",
        "Paquetes",
        "Ruta de reserva multiproducto",
        "Gestión de alojamiento",
        "Gestión de clientes",
        "Facturación",
      ],
      activitiesTitle: "Actividades y servicios de programa",
      activitiesItems: [
        "Sistema de actividades y programas",
        "Experience Designer",
        "Productos por horas",
        "Gestión de disponibilidad de recursos",
        "Reservas de experiencias guiadas",
        "Alquiler de equipo",
        "Reservas combinadas alojamiento + actividad",
      ],
      calendarTitle: "Calendario de reservas",
      phoneTitle: "Reservas del día",
      activeNav: "Calendario de reservas",
    },
    pillarsHeading: {
      titleBefore: "La operación de alojamiento ",
      titleAccent: "en una sola vista",
      titleAfter: ".",
    },
    pillars: [
      {
        title: "Property Management System",
        tagline: "Gestiona todo el negocio de alojamiento desde un sistema",
        body: "El Property Management System de Restadigi reúne las funciones clave del alojamiento bajo un mismo sistema. Gestiona reservas, ocupación, habitaciones, limpieza, mantenimiento, facturación y comunicación con el huésped desde una sola vista. Los flujos automatizados reducen el trabajo manual, agilizan el día a día del equipo y aseguran una experiencia fluida desde la reserva hasta el check-out.",
      },
      {
        title: "Actividades, experiencias y extras",
        tagline: "Aumenta las ventas ofreciendo más a cada cliente",
        body: "Con el sistema de Restadigi vendes fácilmente actividades, experiencias, alquiler de equipo, turnos de sauna, visitas guiadas, eventos y otros extras en el mismo proceso de reserva. La venta inteligente permite ofrecer extras antes, durante o durante la estancia — así creces en venta adicional, simplificas la gestión y ofreces una experiencia más completa.",
      },
      {
        title: "Tienda online y reservas web",
        tagline: "Vende alojamiento, experiencias y servicios online con facilidad",
        body: "La tienda online de Restadigi une alojamiento, actividades, extras y paquetes listos en un recorrido de reserva fluido. Puedes crear rutas distintas para familias, empresas y grupos, y ofrecer los extras y precios adecuados a cada segmento. Un proceso claro mejora la experiencia y ayuda a crecer en ventas.",
      },
      {
        title: "Reuniones, eventos y reservas de grupo",
        tagline: "Gestiona las reservas grandes sin complicaciones",
        body: "Con el sistema de Restadigi gestionas salas de reuniones, eventos, reservas de grupo y cupos de alojamiento desde un solo lugar. Horarios, participantes, catering y extras quedan en el mismo sistema — claro para el equipo y para el cliente. Las herramientas automatizadas reducen el trabajo manual y hacen fluida la gestión de grupos y eventos.",
      },
    ],
    dashboard: {
      eyebrow: "Panel de administración",
      titleBefore: "Reservas en ",
      titleAccent: "calendario",
      titleAfter: " y lista.",
      body: "El equipo ve llegadas, salidas y reservas de estancia en tablet o pantalla — confirma, cancela y sigue la ocupación de un vistazo.",
    },
    rooms: {
      eyebrow: "Mapa de habitaciones",
      titleBefore: "Estado de las ",
      titleAccent: "habitaciones",
      titleAfter: " — del móvil a la gran pantalla.",
      body: "Vista clara de las habitaciones: libre, ocupada, llegada o salida. La misma vista funciona en móvil, tablet y la pantalla de recepción.",
    },
    cta: {
      titleBefore: "Toma el control de las ",
      titleAccent: "reservas de alojamiento",
      titleAfter: ".",
      price: "45 € / mes",
      priceNote: "Precio mensual fijo para Restabooking (alojamiento)",
      button: "Preguntar más",
    },
    demo: {
      sectionEyebrow: "Demo del producto · Restabooking",
      sectionTitleBefore: "Así reserva ",
      sectionTitleAccent: "el huésped",
      sectionTitleAfter: " en tu web.",
      sectionBody:
        "Abajo tienes el Hotel Aava — un alojamiento de ejemplo inventado. Puedes editar los textos en el panel en finlandés, inglés y español. Los datos de la demo no se guardan.",
      bannerEyebrow: "Restadigi Restabooking — demo del producto",
      bannerBody:
        "Este flujo muestra las reservas de alojamiento. Lo que rellenes es solo un ejemplo: no se almacena. En una instalación real, las reservas aparecen en el panel de administración.",
      liveBadge: "Demo",
      stepperAria: "Pasos de la reserva de estancia",
      stepRoom: "Habitación",
      stepGuests: "Huéspedes",
      stepCheckIn: "Llegada",
      stepNights: "Noches",
      stepConfirm: "Confirmar",
      roomTitle: "Elige el tipo de habitación",
      roomBody:
        "Empieza eligiendo una habitación. Los textos se configuran en el panel de administración.",
      guestsTitle: "¿Cuántos huéspedes?",
      guestsLabel: "huéspedes",
      checkInTitle: "Elige la fecha de llegada",
      nightsTitle: "¿Cuántas noches?",
      nightsLabel: "noches",
      checkIn: "Llegada",
      checkOut: "Salida",
      continue: "Continuar",
      back: "Atrás",
      prevMonth: "Mes anterior",
      nextMonth: "Mes siguiente",
      confirmTitle: "Confirmar reserva de estancia",
      place: "Alojamiento",
      room: "Habitación",
      stay: "Estancia",
      standardRoom: "Habitación estándar",
      name: "Nombre",
      phone: "Teléfono",
      email: "Correo electrónico",
      comment: "Comentario / peticiones",
      termsFallback: "Acepto las condiciones. Esto es una demo: no se guarda ningún dato.",
      submit: "Enviar reserva",
      sending: "Enviando…",
      successTitle: "¡Gracias! Demo completada",
      successBody:
        "En una instalación real el huésped recibiría la confirmación por correo y la reserva aparecería en el panel. En esta demo no se ha guardado nada.",
      tryAgain: "Probar de nuevo",
    },
  },
  hosting: {
    meta: {
      title: "Mantenimiento — Restadigi",
      description:
        "Paquetes de hosting y mantenimiento para empresas — hosting rápido en Finlandia, dominio, SSL y soporte continuo.",
      ogTitle: "Mantenimiento — Restadigi",
      ogDescription: "Paquetes de hosting y mantenimiento: Basic y Pro Business.",
    },
    hero: {
      titleBefore: "Hosting ",
      titleAccent: "finlandés",
      titleAfter: "",
      description:
        "Mantenemos tu sitio rápido, seguro y al día. Elige el paquete de hosting y mantenimiento adecuado — dominio y SSL incluidos.",
      features: [
        "Hosting rápido en Finlandia",
        "Dominio y SSL incluidos",
        "Gestión en finlandés o inglés",
        "Servidores en Helsinki",
        "Actualizaciones y soporte regulares",
        "Precio mensual fijo y claro",
      ],
      askCta: "Preguntar más",
    },
    popular: "Popular",
    requestQuote: "Solicitar presupuesto",
    explore: "Descubrir",
    packagesTitle: "Paquetes de hosting",
    packages: [
      {
        name: "Basic",
        summary:
          "Hosting rápido en Finlandia con dominio y SSL incluidos. Ideal cuando necesitas un mantenimiento básico fiable sin servicios extra.",
        price: "11,90 € / mes + IVA (facturación anual)",
        bullets: [
          "Hosting y dominio incluidos",
          "Hosting rápido y fiable en Finlandia",
          "Certificado SSL (HTTPS) incluido",
          "Dominio (.fi u otro) incluido",
        ],
      },
      {
        name: "Pro Business",
        summary:
          "Además del hosting: mantenimiento continuo, pequeños cambios de contenido y soporte personal. Elige esto cuando el sitio deba mantenerse al día y haya ayuda disponible.",
        price: "29,90 € / mes + IVA",
        featured: true,
        bullets: [
          "Hosting y dominio incluidos",
          "Hosting rápido y fiable en Finlandia",
          "Certificado SSL (HTTPS) incluido",
          "Dominio (.fi u otro) incluido",
          "Direcciones de correo incluidas",
          "Mantenimiento y actualizaciones continuas",
          "Pequeños cambios de contenido incluidos",
          "Actualizaciones de seguridad",
          "Soporte y desarrollo del servicio de atención con IA y/o del servicio de reservas",
          "Soporte personal por teléfono",
        ],
      },
    ],
    footnote:
      "El paquete Basic se factura anualmente (11,90 € / mes). Pro Business se factura mensualmente. Dominio y certificado SSL incluidos.",
  },
  widget: {
    sales: {
      openLabel: "Atención al cliente",
      closeLabel: "Cerrar",
      openAria: "Abrir Resta-AI atención al cliente",
      closeAria: "Cerrar atención al cliente",
      dialogAria: "Resta-AI atención al cliente",
      eyebrow: "RESTADIGI",
      title: "Resta-AI",
      welcome:
        "¡Hola! 👋 Soy Resta-AI y te ayudo a encontrar las soluciones digitales adecuadas para tu empresa.\n\nCuéntame brevemente sobre tu negocio o lo que buscas, y te recomendaré opciones adecuadas. Puedes preguntar por paquetes web, atención al cliente con IA u otros servicios nuestros.\n\nSi quieres, también puedes dejar tu teléfono y correo, y te contactamos como prefieras.\n\nTen en cuenta que soy un asistente de inteligencia artificial y mejoro continuamente.",
      placeholder: "Escribe tu pregunta aquí…",
      sendAria: "Enviar mensaje",
      resetAria: "Reiniciar conversación",
      typing: "Escribiendo…",
      sendFailed: "No se pudo enviar el mensaje.",
      genericError: "Se produjo un error.",
      quickReplies: [
        { label: "Paquetes web", message: "Cuéntame sobre vuestros paquetes web." },
        { label: "Atención con IA", message: "Cuéntame sobre la atención al cliente con IA." },
        { label: "Precios", message: "¿Cuánto cuestan vuestros servicios?" },
        { label: "Dejar contacto", message: "Quiero dejar teléfono y correo." },
      ],
    },
    booking: {
      openLabel: "Reservar mesa",
      closeLabel: "Cerrar chat",
      openAria: "Abrir reserva de mesa",
      closeAria: "Cerrar reserva de mesa",
      dialogAria: "Reserva de mesa del restaurante",
      eyebrow: "Reservas",
      title: "Reservar mesa",
      welcome:
        "¡Hola! 👋 Bienvenido/a a Restadigi.\n\n¿Te gustaría reservar mesa en nuestro restaurante? Soy Resta-AI y te ayudo a hacer la reserva.\n\nEstamos abiertos todos los días de 12:00 a 24:00, y las reservas de mesa se pueden hacer para horarios entre las 12:00 y las 22:00.\n\nDime:\n\n    tu nombre\n    número de personas\n    fecha y hora\n    tu teléfono\n    tu correo (para la confirmación de la reserva)\n\nLa duración normal de una reserva es de 2 horas. Si lo necesitas, también es posible reservar 3 horas bajo petición.",
      placeholder: "Escribe tu mensaje…",
      sendAria: "Enviar mensaje",
      typing: "Escribiendo…",
      sendFailed: "No se pudo enviar el mensaje.",
      genericError: "Se produjo un error.",
    },
  },
};
