export type Messages = {
  meta: {
    defaultTitle: string;
    defaultDescription: string;
    ogTitle: string;
    ogDescription: string;
  };
  notFound: {
    code: string;
    title: string;
    description: string;
    goHome: string;
  };
  error: {
    title: string;
    description: string;
    tryAgain: string;
    goHome: string;
  };
  header: {
    services: string;
    industries: string;
    languages: string;
    menu: string;
    homeAria: string;
    logoAlt: string;
    industriesIntro: string;
    industriesList: Array<{ title: string; body: string }>;
    servicesList: Array<{ to: string; label: string }>;
    languagesList: Array<{ code: "fi" | "en" | "es"; label: string }>;
  };
  footer: {
    copyright: string;
    instagram: string;
    behance: string;
    linkedin: string;
  };
  home: {
    meta: {
      title: string;
      description: string;
      ogTitle: string;
      ogDescription: string;
    };
    hero: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      description: string;
      cta: string;
    };
    intro: {
      titleLine1: string;
      titleLine2: string;
      body: string;
      callCta: string;
      phoneDisplay: string;
      phoneTel: string;
      bookCta: string;
    };
    whyUs: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      description: string;
      items: Array<{
        title: string;
        body: string;
        href: string;
        linkLabel: string;
      }>;
    };
    projects: {
      titleBefore: string;
      titleAccent: string;
      delfin: {
        logoAlt: string;
        screenAlt: string;
        calendarAlt: string;
        title: string;
        titleAccent: string;
        platforms: string;
        body: string;
        link: string;
      };
      rafa: {
        heroAlt: string;
        logoAlt: string;
        title: string;
        titleAccent: string;
        tag: string;
        body: string;
        link: string;
      };
    };
    cta: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      quoteCta: string;
      callCta: string;
    };
  };
  contact: {
    meta: {
      title: string;
      description: string;
      ogTitle: string;
      ogDescription: string;
    };
    hero: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      description: string;
    };
    labels: {
      email: string;
      phone: string;
      studio: string;
      social: string;
    };
    email: string;
    phoneDisplay: string;
    phoneTel: string;
    studioLine1: string;
    studioLine2: string;
    form: {
      name: string;
      company: string;
      email: string;
      budget: string;
      message: string;
      messagePlaceholder: string;
      selectPlaceholder: string;
      submit: string;
      sending: string;
      budgetOptions: string[];
      mailSubject: string;
      mailBody: string;
    };
  };
  about: {
    meta: {
      title: string;
      description: string;
      ogTitle: string;
      ogDescription: string;
    };
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    lead: string;
    secondary: string;
    imageAlt: string;
    values: Array<{ titleAccent: string; titleRest: string; body: string }>;
    process: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      steps: Array<{ n: string; title: string; body: string }>;
    };
    cta: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      button: string;
    };
  };
  websites: {
    meta: {
      title: string;
      description: string;
      ogTitle: string;
      ogDescription: string;
    };
    hero: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      description: string;
    };
    popular: string;
    requestQuote: string;
    packages: Array<{
      name: string;
      tagline: string;
      price: string;
      featured?: boolean;
      bullets: string[];
    }>;
    footnoteBefore: string;
    footnoteLink: string;
    footnoteAfter: string;
  };
  visibility: {
    meta: {
      title: string;
      description: string;
      ogTitle: string;
      ogDescription: string;
    };
    hero: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      description: string;
    };
    popular: string;
    contactCta: string;
    resultPrefix: string;
    packages: Array<{
      name: string;
      tagline: string;
      description: string;
      price: string;
      featured?: boolean;
      bullets: string[];
      result: string;
    }>;
    footnote: string;
    branding: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      description: string;
      customQuote: string;
      extras: Array<{ name: string; price: string }>;
    };
    cta: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      button: string;
    };
  };
  chatbot: {
    meta: {
      title: string;
      description: string;
      ogTitle: string;
      ogDescription: string;
    };
    hero: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      description: string;
    };
    chatbot: {
      eyebrow: string;
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      intro: string;
      benefits: Array<{ title: string; body: string }>;
      safeTitleBefore: string;
      safeTitleAccent: string;
      safeTitleAfter: string;
      safeBody: string;
      monthly: Array<{ title: string; body: string }>;
    };
    concierge: {
      eyebrow: string;
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      intro: string;
      features: string[];
      benefits: string[];
      audienceTitleBefore: string;
      audienceTitleAccent: string;
      audienceTitleAfter: string;
      audienceBody: string;
      audience: string[];
      price: string;
      priceBody: string;
      priceIncludesLabel: string;
      pricingIncludes: string[];
      pricingNote: string;
    };
    cta: {
      titleBefore: string;
      titleAccent: string;
      body: string;
      questions: string[];
      button: string;
    };
  };
  booking: {
    meta: {
      title: string;
      description: string;
      ogTitle: string;
      ogDescription: string;
    };
    hero: {
      titleAccent: string;
      titleAfter: string;
      description: string;
    };
    features: Array<{ title: string; body: string }>;
    cta: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      button: string;
    };
  };
  hosting: {
    meta: {
      title: string;
      description: string;
      ogTitle: string;
      ogDescription: string;
    };
    hero: {
      titleBefore: string;
      titleAccent: string;
      titleAfter: string;
      description: string;
    };
    popular: string;
    requestQuote: string;
    packages: Array<{
      name: string;
      price: string;
      featured?: boolean;
      bullets: string[];
    }>;
    footnote: string;
  };
  widget: {
    openLabel: string;
    closeLabel: string;
    openAria: string;
    closeAria: string;
    dialogAria: string;
    eyebrow: string;
    welcome: string;
    placeholder: string;
    sendAria: string;
    typing: string;
    sendFailed: string;
    genericError: string;
  };
};
