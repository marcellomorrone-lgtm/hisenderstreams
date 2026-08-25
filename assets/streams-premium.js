(() => {
  "use strict";

  const locale = document.documentElement.lang || "de";
  const copy = {
    de: {
      title: "TV-Senderstreams für Hotels | Hotelinnovativ",
      description: "250+ internationale TV-Sender für Hotels – zuverlässig über IP, zentral betreut und passend zu Ihren Gästen.",
      storyStatusValues: ["250+ Sender bereit", "8+ Sprachwelten aktiv", "Alle Streams stabil", "Betrieb überwacht"],
      storyStatusSubs: ["Portfolio aktuell", "Gästeprofil passend", "Signal stabil", "Schweizer Support"],
      searchPlaceholder: "TV- oder Radiosender suchen", typeAll: "TV & Radio", typeTV: "TV-Sender", typeRadio: "Radiosender", resultsAll: "Programme gefunden", resultsTV: "TV-Sender gefunden", resultsRadio: "Radiosender gefunden", mediaTV: "TV", mediaRadio: "Radio", finderHint: "Offizielles Hotelinnovativ Line-up: 264 TV-Sender und 141 Radiosender.",
      languageNames: { de: "Deutsch", fr: "Französisch", it: "Italienisch", en: "Englisch", es: "Spanisch", ar: "Arabisch", nl: "Niederländisch", zh: "Chinesisch", hu: "Ungarisch", other: "Weitere Sprachen" },
      categoryNames: { news: "Nachrichten", entertainment: "Unterhaltung", sports: "Sport", culture: "Kultur", kids: "Kinder", music: "Musik", general: "Vollprogramm", movies: "Filme", radio: "Radio" },
      noResults: "Keine passenden Sender gefunden."
    },
    en: {
      title: "TV Channel Streams for Hotels | Hotelinnovativ",
      description: "250+ international TV channels for hotels – reliably distributed over IP, centrally managed and tailored to your guests.",
      navStory: "Channel world", navPackages: "Packages", navFinder: "Channel finder", navCta: "Discuss your project",
      heroEyebrow: "TV channel streams · Swiss made",
      heroTitle: "The world is your guest.<br><em>Its television too.</em>",
      heroLead: "Up to 250+ live channels in 8+ languages – reliably distributed over IP, centrally monitored and tailored to your guest profile.",
      heroPrimary: "Experience the channel world", heroSecondary: "Compare packages",
      heroMetric1: "live channels", heroMetric2: "languages", heroMetric3: "monitoring",
      heroSignature: "One channel world.<br>Every room connected.", heroScroll: "Scroll to start the journey",
      manifestEyebrow: "Familiar for guests. Clear for hotels.",
      manifestTitle: "Television is more than a signal.<br><em>It is a piece of home.</em>",
      manifestLead: "International guests expect familiar news, sports and entertainment. Hotelinnovativ makes this variety predictable, stable and easy to operate.",
      metricChannels: "curated channels", metricLanguages: "language regions", metricOperation: "central operation",
      storyLabel: "TV STREAM JOURNEY",
      chapter1Eyebrow: "01 · CHANNEL WORLD", chapter1Title: "International by design.<br><em>Personal on arrival.</em>", chapter1Label: "For every guest profile", chapter1Body: "From Swiss core channels to international news, sports, culture and entertainment – curated rather than arbitrary.",
      chapter2Eyebrow: "02 · GUEST EXPERIENCE", chapter2Title: "The familiar channel.<br><em>Away from home.</em>", chapter2Label: "Relevance in the room", chapter2Body: "Guests find what they know faster. Clear line-ups and relevant language worlds make hotel TV intuitive.",
      chapter3Eyebrow: "03 · IP DISTRIBUTION", chapter3Title: "One signal.<br><em>Every room.</em>", chapter3Label: "Stable all the way to the TV", chapter3Body: "Streams are prepared centrally, monitored and securely distributed to rooms over the existing network infrastructure.",
      chapter4Eyebrow: "04 · OPERATIONS", chapter4Title: "Centrally visible.<br><em>Locally supported.</em>", chapter4Label: "Swiss support", chapter4Body: "Channel status, package changes and incidents remain transparent. Hotelinnovativ supports planning, implementation and operation.",
      storyStatus: "LIVE STATUS", storyStatusValue: "250+ channels ready", storyStatusSub: "Signal stable",
      storyStatusValues: ["250+ channels ready", "8+ language worlds active", "All streams stable", "Operations monitored"],
      storyStatusSubs: ["Portfolio current", "Guest profile matched", "Signal stable", "Swiss support"],
      logosEyebrow: "Familiar channels. International variety.", logosLead: "A selection from our continuously maintained channel portfolio.",
      packagesEyebrow: "Three packages. One clear decision.", packagesTitle: "As much channel variety<br><em>as your hotel needs.</em>", packagesLead: "Packages follow your guest profile, language regions and positioning – compact, transparent and expandable.",
      basicTitle: "The most important source markets", basicF1: "Swiss core channels", basicF2: "Relevant neighbouring markets", basicF3: "HD quality included",
      essentialTitle: "The international hotel standard", essentialF1: "Broad European coverage", essentialF2: "More channels in core languages", essentialF3: "Ideal for most hotels",
      maxTitle: "For guests from around the world", maxF1: "Maximum international variety", maxF2: "Additional language regions", maxF3: "For resorts and international properties",
      recommended: "Recommended", packageCta: "Request advice ↗",
      finderEyebrow: "Channel finder", finderTitle: "Find quickly.<br><em>Compare clearly.</em>", finderLead: "Search the portfolio by language, category and package. The channel view stays deliberately compact.",
      searchPlaceholder: "Search TV or radio", packageAll: "All packages", langAll: "All languages", categoryAll: "All categories", typeAll: "TV & radio", typeTV: "TV channels", typeRadio: "Radio stations", resultsAll: "services found", resultsTV: "TV channels found", resultsRadio: "radio stations found", mediaTV: "TV", mediaRadio: "Radio", reset: "Reset", resultsLabel: "services found", finderHint: "Official Hotelinnovativ line-up: 264 TV channels and 141 radio stations.", showMore: "Show more ↓",
      platformEyebrow: "One source. Every room.", platformTitle: "Technically precise.<br><em>Quiet in operation.</em>", platformLead: "From source and headend to network and hotel TV: every step is planned, documented and monitored.", platformCta: "Check your infrastructure",
      contactEyebrow: "Your channel world starts here", contactTitle: "Ready for<br><em>television with vision?</em>", contactLead: "30 minutes. Your hotel. Your guest profile. Together we define package, infrastructure and operation.", contactCta: "Discuss your project",
      footerClaim: "The right channel world for every hotel.<br>International, reliable and centrally managed.", footerDiscover: "Discover", footerLink1: "Channel world", footerLink2: "Channel packages", footerLink3: "Channel finder", footerLink4: "Technology & operations", footerContact: "Contact", footerSignature: "TV channel streams for hotels · Swiss Made",
      languageNames: { de: "German", fr: "French", it: "Italian", en: "English", es: "Spanish", ar: "Arabic", nl: "Dutch", zh: "Chinese", hu: "Hungarian", other: "Other languages" },
      categoryNames: { news: "News", entertainment: "Entertainment", sports: "Sports", culture: "Culture", kids: "Kids", music: "Music", general: "General", movies: "Movies", radio: "Radio" },
      noResults: "No matching channels found."
    },
    fr: {
      title: "Flux TV pour hôtels | Hotelinnovativ",
      description: "250+ chaînes internationales pour hôtels – distribuées de manière fiable par IP, gérées centralement et adaptées à vos clients.",
      navStory: "Univers TV", navPackages: "Bouquets", navFinder: "Recherche", navCta: "Parler du projet",
      heroEyebrow: "Flux TV · Swiss made", heroTitle: "Le monde est votre hôte.<br><em>Sa télévision aussi.</em>",
      heroLead: "Jusqu’à 250+ chaînes en direct dans 8+ langues – distribuées de manière fiable par IP, supervisées centralement et adaptées à votre clientèle.",
      heroPrimary: "Découvrir l’univers TV", heroSecondary: "Comparer les bouquets", heroMetric1: "chaînes en direct", heroMetric2: "langues", heroMetric3: "supervision",
      heroSignature: "Un univers TV.<br>Chaque chambre connectée.", heroScroll: "Faites défiler pour commencer",
      manifestEyebrow: "Familier pour les clients. Clair pour l’hôtel.", manifestTitle: "La télévision est plus qu’un signal.<br><em>C’est un peu de chez soi.</em>",
      manifestLead: "Les clients internationaux attendent leurs chaînes d’information, de sport et de divertissement. Hotelinnovativ rend cette diversité prévisible, stable et simple à exploiter.",
      metricChannels: "chaînes sélectionnées", metricLanguages: "espaces linguistiques", metricOperation: "exploitation centrale",
      storyLabel: "PARCOURS TV STREAM",
      chapter1Eyebrow: "01 · UNIVERS TV", chapter1Title: "Pensé à l’international.<br><em>Reçu personnellement.</em>", chapter1Label: "Pour chaque clientèle", chapter1Body: "Des chaînes suisses aux actualités, sports, cultures et divertissements internationaux – une sélection pertinente.",
      chapter2Eyebrow: "02 · EXPÉRIENCE CLIENT", chapter2Title: "La chaîne familière.<br><em>Loin de chez soi.</em>", chapter2Label: "Pertinence dans la chambre", chapter2Body: "Les clients trouvent plus vite ce qu’ils connaissent. Des listes claires et des univers linguistiques adaptés rendent la TV intuitive.",
      chapter3Eyebrow: "03 · DISTRIBUTION IP", chapter3Title: "Un signal.<br><em>Chaque chambre.</em>", chapter3Label: "Stable jusqu’au téléviseur", chapter3Body: "Les flux sont préparés et supervisés centralement, puis distribués de manière sécurisée sur l’infrastructure réseau existante.",
      chapter4Eyebrow: "04 · EXPLOITATION", chapter4Title: "Vue centrale.<br><em>Support local.</em>", chapter4Label: "Support suisse", chapter4Body: "État des chaînes, changements de bouquets et incidents restent transparents. Hotelinnovativ accompagne planification, réalisation et exploitation.",
      storyStatus: "STATUT EN DIRECT", storyStatusValue: "250+ chaînes prêtes", storyStatusSub: "Signal stable",
      storyStatusValues: ["250+ chaînes prêtes", "8+ univers linguistiques actifs", "Tous les flux stables", "Exploitation supervisée"], storyStatusSubs: ["Portfolio à jour", "Profil client adapté", "Signal stable", "Support suisse"],
      logosEyebrow: "Chaînes familières. Diversité internationale.", logosLead: "Une sélection de notre portefeuille de chaînes continuellement actualisé.",
      packagesEyebrow: "Trois bouquets. Une décision claire.", packagesTitle: "Toute la diversité TV<br><em>dont votre hôtel a besoin.</em>", packagesLead: "Les bouquets suivent votre clientèle, vos langues et votre positionnement – compacts, transparents et évolutifs.",
      basicTitle: "Les principaux marchés d’origine", basicF1: "Chaînes suisses essentielles", basicF2: "Marchés voisins pertinents", basicF3: "Qualité HD incluse",
      essentialTitle: "Le standard hôtelier international", essentialF1: "Large couverture européenne", essentialF2: "Plus de chaînes dans les langues principales", essentialF3: "Idéal pour la plupart des hôtels",
      maxTitle: "Pour les clients du monde entier", maxF1: "Diversité internationale maximale", maxF2: "Espaces linguistiques supplémentaires", maxF3: "Pour resorts et hôtels internationaux",
      recommended: "Recommandé", packageCta: "Demander conseil ↗",
      finderEyebrow: "Recherche de chaînes", finderTitle: "Trouver vite.<br><em>Comparer clairement.</em>", finderLead: "Parcourez le portefeuille par langue, catégorie et bouquet. L’affichage reste volontairement compact.",
      searchPlaceholder: "Rechercher TV ou radio", packageAll: "Tous les bouquets", langAll: "Toutes les langues", categoryAll: "Toutes les catégories", typeAll: "TV & radio", typeTV: "Chaînes TV", typeRadio: "Radios", resultsAll: "programmes trouvés", resultsTV: "chaînes TV trouvées", resultsRadio: "radios trouvées", mediaTV: "TV", mediaRadio: "Radio", reset: "Réinitialiser", resultsLabel: "programmes trouvés", finderHint: "Line-up officiel Hotelinnovativ : 264 chaînes TV et 141 radios.", showMore: "Afficher plus ↓",
      platformEyebrow: "Une source. Chaque chambre.", platformTitle: "Précision technique.<br><em>Sérénité opérationnelle.</em>", platformLead: "De la source au headend, du réseau au téléviseur: chaque étape est planifiée, documentée et supervisée.", platformCta: "Faire vérifier l’infrastructure",
      contactEyebrow: "Votre univers TV commence ici", contactTitle: "Prêt pour une<br><em>télévision avec vision?</em>", contactLead: "30 minutes. Votre hôtel. Votre clientèle. Ensemble, nous définissons bouquet, infrastructure et exploitation.", contactCta: "Parler du projet",
      footerClaim: "Le bouquet TV adapté à chaque hôtel.<br>International, fiable et géré de manière centralisée.", footerDiscover: "Découvrir", footerLink1: "Univers TV", footerLink2: "Bouquets TV", footerLink3: "Recherche de chaînes", footerLink4: "Technique & exploitation", footerContact: "Contact", footerSignature: "Flux TV pour hôtels · Swiss Made",
      languageNames: { de: "Allemand", fr: "Français", it: "Italien", en: "Anglais", es: "Espagnol", ar: "Arabe", nl: "Néerlandais", zh: "Chinois", hu: "Hongrois", other: "Autres langues" },
      categoryNames: { news: "Actualités", entertainment: "Divertissement", sports: "Sport", culture: "Culture", kids: "Enfants", music: "Musique", general: "Généraliste", movies: "Films", radio: "Radio" },
      noResults: "Aucune chaîne correspondante."
    },
    it: {
      title: "Stream TV per hotel | Hotelinnovativ",
      description: "250+ canali internazionali per hotel – distribuiti via IP in modo affidabile, gestiti centralmente e adatti ai vostri ospiti.",
      navStory: "Mondo TV", navPackages: "Pacchetti", navFinder: "Cerca canali", navCta: "Parliamo del progetto",
      heroEyebrow: "Stream TV · Swiss made", heroTitle: "Il mondo è vostro ospite.<br><em>Anche la sua TV.</em>",
      heroLead: "Fino a 250+ canali live in 8+ lingue – distribuiti via IP in modo affidabile, monitorati centralmente e adatti al profilo dei vostri ospiti.",
      heroPrimary: "Scopri il mondo TV", heroSecondary: "Confronta i pacchetti", heroMetric1: "canali live", heroMetric2: "lingue", heroMetric3: "monitoraggio",
      heroSignature: "Un mondo TV.<br>Ogni camera connessa.", heroScroll: "Scorri per iniziare",
      manifestEyebrow: "Familiare per gli ospiti. Chiaro per l’hotel.", manifestTitle: "La televisione è più di un segnale.<br><em>È un pezzo di casa.</em>",
      manifestLead: "Gli ospiti internazionali si aspettano notizie, sport e intrattenimento familiari. Hotelinnovativ rende questa varietà pianificabile, stabile e semplice da gestire.",
      metricChannels: "canali selezionati", metricLanguages: "aree linguistiche", metricOperation: "gestione centrale",
      storyLabel: "PERCORSO TV STREAM",
      chapter1Eyebrow: "01 · MONDO TV", chapter1Title: "Pensato internazionale.<br><em>Ricevuto personale.</em>", chapter1Label: "Per ogni profilo ospite", chapter1Body: "Dai canali svizzeri a notizie, sport, cultura e intrattenimento internazionali – selezionati con criterio.",
      chapter2Eyebrow: "02 · ESPERIENZA OSPITE", chapter2Title: "Il canale familiare.<br><em>Lontano da casa.</em>", chapter2Label: "Rilevanza in camera", chapter2Body: "Gli ospiti trovano più rapidamente ciò che conoscono. Liste chiare e mondi linguistici adatti rendono la TV intuitiva.",
      chapter3Eyebrow: "03 · DISTRIBUZIONE IP", chapter3Title: "Un segnale.<br><em>Ogni camera.</em>", chapter3Label: "Stabile fino al televisore", chapter3Body: "Gli stream vengono preparati e monitorati centralmente, poi distribuiti in sicurezza sulla rete esistente.",
      chapter4Eyebrow: "04 · GESTIONE", chapter4Title: "Controllo centrale.<br><em>Supporto locale.</em>", chapter4Label: "Supporto svizzero", chapter4Body: "Stato dei canali, modifiche ai pacchetti e guasti restano trasparenti. Hotelinnovativ accompagna pianificazione, realizzazione e gestione.",
      storyStatus: "STATO LIVE", storyStatusValue: "250+ canali pronti", storyStatusSub: "Segnale stabile",
      storyStatusValues: ["250+ canali pronti", "8+ mondi linguistici attivi", "Tutti gli stream stabili", "Gestione monitorata"], storyStatusSubs: ["Portfolio aggiornato", "Profilo ospite adatto", "Segnale stabile", "Supporto svizzero"],
      logosEyebrow: "Canali familiari. Varietà internazionale.", logosLead: "Una selezione dal nostro portfolio di canali continuamente aggiornato.",
      packagesEyebrow: "Tre pacchetti. Una scelta chiara.", packagesTitle: "Tutta la varietà TV<br><em>che serve al vostro hotel.</em>", packagesLead: "I pacchetti seguono il profilo degli ospiti, le lingue e il posizionamento – compatti, trasparenti ed espandibili.",
      basicTitle: "I principali mercati di provenienza", basicF1: "Canali svizzeri essenziali", basicF2: "Mercati vicini rilevanti", basicF3: "Qualità HD inclusa",
      essentialTitle: "Lo standard alberghiero internazionale", essentialF1: "Ampia copertura europea", essentialF2: "Più canali nelle lingue principali", essentialF3: "Ideale per la maggior parte degli hotel",
      maxTitle: "Per ospiti da tutto il mondo", maxF1: "Massima varietà internazionale", maxF2: "Aree linguistiche aggiuntive", maxF3: "Per resort e strutture internazionali",
      recommended: "Consigliato", packageCta: "Richiedi consulenza ↗",
      finderEyebrow: "Ricerca canali", finderTitle: "Trova subito.<br><em>Confronta con chiarezza.</em>", finderLead: "Cercate nel portfolio per lingua, categoria e pacchetto. La visualizzazione resta volutamente compatta.",
      searchPlaceholder: "Cerca TV o radio", packageAll: "Tutti i pacchetti", langAll: "Tutte le lingue", categoryAll: "Tutte le categorie", typeAll: "TV & radio", typeTV: "Canali TV", typeRadio: "Radio", resultsAll: "programmi trovati", resultsTV: "canali TV trovati", resultsRadio: "radio trovate", mediaTV: "TV", mediaRadio: "Radio", reset: "Reimposta", resultsLabel: "programmi trovati", finderHint: "Line-up ufficiale Hotelinnovativ: 264 canali TV e 141 radio.", showMore: "Mostra altri ↓",
      platformEyebrow: "Una fonte. Ogni camera.", platformTitle: "Precisione tecnica.<br><em>Tranquillità operativa.</em>", platformLead: "Dalla sorgente e headend alla rete e al TV: ogni passaggio è pianificato, documentato e monitorato.", platformCta: "Verifica l’infrastruttura",
      contactEyebrow: "Il vostro mondo TV inizia qui", contactTitle: "Pronti per una<br><em>TV con visione?</em>", contactLead: "30 minuti. Il vostro hotel. I vostri ospiti. Insieme definiamo pacchetto, infrastruttura e gestione.", contactCta: "Parliamo del progetto",
      footerClaim: "Il bouquet TV adatto a ogni hotel.<br>Internazionale, affidabile e gestito centralmente.", footerDiscover: "Scoprire", footerLink1: "Mondo TV", footerLink2: "Pacchetti TV", footerLink3: "Ricerca canali", footerLink4: "Tecnologia & gestione", footerContact: "Contatto", footerSignature: "Stream TV per hotel · Swiss Made",
      languageNames: { de: "Tedesco", fr: "Francese", it: "Italiano", en: "Inglese", es: "Spagnolo", ar: "Arabo", nl: "Olandese", zh: "Cinese", hu: "Ungherese", other: "Altre lingue" },
      categoryNames: { news: "Notizie", entertainment: "Intrattenimento", sports: "Sport", culture: "Cultura", kids: "Bambini", music: "Musica", general: "Generalista", movies: "Film", radio: "Radio" },
      noResults: "Nessun canale corrispondente."
    }
  };

  const c = copy[locale] || copy.de;
  if (c.title) document.title = c.title;
  const description = document.querySelector('meta[name="description"]');
  if (description && c.description) description.content = c.description;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = c[element.dataset.i18n];
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = c[element.dataset.i18nHtml];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = c[element.dataset.i18nPlaceholder];
    if (value) element.placeholder = value;
  });
  document.querySelectorAll(".language-switcher a").forEach((link) => {
    link.removeAttribute("aria-current");
    const target = link.getAttribute("href");
    if ((locale === "de" && target === "/") || target === `/${locale}/`) link.setAttribute("aria-current", "page");
  });

  const progress = document.querySelector(".page-progress i");
  const header = document.querySelector(".site-header");
  const cursor = document.querySelector(".cursor-glow");
  const menu = document.querySelector(".menu-toggle");
  menu?.addEventListener("click", () => {
    const active = header.classList.toggle("menu-active");
    menu.setAttribute("aria-expanded", String(active));
  });
  header?.querySelectorAll("nav a").forEach((link) => link.addEventListener("click", () => {
    header.classList.remove("menu-active");
    menu?.setAttribute("aria-expanded", "false");
  }));

  if (cursor && matchMedia("(pointer:fine)").matches) {
    addEventListener("pointermove", (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add("visible"), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -7% 0px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  const story = document.querySelector(".story-scroll");
  const storyStage = document.querySelector(".story-stage");
  const backgrounds = [...document.querySelectorAll(".story-bg")];
  const chapters = [...document.querySelectorAll(".story-copy")];
  const stops = [...document.querySelectorAll(".rail-stops span")];
  const counter = document.querySelector(".story-counter span");
  const statusValue = document.querySelector(".story-status strong");
  const statusSub = document.querySelector(".story-status b");
  let currentChapter = 0;

  const activateChapter = (index) => {
    if (index === currentChapter && backgrounds[index]?.classList.contains("active")) return;
    currentChapter = index;
    backgrounds.forEach((item, i) => item.classList.toggle("active", i === index));
    chapters.forEach((item, i) => item.classList.toggle("active", i === index));
    stops.forEach((item, i) => item.classList.toggle("active", i === index));
    if (counter) counter.textContent = String(index + 1).padStart(2, "0");
    if (statusValue) statusValue.textContent = c.storyStatusValues[index];
    if (statusSub) statusSub.textContent = c.storyStatusSubs[index];
  };

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    header?.classList.toggle("scrolled", scrollY > 30);
    if (!story || !storyStage) return;
    const rect = story.getBoundingClientRect();
    const distance = story.offsetHeight - innerHeight;
    const storyProgress = Math.min(1, Math.max(0, -rect.top / Math.max(1, distance)));
    storyStage.style.setProperty("--story-progress", String(storyProgress));
    const chapter = Math.min(3, Math.floor(Math.min(.9999, storyProgress) * 4));
    activateChapter(chapter);
  };
  addEventListener("scroll", updateScroll, { passive: true });
  addEventListener("resize", updateScroll, { passive: true });
  updateScroll();

  document.querySelectorAll(".magnetic").forEach((element) => {
    if (!matchMedia("(pointer:fine)").matches) return;
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      element.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .09}px,${(event.clientY - rect.top - rect.height / 2) * .09}px)`;
    });
    element.addEventListener("pointerleave", () => { element.style.transform = ""; });
  });

  const logoFiles = [
    ["srf-1.png","SRF 1"],["srf-zwei.png","SRF zwei"],["tele-zueri.png","TeleZüri"],
    ["tele-baern.png","TeleBärn"],["rts-1.png","RTS 1"],["rsi-la-2.png","RSI LA 2"],
    ["das-erste-ard.png","ARD"],["zdf.png","ZDF"],["3sat.png","3sat"],["arte-deutsch.png","arte"],
    ["france-2.png","France 2"],["tf1.png","TF1"],["rai-1.png","Rai 1"],["bbc-one.png","BBC One"],
    ["cnn-international.png","CNN"],["orf-1.png","ORF 1"],["blue-zoom.png","blue Zoom"]
  ];
  const marquee = document.querySelector(".channel-marquee-track");
  if (marquee) {
    const set = logoFiles.map(([file,label]) => `<span class="channel-logo"><img src="/assets/channel-logos/${file}" alt="${label}"></span>`).join("");
    marquee.innerHTML = set + set;
  }

  const channels = Array.isArray(window.channelData) ? window.channelData : [];
  const search = document.getElementById("channelSearch");
  const typeFilter = document.getElementById("typeFilter");
  const packageFilter = document.getElementById("packageFilter");
  const languageFilter = document.getElementById("languageFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const reset = document.getElementById("resetFilters");
  const resultCount = document.getElementById("resultCount");
  const channelGrid = document.getElementById("channelGrid");
  const showMore = document.getElementById("showMore");
  let visibleChannels = 20;

  const addOptions = (select, values, labels) => {
    values.forEach((value) => {
      const option = new Option(labels[value] || value, value);
      select?.add(option);
    });
  };
  addOptions(languageFilter, [...new Set(channels.map((item) => item.language).filter(Boolean))].sort(), c.languageNames);
  addOptions(categoryFilter, [...new Set(channels.map((item) => item.category).filter(Boolean))].sort(), c.categoryNames);

  const normalizeLogo = (logo) => {
    if (!logo) return "";
    return logo.startsWith("assets/") ? `/${logo}` : logo;
  };
  const renderChannels = () => {
    const query = (search?.value || "").trim().toLocaleLowerCase(locale);
    const filtered = channels.filter((channel) =>
      (!typeFilter?.value || channel.type === typeFilter.value) &&
      (!packageFilter?.value || (channel.packages || []).includes(packageFilter.value)) &&
      (!languageFilter?.value || channel.language === languageFilter.value) &&
      (!categoryFilter?.value || channel.category === categoryFilter.value) &&
      (!query || channel.name.toLocaleLowerCase(locale).includes(query))
    );
    if (resultCount) resultCount.textContent = String(filtered.length);
    const resultLabel = document.getElementById("resultLabel");
    if (resultLabel) resultLabel.textContent = typeFilter?.value === "tv" ? c.resultsTV : typeFilter?.value === "radio" ? c.resultsRadio : c.resultsAll;
    if (channelGrid) {
      channelGrid.innerHTML = filtered.length ? filtered.slice(0,visibleChannels).map((channel) => {
        const logo = normalizeLogo(channel.logo);
        const language = c.languageNames[channel.language] || channel.language || "";
        const mediaType = channel.type === "radio" ? c.mediaRadio : c.mediaTV;
        return `<article class="channel-card channel-card--${channel.type || "tv"}">
          <span class="channel-card-logo${logo ? "" : " is-fallback"}">${logo ? `<img src="${logo}" alt="${channel.name}" loading="lazy">` : `<span>${channel.badge || channel.name.slice(0,2)}</span>`}</span>
          <span class="channel-card-copy"><strong>${channel.name}</strong><small>#${channel.number || "–"} · ${mediaType} · ${language}</small></span>
        </article>`;
      }).join("") : `<p class="no-results">${c.noResults}</p>`;
    }
    if (showMore) showMore.hidden = visibleChannels >= filtered.length;
  };
  [search,typeFilter,packageFilter,languageFilter,categoryFilter].forEach((control) => control?.addEventListener(control.tagName === "INPUT" ? "input" : "change", () => {
    visibleChannels = 20;
    renderChannels();
  }));
  reset?.addEventListener("click", () => {
    if (search) search.value = "";
    if (typeFilter) typeFilter.value = "";
    if (packageFilter) packageFilter.value = "";
    if (languageFilter) languageFilter.value = "";
    if (categoryFilter) categoryFilter.value = "";
    visibleChannels = 20;
    renderChannels();
  });
  showMore?.addEventListener("click", () => {
    visibleChannels += 20;
    renderChannels();
  });
  renderChannels();
})();
