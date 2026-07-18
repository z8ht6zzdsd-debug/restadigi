import type { Messages } from "./types";

const plusBullets = [
  "Textos base claros y atractivos para inicio, servicios y contacto — listos para una pequeña empresa",
  "Un sitio web profesional de hasta 8 páginas adaptado a tu negocio",
  "Panel de administración fácil de usar para actualizar contenidos tú mismo",
  "Diseño responsive que funciona excelentemente en móvil, tablet y ordenador",
  "Formulario de contacto integrado para que tus clientes te encuentren fácilmente",
  "SEO básico que incluye metadatos, mapa del sitio y optimización del rendimiento",
  "Entrega rápida — sitio listo en tan solo 5 días laborables",
  "30 días de soporte al cliente tras el lanzamiento para consultas y pequeños cambios",
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
    languages: "Idiomas",
    menu: "Menú",
    homeAria: "Restadigi — inicio",
    logoAlt: "Restadigi — IA y web",
    industriesIntro:
      "Soluciones digitales por sector — sitios web, reservas, visibilidad y atención al cliente con IA para empresas de servicios.",
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
        title: "Cafeterías y kioscos",
        body: "Sitios web elegantes y una app móvil con programa de fidelización — marca, repetición y relación con el cliente en un solo conjunto.",
      },
      {
        title: "Gimnasios y entrenadores personales",
        body: "Panel a medida para horarios de entrenamiento — reservas, agendas y comunicación con clientes en una vista clara.",
      },
      {
        title: "Peluquerías, salones y bienestar",
        body: "Sitios web modernos y reserva de citas para que tus servicios se vean, se reserven y se vendan sin interminables llamadas.",
      },
    ],
    servicesList: [
      { to: "/kotisivut-yrityksille", label: "Sitios web" },
      { to: "/diginakyvyys", label: "Visibilidad y diseño" },
      { to: "/chatbot", label: "Atención con IA" },
      { to: "/potyvarauspalvelu", label: "Reservas de mesa" },
      { to: "/yllapito", label: "Hosting y mantenimiento" },
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
        "Creamos sitios web, apps móviles y otras soluciones digitales inteligentes para empresas de servicios de forma rápida y rentable. El conjunto incluye sitios web, sistemas de reserva, atención al cliente y ventas.",
      cta: "Solicitar presupuesto",
    },
    intro: {
      titleLine1: "Soluciones por sector.",
      titleLine2: "Contacta con nosotros, hablemos.",
      body: "Queremos conocer a fondo cómo funciona tu empresa para servirte lo mejor posible. Todos los proyectos empiezan con una llamada de presentación de al menos 30 minutos. Reserva una hora abajo o llámanos directamente — juntos encontraremos la solución óptima.",
      callCta: "Llámanos",
      phoneDisplay: "+358 403 738 332",
      phoneTel: "+358403738332",
      whatsappCta: "Llamada WhatsApp",
      bookCta: "Reservar hora →",
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
          href: "/yhteys",
          linkLabel: "Reservar llamada de presentación",
        },
        {
          title: "Precio asequible",
          body: "Los costes son altos en el sector servicios y encontrar nuevos clientes puede ser difícil. Gracias a la IA ofrecemos servicios a un precio razonable sin sacrificar la calidad — la mejor relación calidad-precio del mercado.",
          href: "/kotisivut-yrityksille",
          linkLabel: "Ver paquetes",
        },
        {
          title: "Operaciones automatizadas",
          body: "Un bot de atención con IA gestiona por ti el servicio al cliente y la recepción de reservas por chat, teléfono y correo 24/7. Precio mensual fijo desde 19 € / mes.",
          href: "/chatbot",
          linkLabel: "Conocer el servicio de IA",
        },
        {
          title: "Gestión de contenidos sin esfuerzo",
          body: "Actualiza el menú, precios, horarios e imágenes desde tu propio panel. El mantenimiento de contenidos se hace con unos clics — sin conocimientos técnicos.",
          href: "/kotisivut-yrityksille",
          linkLabel: "Más información",
        },
      ],
    },
    projects: {
      titleBefore: "Proyectos ",
      titleAccent: "seleccionados",
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
      description: "Cuéntanos tu proyecto; te responderemos en un día laborable. info@restadigi.fi",
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
      studio: "Estudio",
      social: "Redes",
    },
    email: "info@restadigi.fi",
    phoneDisplay: "+358 403 738 332",
    phoneTel: "+358403738332",
    studioLine1: "Helsinki, Finlandia",
    studioLine2: "Trabajo remoto en toda Europa",
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
  },
  about: {
    meta: {
      title: "Sobre nosotros — Restadigi",
      description:
        "Restadigi es un estudio pequeño que crea sitios web y refuerza la visibilidad digital de las empresas. Conoce nuestra forma de trabajar.",
      ogTitle: "Sobre nosotros — Restadigi",
      ogDescription:
        "Un estudio pequeño, una gran responsabilidad. Sitios web y visibilidad digital para empresas.",
    },
    eyebrow: "Sobre nosotros",
    titleBefore: "Un estudio pequeño, ",
    titleAccent: "gran",
    titleAfter: " responsabilidad.",
    lead: "Restadigi es un estudio digital independiente que crea sitios web y refuerza la visibilidad digital de pymes. Usamos la tecnología más reciente para que los sitios se lancen rápido, funcionen en todos los dispositivos y sean fáciles de actualizar.",
    secondary:
      "Preferimos colaboraciones a largo plazo: las mismas manos que diseñan tu sitio también ayudan con su visibilidad y desarrollo a futuro.",
    imageAlt: "Chef preparando un plato en la cocina de un restaurante",
    values: [
      {
        titleAccent: "Hecho a",
        titleRest: "mano",
        body: "Sin plantillas. Cada proyecto se diseña desde cero según tus objetivos.",
      },
      {
        titleAccent: "Precios",
        titleRest: "transparentes",
        body: "Paquetes y extras claros — sabes por qué pagas, de principio a fin.",
      },
      {
        titleAccent: "Colaboración",
        titleRest: "a largo plazo",
        body: "También ayudamos después del lanzamiento — en actualizaciones, desarrollo y mantenimiento.",
      },
    ],
    process: {
      titleBefore: "Cuatro ",
      titleAccent: "pasos",
      titleAfter: " hasta el sitio terminado.",
      steps: [
        {
          n: "01",
          title: "Conversación",
          body: "Definimos juntos objetivos, público y plazos.",
        },
        {
          n: "02",
          title: "Diseño",
          body: "Estructura, identidad visual y contenido se refinan de forma iterativa.",
        },
        {
          n: "03",
          title: "Desarrollo",
          body: "Construimos el sitio optimizado para buscadores y accesible.",
        },
        {
          n: "04",
          title: "Lanzamiento y soporte",
          body: "Publicación, formación en el panel y soporte continuo.",
        },
      ],
    },
    cta: {
      titleBefore: "¿Te suena bien ",
      titleAccent: "colaborar",
      titleAfter: "?",
      button: "Contactar",
    },
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
    },
    midBanner: {
      title: "¡Tu camino hacia el éxito sostenible empieza aquí!",
      description:
        "Descubre abajo los paquetes con los que elevarás la visibilidad online de tu empresa.",
      imageAlt: "Café Freddo's",
    },
    popular: "Popular",
    requestQuote: "Solicitar presupuesto",
    packages: [
      {
        name: "Start",
        tagline: "Un sitio sencillo pero impactante para una pequeña empresa",
        price: "399 € + IVA",
        bullets: [
          "Textos base claros y atractivos para inicio, servicios y contacto — listos para una pequeña empresa",
          "Un sitio web profesional de 1–3 páginas adaptado a tu negocio",
          "Panel de administración fácil de usar para actualizar contenidos tú mismo",
          "Diseño responsive que funciona excelentemente en móvil, tablet y ordenador",
          "Formulario de contacto integrado para que tus clientes te encuentren fácilmente",
          "SEO básico que incluye metadatos, mapa del sitio y optimización del rendimiento",
          "Entrega rápida — sitio listo en tan solo 5 días laborables",
          "30 días de soporte al cliente tras el lanzamiento para consultas y pequeños cambios",
        ],
      },
      {
        name: "Plus",
        tagline: "Un conjunto elegante que presenta tus servicios con claridad",
        price: "549 € + IVA",
        bullets: [...plusBullets],
      },
      {
        name: "Oro",
        tagline: "Paquete Plus más un chatbot inteligente para atención al cliente",
        price: "759 € + IVA",
        bullets: [
          ...plusBullets,
          "Chatbot para el sitio web — responde a clientes 24/7 y captura leads",
        ],
      },
      {
        name: "Diamante",
        tagline: "Paquete Plus más el servicio telefónico Restadigi AI Concierge",
        price: "929 € + IVA",
        featured: true,
        bullets: [
          ...plusBullets,
          "Restadigi AI Concierge — servicio telefónico con IA para reservas y atención 24/7",
        ],
      },
    ],
    footnoteBefore:
      "Los precios de los paquetes son fijos. El dominio y el hosting se eligen por separado en ",
    footnoteLink: "servicios de mantenimiento",
    footnoteAfter: ".",
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
    popular: "Popular",
    contactCta: "Contactar",
    resultPrefix: "Obtienes:",
    packages: [
      {
        name: "Optimización IA",
        tagline: "Visible también en búsquedas de ChatGPT, Claude, Gemini y Copilot",
        description:
          "La búsqueda en la web está cambiando. Cada vez más personas encuentran empresas, productos y servicios conversando con la IA. Nuestro servicio de optimización IA ayuda a mantener al día los datos de tu empresa y a que el contenido de tu sitio respalde la capacidad de los servicios de IA para reconocer tu negocio en el contexto correcto.",
        price: "100 € / año",
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
        description:
          "Google sigue siendo uno de los canales más importantes para encontrar empresas, productos y servicios. Nuestra optimización Google es un servicio ligero de mantenimiento anual cuyo objetivo es garantizar que tu sitio cumpla los requisitos básicos de SEO y apoye la descubribilidad.",
        price: "100 € / año",
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
    ],
    footnote: "Los precios son anuales. Solo pagas por lo que necesitas — sin costes ocultos.",
    branding: {
      titleBefore: "Diseño ",
      titleAccent: "gráfico",
      titleAfter: ".",
      description:
        "Identidad de marca, materiales de marketing y trabajos de diseño individuales — precios claros y resultado profesional.",
      products: [
        {
          name: "Diseño de identidad corporativa",
          description: "Imagen de marca completa, incluye diseño de logo y tarjetas de visita.",
          price: "desde 199 €",
        },
        {
          name: "Materiales publicitarios y de marketing",
          price: "desde 149 €",
        },
        {
          name: "Diseño de logo",
          price: "desde 149 €",
        },
        {
          name: "Diseño de tarjetas de visita",
          price: "desde 99 €",
        },
      ],
      billing: {
        title: "Sobre la facturación",
        intro:
          "Aplicamos un anticipo: parte del trabajo se factura antes de empezar el proyecto, una vez aceptado el presupuesto por escrito. Así se comprometen tanto el cliente como el proveedor.",
        groundsTitle: "Motivos",
        grounds: [
          {
            title: "Reserva del tiempo del diseñador",
            body: "Cuando empieza un proyecto, reservamos tiempo en el calendario. Si el cliente cancela a mitad o desaparece, podemos perder la oportunidad de aceptar otros trabajos en ese periodo. El anticipo actúa como reserva y confirma el compromiso del cliente.",
          },
          {
            title: "Riesgo de trabajo sin cobrar",
            body: "En el trabajo creativo el resultado suele crearse antes de entregar algo concreto (por ejemplo el logo o la identidad visual nace durante el proceso). Sin anticipo podríamos acabar en una situación en la que:",
            bullets: [
              "el cliente no paga la factura",
              "el cliente desaparece",
              "el proyecto se interrumpe",
            ],
          },
          {
            title: "Flujo de caja",
            body: "Si todos los proyectos se facturaran solo al final, podríamos trabajar semanas o meses sin flujo de caja. El anticipo reduce ese riesgo y garantiza al menos parte de la retribución por el trabajo ya realizado.",
          },
        ],
      },
      form: {
        title: "Solicita presupuesto de diseño gráfico o de web",
        name: "Nombre",
        email: "Correo electrónico",
        phone: "Teléfono",
        submit: "Enviar solicitud",
        sending: "Abriendo el correo…",
        mailSubject: "Solicitud de presupuesto: diseño gráfico / web — {name}",
        mailBody:
          "Nombre: {name}\nCorreo: {email}\nTeléfono: {phone}\n\nSolicito presupuesto de diseño gráfico o de una web.",
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
      title: "Atención al cliente con IA — Restadigi",
      description:
        "Chatbot inteligente para tu web — atiende clientes 24/7, responde preguntas, captura leads y libera a tu equipo.",
      ogTitle: "Atención al cliente con IA — Restadigi",
      ogDescription: "Chatbot para la web — ventas y atención al cliente las 24 horas.",
    },
    hero: {
      titleBefore: "Atención ",
      titleAccent: "inteligente",
      titleAfter: " para tu empresa.",
      description:
        "El chatbot de Restadigi se instala en tu web y atiende a los clientes las 24 horas — responde preguntas, guía hacia los servicios adecuados y captura leads.",
      headlineLine1: "El empleado más barato de tu empresa",
      headlineLine2: "está aquí.",
      subtitle: "Conoce el chatbot personalizable de Restadigi.",
      cta: "Conocer el chatbot",
    },
    chatbot: {
      eyebrow: "Chatbot",
      titleBefore: "Un ",
      titleAccent: "chatbot",
      titleAfter: " inteligente — vendedor y agente de atención las 24 horas.",
      intro:
        "El chatbot es un asistente virtual inteligente instalado en tu web que atiende a los clientes 24/7 — responde preguntas frecuentes, guía hacia los servicios adecuados y captura leads. No sustituye a las personas; es una mano extra fiable cuando tu equipo no está disponible.",
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
      price: "desde 19 €",
      priceNote: "/ mes",
      button: "Solicitar demo gratuita",
    },
  },
  booking: {
    meta: {
      title: "Servicio de reservas de mesa — Restadigi",
      description:
        "Servicio moderno de reservas de mesa para restaurantes — los clientes reservan directamente desde tu web las 24 horas.",
      ogTitle: "Servicio de reservas de mesa — Restadigi",
      ogDescription: "Reservas de mesa fluidas directamente desde la web de tu restaurante.",
    },
    hero: {
      titleAccent: "Reservas de mesa",
      titleAfter: " directamente desde tu web.",
      description:
        "Integramos en la web de tu restaurante un servicio moderno de reservas de mesa que funciona las 24 horas. El cliente elige hora y tamaño del grupo, recibe confirmación por correo y tu equipo ve las reservas en un panel claro.",
    },
    dashboard: {
      eyebrow: "Panel de administración",
      titleBefore: "Reservas en ",
      titleAccent: "calendario",
      titleAfter: " y lista.",
      body: "El equipo ve las reservas del día en tablet o pantalla — confirma, cancela y sigue la disponibilidad de un vistazo.",
    },
    floorPlan: {
      eyebrow: "Plano de mesas",
      titleBefore: "El salón ",
      titleAccent: "en el mapa",
      titleAfter: " — del móvil a la gran pantalla.",
      body: "Plano personalizado según el aforo de tu restaurante. La misma vista funciona en móvil, tablet y la pantalla grande del restaurante.",
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
        title: "Integrado en tu web",
        body: "El servicio encaja a la perfección con la imagen de la web de tu restaurante.",
      },
    ],
    cta: {
      titleBefore: "Toma el control de las ",
      titleAccent: "reservas de mesa",
      titleAfter: ".",
      price: "desde 29 €",
      priceNote: "/ mes — precio mensual fijo",
      button: "Preguntar más",
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
      titleBefore: "Hosting y ",
      titleAccent: "mantenimiento",
      titleAfter: ".",
      description:
        "Mantenemos tu sitio rápido, seguro y al día. Elige el paquete de hosting y mantenimiento adecuado — dominio y SSL incluidos.",
    },
    popular: "Popular",
    requestQuote: "Solicitar presupuesto",
    packages: [
      {
        name: "Basic",
        price: "9,99 € / mes + IVA",
        bullets: [
          "Hosting y dominio incluidos",
          "Hosting rápido y fiable en Finlandia",
          "Certificado SSL (HTTPS) incluido",
          "Dominio (.fi u otro) incluido",
        ],
      },
      {
        name: "Pro Business",
        price: "29,99 € / mes + IVA",
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
          "Soporte personal por teléfono",
        ],
      },
    ],
    footnote:
      "Los precios de hosting y mantenimiento se facturan mensualmente. Dominio y certificado SSL incluidos.",
  },
  widget: {
    sales: {
      openLabel: "Atención al cliente",
      closeLabel: "Cerrar",
      openAria: "Abrir atención al cliente de Restadigi",
      closeAria: "Cerrar atención al cliente",
      dialogAria: "Atención al cliente de Restadigi",
      eyebrow: "Restadigi",
      title: "Atención al cliente",
      welcome:
        "¡Hola! Soy del equipo de atención de Restadigi — encantado de ayudarte a encontrar la solución digital adecuada. Cuéntame brevemente sobre tu negocio y tus ideas, y te presento los servicios que encajan. También puedes dejar teléfono y correo y te contactamos.",
      placeholder: "Escribe tu mensaje…",
      sendAria: "Enviar mensaje",
      typing: "Escribiendo…",
      sendFailed: "No se pudo enviar el mensaje.",
      genericError: "Se produjo un error.",
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
        "¡Hola! Puedo ayudarte a reservar mesa. Indica nombre, personas, fecha, hora (12:00–22:00) y teléfono. El correo es opcional. La duración normal es 2 horas — 3 horas bajo petición.",
      placeholder: "Escribe tu mensaje…",
      sendAria: "Enviar mensaje",
      typing: "Escribiendo…",
      sendFailed: "No se pudo enviar el mensaje.",
      genericError: "Se produjo un error.",
    },
  },
};
