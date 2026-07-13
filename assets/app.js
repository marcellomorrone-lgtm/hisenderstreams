(function(){
  const data = window.channelData || [];
  const cfg = window.pageConfig || {};
  const locale = cfg.locale || 'de';
  const byId = id => document.getElementById(id);

  // Verified channel-to-logo assignments. The repository revision is pinned so
  // a future upstream rename cannot silently attach a different logo.
  const verifiedLogoBase = 'https://raw.githubusercontent.com/tv-logo/tv-logos/d32e347bb7c4c640dceec23957802ad9182f58a6/countries/';
  const resolveVerifiedLogo = path => path?.startsWith('data:')
    ? path
    : path ? verifiedLogoBase + path : '';
  const verifiedLogoPaths = {
    'Das Erste / ARD': 'germany/das-erste-de.png',
    'ZDF': 'germany/zdf-de.png',
    'RTL': 'germany/rtl-de.png',
    'SAT.1': 'germany/sat-1-de.png',
    'ProSieben': 'germany/pro-sieben-de.png',
    'VOX': 'germany/vox-de.png',
    'kabel eins': 'germany/kabel-eins-de.png',
    'RTL Zwei': 'germany/rtl-zwei-de.png',
    '3sat': 'germany/3sat-de.png',
    'ARTE Deutsch': 'germany/arte-de.png',
    'WDR': 'germany/wdr-de.png',
    'NDR': 'germany/ndr-de.png',
    'BR Fernsehen': 'germany/br-fernsehen-de.png',
    'SWR Fernsehen': 'germany/swr-de.png',
    'MDR Fernsehen': 'germany/mdr-de.png',
    'Phoenix': 'germany/phoenix-de.png',
    'n-tv': 'germany/ntv-de.png',
    'Welt': 'germany/welt-de.png',
    'ORF 1': 'austria/orf1-at.png',
    'TF1': 'france/tf1-fr.png',
    'France 2': 'france/france-2-fr.png',
    'France 3': 'france/france-3-fr.png',
    'M6': 'france/m6-fr.png',
    'France 5': 'france/france-5-fr.png',
    'TMC': 'france/tmc-fr.png',
    'W9': 'france/w9-fr.png',
    'Arte France': 'france/arte-fr.png',
    'Canal+': 'france/canal-plus-fr.png',
    'TV5Monde': 'international/tv5-monde-int.png',
    'RTS 1': 'switzerland/rts-un-ch.png',
    'Rai 1': 'italy/rai-1-it.png',
    'Canale 5': 'italy/canale5-it.png',
    'Rai 2': 'italy/rai-2-it.png',
    'Italia 1': 'italy/italia1-it.png',
    'Rai 3': 'italy/rai-3-it.png',
    'Rete 4': 'italy/rete4-it.png',
    'La7': 'italy/la7-it.png',
    'TV8': 'italy/tv8-it.png',
    'Nove': 'italy/nove-it.png',
    'Rai News 24': 'italy/rai-news-24-it.png',
    'Rai Movie': 'italy/rai-movie-it.png',
    'Rai Premium': 'italy/rai-premium-it.png',
    'Iris': 'italy/iris-it.png',
    'RSI LA 1': 'switzerland/rsi-la1-ch.png',
    'BBC One': 'united-kingdom/bbc-one-uk.png',
    'ITV1': 'united-kingdom/itv-1-uk.png',
    'Channel 4': 'united-kingdom/channel-4-uk.png',
    'Channel 5': 'united-kingdom/channel-5-uk.png',
    'Sky News': 'united-kingdom/sky-news-uk.png',
    'BBC News': 'united-kingdom/bbc-news-uk.png',
    'CNN International': 'international/cnn-international-int.png',
    'CNBC': 'united-states/cnbc-us.png',
    'Bloomberg TV': 'united-states/bloomberg-television-us.png',
    'Al Jazeera': 'united-kingdom/aljazeera-uk.png',
    'Antena 3': 'spain/antena-3-es.png',
    'La 1 / TVE': 'spain/tve-1-es.png',
    'SIC': 'portugal/sic-pt.png',
    'RTP1': 'portugal/rtp-1-pt.png',
    'RTP2': 'portugal/rtp-2-pt.png',
    'CNN Portugal': 'portugal/cnn-portugal-pt.png',
    'SIC Notícias': 'portugal/sic-noticias-pt.png',
    'RTP Internacional': null,
    'SRF 1': 'switzerland/srf-1-ch.png',
    'SRF zwei': 'switzerland/srf-zwei-ch.png',
    'SRF info': 'switzerland/srf-info-ch.png',
    'RTS 2': 'switzerland/rts-deux-ch.png',
    'RSI LA 2': 'switzerland/rsi-la2-ch.png',
    'blue Zoom': 'data:image/png;base64,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'
  };

  data.forEach(item => {
    const path = Object.prototype.hasOwnProperty.call(verifiedLogoPaths, item.name)
      ? verifiedLogoPaths[item.name]
      : null;
    item.logo = resolveVerifiedLogo(path);
  });

  const progress = byId('progress');
  const updateProgress = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    if(progress) progress.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
  const updateParallax = () => {
    const vh = window.innerHeight || 1;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax || '0.04');
      const rect = el.getBoundingClientRect();
      const delta = (vh * 0.5 - (rect.top + rect.height * 0.5)) * speed;
      el.style.setProperty('--parallaxY', `${delta.toFixed(2)}px`);
    });
  };
  window.addEventListener('scroll', updateParallax, {passive:true});
  window.addEventListener('resize', updateParallax);
  updateParallax();

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal, .reveal-media').forEach(el => obs.observe(el));

  document.querySelectorAll('.cards3, .feature-grid, .support-grid, .trust-grid, .timeline, .casting-stack, .about-grid, .quick-stats').forEach(group => {
    [...group.children].forEach((child, index) => {
      child.style.transitionDelay = `${Math.min(index,8) * 65}ms`;
    });
  });

  const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count || '0', 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const start = performance.now();
      const duration = 900;
      const tick = now => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1-p, 3);
        el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
        if(p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, {threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

  const topbar = document.querySelector('.topbar');
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'back-to-top';
  back.setAttribute('aria-label','Back to top');
  back.innerHTML = '↑';
  document.body.appendChild(back);
  back.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  const navLinks = [...document.querySelectorAll('.navlinks a[href^="#"]')];
  const sectionMap = navLinks.map(link => {
    const target = document.querySelector(link.getAttribute('href'));
    return target ? {link, target} : null;
  }).filter(Boolean);

  const onScroll = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pct = Math.min(1, window.scrollY / max);
    scrollProgress.style.transform = `scaleX(${pct})`;
    if(topbar) topbar.classList.toggle('scrolled', window.scrollY > 20);
    back.classList.toggle('visible', window.scrollY > 560);

    const anchorLine = window.scrollY + 140;
    let current = null;
    sectionMap.forEach(item => {
      if(item.target.offsetTop <= anchorLine) current = item;
    });
    navLinks.forEach(link => link.classList.remove('current'));
    if(current) current.link.classList.add('current');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  const tiltTargets = document.querySelectorAll('.hero-panel, .package-card, .support-card, .feature, .trust-card');
  tiltTargets.forEach(card => {
    card.addEventListener('mousemove', e => {
      if(window.innerWidth < 992) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - .5;
      const py = (e.clientY - rect.top) / rect.height - .5;
      card.style.transform = `rotateX(${(-py * 3).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const langMap = cfg.langMap || {};
  const countryMap = cfg.countryMap || {};
  const categoryMap = cfg.categoryMap || {};
  const packageMap = cfg.packageMap || {};
  const qualityMap = cfg.qualityMap || {hd:'HD', sd:'SD'};

  const packageSel = byId('filter-package');
  const languageSel = byId('filter-language');
  const countrySel = byId('filter-country');
  const categorySel = byId('filter-category');
  const qualitySel = byId('filter-quality');
  const searchInput = byId('filter-search');
  const resetBtn = byId('reset-filters');
  const grid = byId('channel-grid');
  const summary = byId('result-summary');
  const pkgWrap = byId('active-packages');
  const quickLangWrap = byId('quick-language-bar');
  const totalPortfolio = cfg.totalPortfolio || '';
  const totalPortfolioLabel = cfg.totalPortfolioLabel || '';

  const metaDateEls = document.querySelectorAll('[data-meta-date]');
  const metaVersionEls = document.querySelectorAll('[data-meta-version]');
  metaDateEls.forEach(el => el.textContent = cfg.metaDate || '');
  metaVersionEls.forEach(el => el.textContent = cfg.metaVersion || '');

  const assetsScript = document.querySelector("script[src*='channels-data.js']");
  const assetBase = assetsScript ? assetsScript.getAttribute('src').replace(/channels-data\.js.*$/, '') : 'assets/';

  const flagAssetMap = {de:'de.svg', en:'en.svg', fr:'fr.svg', it:'it.svg', ar:'ar.svg', es:'es.svg', ru:'ru.svg', uk:'uk.svg', pt:'pt.svg', ch:'ch.svg'};
  const flagEmojiMap = {ch:'🇨🇭', de:'🇩🇪', fr:'🇫🇷', it:'🇮🇹', en:'🇬🇧', ar:'🇸🇦', es:'🇪🇸', ru:'🇷🇺', uk:'🇺🇦', pt:'🇵🇹'};
  const marqueeHosts = [...document.querySelectorAll('.js-logo-marquee')];
  function renderLogoMarquee(){
    if(!marqueeHosts.length) return;
    const cleanLogoSet = [
      'Das Erste / ARD', 'ZDF', 'RTL', 'SAT.1', 'ProSieben', 'VOX',
      'kabel eins', 'RTL Zwei', '3sat', 'ARTE Deutsch', 'WDR', 'NDR',
      'BR Fernsehen', 'SWR Fernsehen', 'MDR Fernsehen'
    ];
    const items = cleanLogoSet
      .map(name => ({name, logo: resolveVerifiedLogo(verifiedLogoPaths[name])}))
      .filter(item => item.logo);
    const markup = items.map(item => `
      <div class="logo-pill" aria-label="${item.name}" title="${item.name}">
        <span class="logo-crop"><img src="${item.logo}" alt="${item.name}" decoding="async"></span>
      </div>`).join('');
    marqueeHosts.forEach(host => {
      host.innerHTML = `<div class="logo-marquee-track">${markup}${markup}</div>`;
      host.querySelectorAll('img').forEach(image => image.addEventListener('error', () => image.closest('.logo-pill')?.remove(), {once:true}));
    });
  }
  renderLogoMarquee();
  function flagMarkup(code, fallback, label){
    const safe = (label || code || '').replace(/"/g,'&quot;');
    if(flagAssetMap[code]) return `<span class="flag-badge" title="${safe}"><img src="${assetBase}flags/${flagAssetMap[code]}" alt="" loading="lazy"></span>`;
    return `<span class="flag-badge emoji" title="${safe}">${fallback || flagEmojiMap[code] || '🌐'}</span>`;
  }

  const uniqueSorted = arr => [...new Set(arr)].sort((a,b) => String(a).localeCompare(String(b), locale));
  function addOptions(select, items, map, placeholder){
    if(!select) return;
    select.innerHTML = `<option value="">${placeholder}</option>`;
    items.forEach(value => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = map[value] || value;
      select.appendChild(opt);
    });
  }

  addOptions(languageSel, uniqueSorted(data.map(d => d.language)), langMap, cfg.selectAllLabel || 'Alle');
  addOptions(countrySel, uniqueSorted(data.map(d => d.country)), countryMap, cfg.selectAllLabel || 'Alle');
  addOptions(categorySel, uniqueSorted(data.map(d => d.category)), categoryMap, cfg.selectAllLabel || 'Alle');

  const quickLangs = cfg.quickLanguages || ['ch','de','fr','it','en','ar','es','ru','uk','pt'];
  let activeQuickLang = '';
  if(quickLangWrap){
    quickLangWrap.innerHTML = '';
    quickLangs.forEach(code => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quick-filter';
      btn.dataset.code = code;
      const cnt = data.filter(d => d.language === code).length;
      btn.innerHTML = `${flagMarkup(code, flagEmojiMap[code], langMap[code] || code)}<span class="quick-label">${langMap[code] || code}</span><span class="quick-count">${cnt}</span>`;
      btn.addEventListener('click', () => {
        if(activeQuickLang === code){
          activeQuickLang = '';
          btn.classList.remove('active');
          if(languageSel) languageSel.value = '';
        } else {
          activeQuickLang = code;
          quickLangWrap.querySelectorAll('.quick-filter').forEach(el => el.classList.remove('active'));
          btn.classList.add('active');
          if(languageSel) languageSel.value = code;
        }
        visibleLimit = INITIAL_LIMIT;
        render();
      });
      quickLangWrap.appendChild(btn);
    });
  }

  const staticChipMatchers = [
    {code:'ch', rx:/\b(Schweiz|Swiss|Suisse|Svizzera)\b/i},
    {code:'de', rx:/\b(Deutsch|German|Allemand|Tedesco)\b/i},
    {code:'fr', rx:/\b(Französisch|French|Français|Francese)\b/i},
    {code:'it', rx:/\b(Italienisch|Italian\b|Italiano)\b/i},
    {code:'en', rx:/\b(Englisch|English|Anglais|Inglese)\b/i},
    {code:'ar', rx:/\b(Arabisch|Arabic|Arabe|Arabo)\b/i},
    {code:'es', rx:/\b(Spanisch|Spanish|Espagnol|Spagnolo)\b/i},
    {code:'ru', rx:/\b(Russisch|Russian|Russe|Russo)\b/i},
    {code:'uk', rx:/\b(Ukrainisch|Ukrainian|Ukrainien|Ucraino)\b/i},
    {code:'pt', rx:/\b(Portugiesisch|Portuguese|Portugais|Portoghese)\b/i}
  ];
  function decorateStaticLangChips(){
    document.querySelectorAll('.lang-chip').forEach(chip => {
      if(chip.querySelector('.flag-badge')) return;
      const text = chip.textContent || '';
      const match = staticChipMatchers.find(entry => entry.rx.test(text));
      if(!match) return;
      chip.insertAdjacentHTML('afterbegin', flagMarkup(match.code, flagEmojiMap[match.code], langMap[match.code] || match.code));
    });
  }
  decorateStaticLangChips();

  function matches(item){
    const search = (searchInput && searchInput.value || '').trim().toLowerCase();
    const pkg = packageSel && packageSel.value;
    const lang = languageSel && languageSel.value;
    const country = countrySel && countrySel.value;
    const category = categorySel && categorySel.value;
    const quality = qualitySel && qualitySel.value;
    if(pkg && !item.packages.includes(pkg)) return false;
    if(lang && item.language !== lang) return false;
    if(country && item.country !== country) return false;
    if(category && item.category !== category) return false;
    if(quality && item.quality !== quality) return false;
    if(search){
      const hay = [item.name, langMap[item.language] || '', countryMap[item.country] || '', categoryMap[item.category] || '', item.description_de || ''].join(' ').toLowerCase();
      if(!hay.includes(search)) return false;
    }
    return true;
  }

  function sentenceForPackages(pkgs){
    if(!pkgs.length) return cfg.noPackageSentence || '';
    const list = pkgs.map(p => packageMap[p] || p);
    if(list.length === 1) return `${cfg.containedIn || 'enthalten in'} ${list[0]}.`;
    if(list.length === 2) return `${cfg.containedIn || 'enthalten in'} ${list[0]} ${cfg.andWord || 'und'} ${list[1]}.`;
    return `${cfg.containedIn || 'enthalten in'} ${list.slice(0,-1).join(', ')} ${cfg.andWord || 'und'} ${list[list.length - 1]}.`;
  }

  const INITIAL_LIMIT = 36;
  let visibleLimit = INITIAL_LIMIT;
  const languagePriority = {ch:0, de:1, en:2, fr:3, it:4, ar:5, es:6, ru:7, uk:8, pt:9};
  const sortedRows = rows => rows.slice().sort((a,b) => {
    const pa = languagePriority[a.language] ?? 99;
    const pb = languagePriority[b.language] ?? 99;
    if(pa !== pb) return pa - pb;
    const ca = String(countryMap[a.country] || a.country || '');
    const cb = String(countryMap[b.country] || b.country || '');
    const countryCmp = ca.localeCompare(cb, locale);
    if(countryCmp !== 0) return countryCmp;
    return String(a.name).localeCompare(String(b.name), locale);
  });

  function render(){
    if(!grid) return;
    const rows = sortedRows(data.filter(matches));
    const unionPkgs = ['basic','essential','max'].filter(pkg => rows.some(r => r.packages.includes(pkg)));
    if(summary){
      const pluralText = rows.length === 1 ? cfg.channelSingular : cfg.channelPlural;
      let text = `${rows.length} ${pluralText} – ${sentenceForPackages(unionPkgs)}`;
      if(totalPortfolio && totalPortfolioLabel) text += ` · ${totalPortfolioLabel} ${totalPortfolio}`;
      summary.textContent = text;
    }
    if(pkgWrap){
      pkgWrap.innerHTML = unionPkgs.map(pkg => `<span class="meta-pill pkg">${packageMap[pkg] || pkg}</span>`).join('');
    }

    grid.innerHTML = '';
    const oldFooter = document.querySelector('.results-footer');
    if(oldFooter) oldFooter.remove();

    if(!rows.length){
      grid.innerHTML = `<div class="finder-note">${cfg.noResults || 'Keine Sender gefunden. Bitte Filter anpassen oder Suche zurücksetzen.'}</div>`;
      return;
    }

    const visibleRows = rows.slice(0, visibleLimit);
    visibleRows.forEach(item => {
      const card = document.createElement('article');
      card.className = 'channel-card';
      card.title = `${item.name} · ${(langMap[item.language] || item.language)} · ${(packageMap[item.packages[0]] || item.packages[0] || '')}`;
      const logoSrc = item.logo ? (item.logo.startsWith('assets/') ? assetBase + item.logo.replace(/^assets\//,'') : item.logo) : '';
      const logoMarkup = logoSrc
        ? `<div class="channel-logo-wrap"><img class="channel-logo" src="${logoSrc}" alt="${item.name}" loading="lazy"></div>`
        : `<div class="channel-badge">${item.badge || item.name.slice(0,3).toUpperCase()}</div>`;
      const langLabel = langMap[item.language] || item.language;
      card.innerHTML = `
        <div class="channel-top">
          ${logoMarkup}
          <div class="channel-copy"><div class="channel-title">${item.name}</div></div>
        </div>
        <div class="channel-flag-wrap">${flagMarkup(item.language, item.flag, langLabel)}</div>
      `;
      const renderedLogo = card.querySelector('.channel-logo');
      if(renderedLogo){
        renderedLogo.addEventListener('error', () => {
          const fallback = document.createElement('div');
          fallback.className = 'channel-badge';
          fallback.textContent = item.badge || item.name.slice(0,3).toUpperCase();
          renderedLogo.closest('.channel-logo-wrap')?.replaceWith(fallback);
        }, {once:true});
      }
      grid.appendChild(card);
    });

    if(rows.length > visibleRows.length){
      const footer = document.createElement('div');
      footer.className = 'results-footer';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-secondary';
      btn.textContent = `Mehr Sender laden (${rows.length - visibleRows.length} weitere)`;
      btn.addEventListener('click', () => {
        visibleLimit += 24;
        render();
      });
      footer.appendChild(btn);
      grid.parentElement.appendChild(footer);
    }
  }

  [packageSel, languageSel, countrySel, categorySel, qualitySel, searchInput].forEach(el => {
    if(!el) return;
    const handler = () => {
      visibleLimit = INITIAL_LIMIT;
      if(el === languageSel){
        activeQuickLang = languageSel.value || '';
        if(quickLangWrap){
          quickLangWrap.querySelectorAll('.quick-filter').forEach(btn => btn.classList.toggle('active', btn.dataset.code === activeQuickLang));
        }
      }
      render();
    };
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
  });
  if(resetBtn) resetBtn.addEventListener('click', () => {
    [packageSel, languageSel, countrySel, categorySel, qualitySel].forEach(el => { if(el) el.value = ''; });
    if(searchInput) searchInput.value = '';
    activeQuickLang = '';
    visibleLimit = INITIAL_LIMIT;
    if(quickLangWrap) quickLangWrap.querySelectorAll('.quick-filter').forEach(btn => btn.classList.remove('active'));
    render();
  });
  render();

  const roomRange = byId('roomRange');
  const roomValue = byId('calcRooms');
  const calcMonthly = byId('calcMonthly');
  const calcAnnual = byId('calcAnnual');
  const calcPrice = byId('calcPrice');
  const calcChannels = byId('calcChannels');
  const calcPackage = byId('calcPackage');
  let activeCalc = document.querySelector('.calc-package.active');
  const formatCHF = value => 'CHF ' + value.toLocaleString('de-CH', {minimumFractionDigits:2, maximumFractionDigits:2}).replace(/,/g, "'");
  function updateCalculator(){
    if(!roomRange || !activeCalc) return;
    const rooms = Number(roomRange.value);
    const price = Number(activeCalc.dataset.price);
    const monthly = rooms * price;
    if(roomValue) roomValue.textContent = rooms;
    if(calcMonthly) calcMonthly.textContent = formatCHF(monthly);
    if(calcAnnual) calcAnnual.textContent = formatCHF(monthly * 12);
    if(calcPrice) calcPrice.textContent = formatCHF(price);
    if(calcChannels) calcChannels.textContent = activeCalc.dataset.channels;
    if(calcPackage) calcPackage.textContent = activeCalc.dataset.package;
  }
  document.querySelectorAll('.calc-package').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.calc-package').forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    activeCalc = btn;
    updateCalculator();
  }));
  if(roomRange){
    roomRange.addEventListener('input', updateCalculator);
    updateCalculator();
  }
})();
