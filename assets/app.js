(function(){
  const data = window.channelData || [];
  const cfg = window.pageConfig || {};
  const locale = cfg.locale || 'de';
  const byId = id => document.getElementById(id);

  // Verified channel-to-logo assignments. The repository revision is pinned so
  // a future upstream rename cannot silently attach a different logo.
  const verifiedLogoBase = 'https://raw.githubusercontent.com/tv-logo/tv-logos/d32e347bb7c4c640dceec23957802ad9182f58a6/countries/';
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
    'blue Zoom': null
  };

  data.forEach(item => {
    const path = Object.prototype.hasOwnProperty.call(verifiedLogoPaths, item.name)
      ? verifiedLogoPaths[item.name]
      : null;
    item.logo = path ? verifiedLogoBase + path : '';
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
      .map(name => ({name, logo: verifiedLogoPaths[name] ? verifiedLogoBase + verifiedLogoPaths[name] : ''}))
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
