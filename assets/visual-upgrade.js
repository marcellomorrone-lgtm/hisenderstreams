(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const locale = (window.pageConfig && window.pageConfig.locale) || document.documentElement.lang.split('-')[0] || 'de';

  const sectionCopy = {
    de: {
      hero: 'Senderauswahl, Infrastruktur und Betrieb greifen in einer zentral geführten Lösung ineinander.',
      packages: 'Jedes Paket bündelt Sender gezielt nach Gästestruktur, Sprachen und internationaler Ausrichtung.',
      calculator: 'Zimmeranzahl und Leistungsumfang ergeben einen transparenten, direkt vergleichbaren Richtwert.',
      finder: 'Filter führen schnell von der Gästesprache zum passenden Sender und Paket.',
      technology: 'Eine sauber geplante Verbindung sorgt für stabile Streams bis zum Hotel-TV.',
      coax: 'Bestehende Coax-Leitungen können IP-Dienste ohne aufwendige Neuverkabelung ins Zimmer bringen.',
      casting: 'Lineares Fernsehen und persönliche Streaming-Inhalte ergänzen sich zu einem modernen Gästeerlebnis.',
      support: 'Wählbare Servicezeiten sichern den Betrieb passend zu Organisation und Verfügbarkeitsanspruch.',
      project: 'Klare Prüfschritte schaffen Planungssicherheit von der Analyse bis zum stabilen Betrieb.',
      about: 'Beratung, Umsetzung und Schweizer Support kommen bei Hotelinnovativ aus einer Hand.',
      references: 'Langjährige Hospitality-Erfahrung schafft Sicherheit bei Technik, Einführung und Betrieb.',
      faq: 'Die wichtigsten technischen und kommerziellen Fragen auf einen Blick.',
      contact: 'Eine kurze Bestandsaufnahme genügt für eine erste, konkrete Lösungsempfehlung.',
      footer: 'Weitere Bausteine für eine durchgängige digitale Guest Journey.',
      default: 'Klar geplant, zuverlässig umgesetzt und auf den Hotelbetrieb abgestimmt.'
    },
    en: {
      hero: 'Channel selection, infrastructure and operations work together in one centrally managed solution.',
      packages: 'Each package groups channels around guest profiles, languages and international reach.',
      calculator: 'Room count and service level create a transparent, directly comparable estimate.',
      finder: 'Smart filters lead quickly from guest language to the right channel and package.',
      technology: 'A properly planned connection keeps every stream stable all the way to the hotel TV.',
      coax: 'Existing coax cabling can carry IP services to rooms without extensive new wiring.',
      casting: 'Live television and personal streaming content combine into a modern guest experience.',
      support: 'Flexible service windows protect operations according to your availability requirements.',
      project: 'Clear checkpoints create certainty from the first analysis through stable operations.',
      about: 'Consulting, implementation and Swiss support are delivered from one source.',
      references: 'Long-standing hospitality experience reduces risk in technology, rollout and operations.',
      faq: 'The most important technical and commercial questions at a glance.',
      contact: 'A short infrastructure review is enough for an initial, concrete recommendation.',
      footer: 'Additional modules for a consistent digital guest journey.',
      default: 'Clearly planned, reliably delivered and tailored to hotel operations.'
    },
    fr: {
      hero: 'Sélection des chaînes, infrastructure et exploitation s’intègrent dans une solution centralisée.',
      packages: 'Chaque bouquet regroupe les chaînes selon les profils clients, les langues et l’ouverture internationale.',
      calculator: 'Le nombre de chambres et le niveau de service donnent une estimation transparente et comparable.',
      finder: 'Des filtres précis mènent rapidement de la langue du client à la chaîne et au bouquet adaptés.',
      technology: 'Une connexion bien planifiée garantit des flux stables jusqu’au téléviseur de la chambre.',
      coax: 'Le câblage coaxial existant peut transporter les services IP sans nouveau câblage complexe.',
      casting: 'Télévision en direct et contenus personnels se combinent pour une expérience client moderne.',
      support: 'Des plages de service flexibles sécurisent l’exploitation selon vos exigences de disponibilité.',
      project: 'Des étapes claires sécurisent le projet, de l’analyse initiale à l’exploitation stable.',
      about: 'Conseil, mise en œuvre et support suisse sont réunis auprès d’un seul partenaire.',
      references: 'Une longue expérience hospitality sécurise la technologie, le déploiement et l’exploitation.',
      faq: 'Les principales questions techniques et commerciales en un coup d’œil.',
      contact: 'Un bref état des lieux suffit pour une première recommandation concrète.',
      footer: 'Des modules complémentaires pour un parcours client numérique cohérent.',
      default: 'Une planification claire, une réalisation fiable et une solution adaptée à l’hôtel.'
    },
    it: {
      hero: 'Selezione dei canali, infrastruttura ed esercizio confluiscono in un’unica soluzione centralizzata.',
      packages: 'Ogni pacchetto raggruppa i canali in base a ospiti, lingue e orientamento internazionale.',
      calculator: 'Numero di camere e livello di servizio offrono una stima trasparente e confrontabile.',
      finder: 'Filtri mirati conducono rapidamente dalla lingua dell’ospite al canale e pacchetto adatti.',
      technology: 'Una connessione ben pianificata garantisce stream stabili fino all’Hotel TV.',
      coax: 'Il cablaggio coassiale esistente può trasportare servizi IP senza nuovi cavi complessi.',
      casting: 'TV in diretta e contenuti personali si combinano in un’esperienza moderna per l’ospite.',
      support: 'Finestre di assistenza flessibili proteggono l’esercizio secondo le esigenze di disponibilità.',
      project: 'Fasi chiare danno sicurezza dalla prima analisi fino all’esercizio stabile.',
      about: 'Consulenza, implementazione e supporto svizzero provengono da un unico partner.',
      references: 'Una lunga esperienza hospitality riduce i rischi di tecnologia, rollout ed esercizio.',
      faq: 'Le principali domande tecniche e commerciali in sintesi.',
      contact: 'Una breve verifica dell’infrastruttura basta per una prima raccomandazione concreta.',
      footer: 'Moduli aggiuntivi per una guest journey digitale coerente.',
      default: 'Pianificazione chiara, realizzazione affidabile e perfetto adattamento all’hotel.'
    }
  };

  const copy = sectionCopy[locale] || sectionCopy.de;

  document.querySelectorAll('.section-head > p').forEach((paragraph) => paragraph.classList.add('hi-section-intro'));

  document.querySelectorAll('h1, h2, h3, h4').forEach((heading) => {
    heading.classList.add('hi-heading');
    const directParagraph = heading.nextElementSibling && heading.nextElementSibling.matches('p, .lead, .muted');
    const sectionHeadParagraph = heading.closest('.section-head') && heading.closest('.section-head').querySelector(':scope > p');
    if (directParagraph) {
      heading.nextElementSibling.classList.add('hi-heading-copy');
      return;
    }
    if (sectionHeadParagraph) return;

    const section = heading.closest('section');
    const key = section ? (section.id || (section.classList.contains('hero') ? 'hero' : 'default')) : (heading.closest('footer') ? 'footer' : 'default');
    const note = document.createElement('p');
    note.className = 'hi-heading-copy hi-heading-copy-generated';
    note.textContent = copy[key] || copy.default;
    heading.insertAdjacentElement('afterend', note);
  });

  const iconGlyphs = {
    plug: { glyph: 'IP', label: 'IP connection' },
    network: { glyph: 'NET', label: 'Network' },
    tv: { glyph: 'TV', label: 'Hotel TV' },
    streams: { glyph: '≋', label: 'Streams' },
    iptv: { glyph: '▶', label: 'IPTV' },
    cast: { glyph: '◔', label: 'Casting' },
    link: { glyph: '↔', label: 'Connection' },
    shield: { glyph: '✓', label: 'Support' },
    clock: { glyph: '24', label: '24/7 support' },
    globe: { glyph: '◎', label: 'Website' },
    mail: { glyph: '@', label: 'Email' },
    phone: { glyph: '+', label: 'Telephone' }
  };

  function classifyIcon(element, index) {
    const classes = element.className || '';
    for (const key of ['plug', 'network', 'tv', 'streams', 'iptv', 'cast', 'link']) {
      if (classes.includes(`icon-${key}`)) return key;
    }
    if (classes.includes('support-card-icon')) {
      return element.closest('.support-card')?.classList.contains('premium') ? 'clock' : 'shield';
    }
    return index % 2 ? 'network' : 'tv';
  }

  document.querySelectorAll('.icon').forEach((element, index) => {
    const type = classifyIcon(element, index);
    const icon = iconGlyphs[type];
    element.classList.add('hi-icon', `hi-icon-${type}`);
    element.setAttribute('aria-label', icon.label);
    element.innerHTML = `<span class="hi-icon-mark" aria-hidden="true"><span>${icon.glyph}</span><i></i></span>`;
  });

  document.querySelectorAll('.contact-pill').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const type = href.startsWith('mailto:') ? 'mail' : href.startsWith('tel:') ? 'phone' : 'globe';
    const icon = iconGlyphs[type];
    const oldIcon = link.querySelector('svg');
    if (!oldIcon) return;
    const replacement = document.createElement('span');
    replacement.className = `hi-contact-icon hi-contact-icon-${type}`;
    replacement.setAttribute('aria-hidden', 'true');
    replacement.textContent = icon.glyph;
    oldIcon.replaceWith(replacement);
  });

  const rail = document.createElement('div');
  rail.className = 'hi-scroll-rail';
  rail.setAttribute('aria-hidden', 'true');
  rail.innerHTML = '<span></span>';
  document.body.appendChild(rail);

  const navLabels = {
    de: ['Pakete', 'Kosten', 'Sender', 'Technik', 'Kontakt'],
    en: ['Packages', 'Costs', 'Channels', 'Technology', 'Contact'],
    fr: ['Bouquets', 'Coûts', 'Chaînes', 'Technique', 'Contact'],
    it: ['Pacchetti', 'Costi', 'Canali', 'Tecnica', 'Contatto']
  };
  const navTargets = ['packages', 'calculator', 'finder', 'technology', 'contact'];
  const sectionNav = document.createElement('nav');
  sectionNav.className = 'hi-section-nav';
  sectionNav.setAttribute('aria-label', 'Page sections');
  sectionNav.innerHTML = navTargets.map((id, index) => `<a href="#${id}" data-target="${id}"><span></span><b>${(navLabels[locale] || navLabels.de)[index]}</b></a>`).join('');
  document.body.appendChild(sectionNav);

  const animatedItems = document.querySelectorAll('.section, .package-card, .feature, .support-card, .step, .trust-card, .faq-item, .card, .about-card, .coax-card');
  animatedItems.forEach((element, index) => {
    element.classList.add('hi-scroll-item');
    element.style.setProperty('--hi-delay', `${Math.min(index % 6, 5) * 55}ms`);
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hi-in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    animatedItems.forEach((element) => revealObserver.observe(element));

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionNav.querySelectorAll('a').forEach((link) => link.classList.toggle('active', link.dataset.target === entry.target.id));
      });
    }, { threshold: 0.35, rootMargin: '-20% 0px -45% 0px' });
    navTargets.forEach((id) => {
      const target = document.getElementById(id);
      if (target) navObserver.observe(target);
    });
  } else {
    animatedItems.forEach((element) => element.classList.add('hi-in-view'));
  }

  const topbar = document.querySelector('.topbar');
  const heroPanel = document.querySelector('.hero-panel');
  const visualPanels = document.querySelectorAll('.coax-visual, .casting-visual');
  let ticking = false;

  function updateScrollEffects() {
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
    document.documentElement.style.setProperty('--hi-scroll-progress', progress.toFixed(4));
    if (topbar) topbar.classList.toggle('hi-compact', window.scrollY > 48);
    if (!reduceMotion) {
      if (heroPanel) heroPanel.style.setProperty('--hi-parallax', `${Math.min(window.scrollY * 0.045, 24)}px`);
      visualPanels.forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        const offset = Math.max(-18, Math.min(18, (window.innerHeight / 2 - rect.top) * 0.025));
        panel.style.setProperty('--hi-visual-shift', `${offset}px`);
      });
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }, { passive: true });
  updateScrollEffects();
})();
