(() => {
  'use strict';

  const scriptUrl = new URL(document.currentScript.src);
  const assetUrl = (path) => new URL(path.replace(/^assets\//, ''), scriptUrl).href;
  const cfg = window.pageConfig || {};
  const locale = cfg.locale || 'de';
  const byId = (id) => document.getElementById(id);

  /* Old TV and casting overlays are removed from the DOM. The rebuild uses
     one finished image per scene, so no layer can slip outside a TV frame. */
  document.querySelectorAll('.hero-panel, .casting-demo').forEach((scene) => scene.replaceChildren());
  document.querySelector('#contact .contact-side')?.remove();

  const progress = byId('progress');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  document.querySelectorAll('details[open]').forEach((item) => item.removeAttribute('open'));

  const revealItems = document.querySelectorAll('.reveal, .reveal-media');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const logoNames = [
    ['srf-1.png', 'SRF 1'], ['srf-zwei.png', 'SRF zwei'],
    ['tele-zueri.png', 'TeleZüri'], ['tele-baern.png', 'TeleBärn'],
    ['rts-1.png', 'RTS 1'], ['rsi-la-2.png', 'RSI LA 2'],
    ['das-erste-ard.png', 'ARD'], ['zdf.png', 'ZDF'], ['3sat.png', '3sat'],
    ['arte-deutsch.png', 'arte'], ['france-2.png', 'France 2'], ['tf1.png', 'TF1'],
    ['rai-1.png', 'Rai 1'], ['bbc-one.png', 'BBC One'],
    ['cnn-international.png', 'CNN'], ['orf-1.png', 'ORF 1'],
    ['blue-zoom.png', 'blue Zoom']
  ];
  document.querySelectorAll('.js-logo-marquee').forEach((track) => {
    const set = logoNames.map(([file, label]) =>
      `<span class="logo-marquee-card"><img src="${assetUrl(`channel-logos/${file}`)}" alt="${label}" loading="lazy"></span>`
    ).join('');
    track.innerHTML = `<div class="logo-marquee-track">${set}${set}</div>`;
  });

  const roomRange = byId('roomRange');
  let activePackage = document.querySelector('.calc-package.active') || document.querySelector('.calc-package');
  const money = (value) => `CHF ${Number(value).toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const updateCalculator = () => {
    if (!roomRange || !activePackage) return;
    const rooms = Number(roomRange.value);
    const price = Number(activePackage.dataset.price);
    const monthly = rooms * price;
    const packageName = activePackage.querySelector('strong')?.textContent || activePackage.dataset.package;
    if (byId('calcRooms')) byId('calcRooms').textContent = rooms;
    if (byId('calcMonthly')) byId('calcMonthly').textContent = money(monthly);
    if (byId('calcAnnual')) byId('calcAnnual').textContent = money(monthly * 12);
    if (byId('calcPrice')) byId('calcPrice').textContent = money(price);
    if (byId('calcChannels')) byId('calcChannels').textContent = activePackage.dataset.channels;
    if (byId('calcPackage')) byId('calcPackage').textContent = packageName;
  };
  document.querySelectorAll('.calc-package').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.calc-package').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      activePackage = button;
      updateCalculator();
    });
  });
  roomRange?.addEventListener('input', updateCalculator);
  updateCalculator();

  const data = Array.isArray(window.channelData) ? window.channelData : [];
  const selects = {
    package: byId('filter-package'), language: byId('filter-language'),
    country: byId('filter-country'), category: byId('filter-category'),
    quality: byId('filter-quality'), search: byId('filter-search')
  };
  const fillSelect = (select, values, labels) => {
    if (!select) return;
    const current = select.value;
    select.replaceChildren(new Option(cfg.selectAllLabel || 'Alle', ''));
    values.forEach((value) => select.add(new Option(labels?.[value] || value, value)));
    select.value = current;
  };
  fillSelect(selects.language, [...new Set(data.map((x) => x.language))].sort(), cfg.langMap);
  fillSelect(selects.country, [...new Set(data.map((x) => x.country))].sort(), cfg.countryMap);
  fillSelect(selects.category, [...new Set(data.map((x) => x.category))].sort(), cfg.categoryMap);

  const quickBar = byId('quick-language-bar');
  if (quickBar) {
    const languages = cfg.quickLanguages || [];
    quickBar.innerHTML = `<button class="quick-language active" data-language="">${cfg.selectAllLabel || 'Alle'}</button>` +
      languages.map((lang) => `<button class="quick-language" data-language="${lang}">${cfg.langMap?.[lang] || lang}</button>`).join('');
    quickBar.addEventListener('click', (event) => {
      const button = event.target.closest('.quick-language');
      if (!button) return;
      if (selects.language) selects.language.value = button.dataset.language;
      quickBar.querySelectorAll('.quick-language').forEach((item) => item.classList.toggle('active', item === button));
      renderChannels();
    });
  }

  const packageMatches = (channel, selected) => !selected || (channel.packages || []).includes(selected);
  const renderChannels = () => {
    const query = (selects.search?.value || '').trim().toLocaleLowerCase(locale);
    const filtered = data.filter((channel) =>
      packageMatches(channel, selects.package?.value) &&
      (!selects.language?.value || channel.language === selects.language.value) &&
      (!selects.country?.value || channel.country === selects.country.value) &&
      (!selects.category?.value || channel.category === selects.category.value) &&
      (!selects.quality?.value || channel.quality === selects.quality.value) &&
      (!query || channel.name.toLocaleLowerCase(locale).includes(query))
    );
    const grid = byId('channel-grid');
    const summary = byId('result-summary');
    if (summary) summary.textContent = `${filtered.length} ${filtered.length === 1 ? (cfg.channelSingular || 'Sender') : (cfg.channelPlural || 'Sender')}`;
    if (!grid) return;
    if (!filtered.length) {
      grid.innerHTML = `<p class="no-results">${cfg.noResults || 'Keine Sender gefunden.'}</p>`;
      return;
    }
    grid.innerHTML = filtered.slice(0, 40).map((channel) => {
      const logo = channel.logo ? assetUrl(channel.logo) : '';
      const label = cfg.langMap?.[channel.language] || channel.language;
      return `<article class="channel-card">
        <div class="channel-logo">${logo ? `<img src="${logo}" alt="${channel.name}" loading="lazy">` : `<span>${channel.badge || channel.name.slice(0, 2)}</span>`}</div>
        <div class="channel-info"><strong>${channel.name}</strong><span>${label} · ${(channel.quality || '').toUpperCase()}</span></div>
      </article>`;
    }).join('');
  };
  Object.values(selects).forEach((control) => control?.addEventListener(control?.tagName === 'INPUT' ? 'input' : 'change', () => {
    if (control === selects.language && quickBar) {
      quickBar.querySelectorAll('.quick-language').forEach((item) => item.classList.toggle('active', item.dataset.language === control.value));
    }
    renderChannels();
  }));
  byId('reset-filters')?.addEventListener('click', () => {
    Object.values(selects).forEach((control) => { if (control) control.value = ''; });
    quickBar?.querySelectorAll('.quick-language').forEach((item) => item.classList.toggle('active', item.dataset.language === ''));
    renderChannels();
  });
  renderChannels();
})();
