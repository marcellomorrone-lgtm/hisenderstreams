(() => {
  const script = document.currentScript;
  const assetBase = new URL('.', script.src).href;
  const asset = (name) => `${assetBase}${name}`;
  const language = (document.documentElement.lang || 'de').slice(0, 2).toLowerCase();

  const copy = {
    de: {
      live: 'LIVE · INTERNATIONAL',
      languages: '8+ Sprachwelten auf einem Bildschirm',
      heroAlt: 'Premium-Hotelzimmer mit internationalen Live-Sendern auf dem Hotel-TV',
      storyEyebrow: 'TV-STREAMING, NEU ERZÄHLT',
      storyTitle: 'Vom Herkunftsmarkt bis zum Hotelzimmer.',
      storyIntro: 'Eine Senderwelt, die mit Ihren Gästen denkt – zentral geliefert, lokal betreut und im Zimmer sofort vertraut.',
      steps: [
        ['01', 'Internationale Vielfalt', 'Sender, die sich wie Zuhause anfühlen.', 'Aus acht und mehr Sprachwelten entsteht ein Portfolio, das zur tatsächlichen Gästestruktur Ihres Hotels passt.'],
        ['02', 'Managed IP Delivery', 'Zentral verteilt. Im Zimmer sofort verfügbar.', 'Unsere Schweizer Techniker prüfen, integrieren und überwachen die Signalwege – vom Headend bis zum Hotel-TV.'],
        ['03', 'Persönliches Erlebnis', 'Live-TV und Casting auf einem Bildschirm.', 'Gäste wechseln nahtlos zwischen vertrauten Sendern und persönlichen Streaming-Inhalten.']
      ],
      finderEyebrow: 'KOMPAKTER SENDERFINDER',
      finderTitle: 'In Sekunden zum passenden Sender.'
    },
    en: {
      live: 'LIVE · INTERNATIONAL',
      languages: '8+ language worlds on one screen',
      heroAlt: 'Premium hotel room with international live channels on the hotel TV',
      storyEyebrow: 'HOTEL TV, REIMAGINED',
      storyTitle: 'From guest market to hotel room.',
      storyIntro: 'A channel portfolio shaped around your guests – delivered centrally, supported locally and instantly familiar in every room.',
      steps: [
        ['01', 'International choice', 'Channels that feel like home.', 'Eight or more language worlds create a portfolio matched to the real guest mix of your hotel.'],
        ['02', 'Managed IP delivery', 'Distributed centrally. Ready in every room.', 'Our Swiss technicians verify, integrate and monitor the complete signal path from headend to hotel TV.'],
        ['03', 'Personal experience', 'Live TV and casting on one screen.', 'Guests move seamlessly between familiar live channels and their personal streaming content.']
      ],
      finderEyebrow: 'COMPACT CHANNEL FINDER',
      finderTitle: 'Find the right channel in seconds.'
    },
    fr: {
      live: 'LIVE · INTERNATIONAL',
      languages: '8+ univers linguistiques sur un écran',
      heroAlt: 'Chambre d’hôtel premium avec chaînes internationales en direct sur le téléviseur',
      storyEyebrow: 'LA TV HÔTEL, REPENSÉE',
      storyTitle: 'Du marché d’origine à la chambre.',
      storyIntro: 'Un univers de chaînes pensé pour vos clients – livré de manière centralisée, suivi localement et immédiatement familier en chambre.',
      steps: [
        ['01', 'Diversité internationale', 'Des chaînes qui rappellent la maison.', 'Huit univers linguistiques ou plus composent une offre adaptée à la clientèle réelle de votre hôtel.'],
        ['02', 'Diffusion IP gérée', 'Centralisée. Disponible dans chaque chambre.', 'Nos techniciens suisses vérifient, intègrent et surveillent toute la chaîne du headend au téléviseur.'],
        ['03', 'Expérience personnelle', 'TV en direct et casting sur un écran.', 'Les clients passent naturellement de leurs chaînes habituelles à leurs contenus personnels.']
      ],
      finderEyebrow: 'RECHERCHE COMPACTE',
      finderTitle: 'La bonne chaîne en quelques secondes.'
    },
    it: {
      live: 'LIVE · INTERNAZIONALE',
      languages: '8+ mondi linguistici su uno schermo',
      heroAlt: 'Camera d’hotel premium con canali internazionali live sul televisore',
      storyEyebrow: 'LA TV HOTEL, RIPENSATA',
      storyTitle: 'Dal mercato d’origine alla camera.',
      storyIntro: 'Un mondo di canali che segue i vostri ospiti – distribuito centralmente, assistito localmente e subito familiare in camera.',
      steps: [
        ['01', 'Scelta internazionale', 'Canali che fanno sentire a casa.', 'Otto o più mondi linguistici formano un portfolio adatto alla reale composizione degli ospiti.'],
        ['02', 'Distribuzione IP gestita', 'Centrale. Subito disponibile in camera.', 'I nostri tecnici svizzeri verificano, integrano e monitorano il percorso completo fino alla TV.'],
        ['03', 'Esperienza personale', 'TV live e casting su uno schermo.', 'Gli ospiti passano senza interruzioni dai canali familiari ai propri contenuti streaming.']
      ],
      finderEyebrow: 'RICERCA CANALI COMPATTA',
      finderTitle: 'Il canale giusto in pochi secondi.'
    }
  };
  const labels = copy[language] || copy.de;
  document.body.classList.add('hi-premium-streams-v3');

  const heroPanel = document.querySelector('.hero-panel');
  if (heroPanel) {
    heroPanel.removeAttribute('data-parallax');
    const logos = [
      ['srf-1', 'SRF 1'], ['rts-1', 'RTS 1'], ['rsi-la-2', 'RSI LA 2'],
      ['das-erste-ard', 'Das Erste'], ['france-2', 'France 2'], ['rai-1', 'Rai 1'],
      ['bbc-one', 'BBC One'], ['la-1-tve', 'La 1'], ['rtp1', 'RTP 1'],
      ['al-jazeera', 'Al Jazeera'], ['cnn-international', 'CNN'], ['tele-zueri', 'TeleZüri']
    ];
    const flags = ['ch', 'de', 'fr', 'it', 'en', 'es', 'pt', 'ar'];
    heroPanel.innerHTML = `
      <div class="ps-hero-image">
        <img src="${asset('premium-hero-channel-room-v1-web.webp')}" alt="${labels.heroAlt}">
        <div class="ps-hero-tv" aria-label="${labels.languages}">
          <div class="ps-tv-meta"><span><i></i>${labels.live}</span></div>
          <div class="ps-tv-logos">
            ${logos.map(([file, name]) => `<span class="ps-tv-logo"><img src="${asset(`channel-logos/${file}.png`)}" alt="${name}"></span>`).join('')}
          </div>
          <div class="ps-tv-flags" aria-label="${labels.languages}">
            ${flags.map((flag) => `<span><img src="${asset(`flags/${flag}.svg`)}" alt=""></span>`).join('')}
          </div>
        </div>
        <span class="ps-hero-glow" aria-hidden="true"></span>
      </div>`;
  }

  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle && heroTitle.textContent.includes('250+')) {
    heroTitle.innerHTML = heroTitle.textContent.replace('250+', '<span class="ps-green">250+</span>');
  }

  const showcase = document.querySelector('#logo-showcase');
  if (showcase && !document.querySelector('.premium-story')) {
    const story = document.createElement('section');
    story.className = 'premium-story';
    story.setAttribute('aria-labelledby', 'premium-story-title');
    const media = [
      ['premium-international-lounge-v1-web.webp', labels.steps[0][2]],
      ['award-infrastructure-web.jpg', labels.steps[1][2]],
      ['premium-casting-guest-v2-web.webp', labels.steps[2][2]]
    ];
    story.innerHTML = `
      <div class="ps-story-intro wrap">
        <span class="eyebrow">${labels.storyEyebrow}</span>
        <h2 id="premium-story-title">${labels.storyTitle}</h2>
        <p>${labels.storyIntro}</p>
      </div>
      <div class="ps-story-grid wrap">
        <div class="ps-story-media" aria-hidden="true">
          ${media.map(([src, alt], index) => `<figure class="ps-story-layer${index === 0 ? ' is-active' : ''}" data-story-layer="${index}"><img src="${asset(src)}" alt="${alt}"><span></span></figure>`).join('')}
          <div class="ps-story-caption"><span>01</span><strong>${labels.steps[0][1]}</strong></div>
        </div>
        <div class="ps-story-steps">
          ${labels.steps.map((step, index) => `
            <article class="ps-story-step${index === 0 ? ' is-active' : ''}" data-story-step="${index}">
              <span>${step[0]}</span><small>${step[1]}</small><h3>${step[2]}</h3><p>${step[3]}</p>
            </article>`).join('')}
        </div>
      </div>`;
    showcase.insertAdjacentElement('afterend', story);

    const steps = [...story.querySelectorAll('[data-story-step]')];
    const layers = [...story.querySelectorAll('[data-story-layer]')];
    const captionNumber = story.querySelector('.ps-story-caption span');
    const captionText = story.querySelector('.ps-story-caption strong');
    const activate = (index) => {
      steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
      layers.forEach((layer, i) => layer.classList.toggle('is-active', i === index));
      captionNumber.textContent = labels.steps[index][0];
      captionText.textContent = labels.steps[index][1];
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (active) activate(Number(active.target.dataset.storyStep));
      }, { rootMargin: '-28% 0px -42% 0px', threshold: [0, .18, .5, .75] });
      steps.forEach((step) => observer.observe(step));
    }
  }

  const finder = document.querySelector('#finder');
  if (finder) {
    finder.classList.add('premium-compact-finder');
    const eyebrow = finder.querySelector('.section-head .eyebrow');
    const title = finder.querySelector('.section-head h2');
    if (eyebrow) eyebrow.textContent = labels.finderEyebrow;
    if (title) title.textContent = labels.finderTitle;
  }

  document.querySelectorAll('.ps-story-step, .package-card, #finder .finder-shell').forEach((element) => element.classList.add('ps-reveal'));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    document.querySelectorAll('.ps-reveal').forEach((element) => reveal.observe(element));
  } else {
    document.querySelectorAll('.ps-reveal').forEach((element) => element.classList.add('is-visible'));
  }
})();
