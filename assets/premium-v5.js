(() => {
  'use strict';

  const script = document.currentScript;
  const assetBase = new URL('.', script.src).href;
  const asset = (name) => `${assetBase}${name}`;
  const language = (document.documentElement.lang || 'de').slice(0, 2).toLowerCase();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const translations = {
    de: {
      heroAlt: 'Premium-Hotelzimmer mit internationalen Live-Sendern auf dem Hotel-TV',
      live: 'LIVE · INTERNATIONAL',
      languages: '8+ SPRACHWELTEN',
      castingAlt: 'Hotelgast verbindet das Smartphone sicher mit dem Zimmer-TV',
      pairKicker: 'ROOM CAST',
      pairTitle: 'Mit Zimmer-TV verbinden',
      pairHint: 'QR-Code mit dem Smartphone scannen',
      movieKicker: 'HOTEL CINEMA',
      movieTitle: 'BEYOND THE SUMMIT',
      connected: 'Sicher verbunden'
    },
    en: {
      heroAlt: 'Premium hotel room with international live channels on the hotel TV',
      live: 'LIVE · INTERNATIONAL',
      languages: '8+ LANGUAGE WORLDS',
      castingAlt: 'Hotel guest securely connects a smartphone to the room TV',
      pairKicker: 'ROOM CAST',
      pairTitle: 'Connect to room TV',
      pairHint: 'Scan the QR code with your smartphone',
      movieKicker: 'HOTEL CINEMA',
      movieTitle: 'BEYOND THE SUMMIT',
      connected: 'Securely connected'
    },
    fr: {
      heroAlt: 'Chambre premium avec chaînes internationales en direct sur le téléviseur',
      live: 'LIVE · INTERNATIONAL',
      languages: '8+ UNIVERS LINGUISTIQUES',
      castingAlt: 'Une cliente connecte son smartphone au téléviseur de la chambre',
      pairKicker: 'ROOM CAST',
      pairTitle: 'Connexion au téléviseur',
      pairHint: 'Scanner le code QR avec le smartphone',
      movieKicker: 'HOTEL CINEMA',
      movieTitle: 'BEYOND THE SUMMIT',
      connected: 'Connexion sécurisée'
    },
    it: {
      heroAlt: 'Camera premium con canali internazionali live sul televisore',
      live: 'LIVE · INTERNAZIONALE',
      languages: '8+ MONDI LINGUISTICI',
      castingAlt: 'Un’ospite collega in modo sicuro lo smartphone alla TV in camera',
      pairKicker: 'ROOM CAST',
      pairTitle: 'Collega la TV in camera',
      pairHint: 'Scansiona il codice QR con lo smartphone',
      movieKicker: 'HOTEL CINEMA',
      movieTitle: 'BEYOND THE SUMMIT',
      connected: 'Connessione sicura'
    }
  };
  const copy = translations[language] || translations.de;

  document.body.classList.add('hi-premium-v5');

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = 'async';
      image.addEventListener('load', () => resolve(image), { once: true });
      image.addEventListener('error', reject, { once: true });
      image.src = src;
    });
  }

  function roundedRect(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
  }

  function drawCover(context, image, x, y, width, height) {
    const sourceRatio = image.naturalWidth / image.naturalHeight;
    const targetRatio = width / height;
    let sx = 0;
    let sy = 0;
    let sw = image.naturalWidth;
    let sh = image.naturalHeight;
    if (sourceRatio > targetRatio) {
      sw = sh * targetRatio;
      sx = (image.naturalWidth - sw) / 2;
    } else {
      sh = sw / targetRatio;
      sy = (image.naturalHeight - sh) / 2;
    }
    context.drawImage(image, sx, sy, sw, sh, x, y, width, height);
  }

  function drawContained(context, image, x, y, width, height) {
    const ratio = Math.min(width / image.naturalWidth, height / image.naturalHeight);
    const targetWidth = image.naturalWidth * ratio;
    const targetHeight = image.naturalHeight * ratio;
    context.drawImage(image, x + (width - targetWidth) / 2, y + (height - targetHeight) / 2, targetWidth, targetHeight);
  }

  function projectArtwork(context, artwork, quad, canvasWidth, canvasHeight) {
    const point = (value) => ({ x: value.x * canvasWidth, y: value.y * canvasHeight });
    const topLeft = point(quad.topLeft);
    const topRight = point(quad.topRight);
    const bottomRight = point(quad.bottomRight);
    const bottomLeft = point(quad.bottomLeft);

    context.save();
    context.beginPath();
    context.moveTo(topLeft.x, topLeft.y);
    context.lineTo(topRight.x, topRight.y);
    context.lineTo(bottomRight.x, bottomRight.y);
    context.lineTo(bottomLeft.x, bottomLeft.y);
    context.closePath();
    context.clip();

    const slices = 320;
    for (let index = 0; index < slices; index += 1) {
      const start = index / slices;
      const end = (index + 1) / slices;
      const sourceX = Math.floor(start * artwork.width);
      const sourceWidth = Math.max(1, Math.ceil(end * artwork.width) - sourceX);
      const topStartX = topLeft.x + (topRight.x - topLeft.x) * start;
      const topEndX = topLeft.x + (topRight.x - topLeft.x) * end;
      const bottomStartX = bottomLeft.x + (bottomRight.x - bottomLeft.x) * start;
      const bottomEndX = bottomLeft.x + (bottomRight.x - bottomLeft.x) * end;
      const destinationX = (topStartX + bottomStartX) / 2;
      const destinationEndX = (topEndX + bottomEndX) / 2;
      const topY = (
        topLeft.y + (topRight.y - topLeft.y) * start +
        topLeft.y + (topRight.y - topLeft.y) * end
      ) / 2;
      const bottomY = (
        bottomLeft.y + (bottomRight.y - bottomLeft.y) * start +
        bottomLeft.y + (bottomRight.y - bottomLeft.y) * end
      ) / 2;
      context.drawImage(
        artwork,
        sourceX,
        0,
        sourceWidth,
        artwork.height,
        destinationX - 1,
        topY,
        Math.max(1, destinationEndX - destinationX + 2),
        bottomY - topY
      );
    }
    context.restore();
  }

  function createCanvas(width, height, className, label) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.className = className;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', label);
    return canvas;
  }

  function keepOnly(container, selector) {
    const clean = () => {
      Array.from(container.children).forEach((child) => {
        if (!child.matches(selector)) child.remove();
      });
    };
    clean();
    const observer = new MutationObserver(clean);
    observer.observe(container, { childList: true });
    return observer;
  }

  async function buildHero() {
    const panel = document.querySelector('.hero-panel');
    if (!panel) return;
    panel.classList.add('hi-v5-hero-panel');
    panel.removeAttribute('data-parallax');
    panel.innerHTML = '<div class="hi-v5-hero-scene"><span class="hi-v5-media-loader" aria-hidden="true"></span></div>';
    const scene = panel.querySelector('.hi-v5-hero-scene');
    keepOnly(panel, '.hi-v5-hero-scene');

    const logoFiles = [
      ['srf-1', 'SRF 1'], ['tele-zueri', 'TeleZüri'], ['tele-baern', 'TeleBärn'],
      ['rts-1', 'RTS 1'], ['rsi-la-2', 'RSI LA 2'], ['das-erste-ard', 'Das Erste'],
      ['zdf', 'ZDF'], ['3sat', '3sat'], ['france-2', 'France 2'], ['tf1', 'TF1'],
      ['rai-1', 'Rai 1'], ['bbc-one', 'BBC One'], ['la-1-tve', 'La 1'],
      ['rtp1', 'RTP 1'], ['cnn-international', 'CNN'], ['al-jazeera', 'Al Jazeera']
    ];
    const [room, ...logos] = await Promise.all([
      loadImage(asset('premium-hero-channel-room-v1-web.webp')),
      ...logoFiles.map(([file]) => loadImage(asset(`channel-logos/${file}.png`)))
    ]);

    const width = 1600;
    const height = 900;
    const canvas = createCanvas(width, height, 'hi-v5-hero-canvas', copy.heroAlt);
    scene.replaceChildren(canvas);
    const context = canvas.getContext('2d', { alpha: false });
    const artwork = document.createElement('canvas');
    artwork.width = 960;
    artwork.height = 540;
    const art = artwork.getContext('2d', { alpha: false });
    const quad = {
      topLeft: { x: .589, y: .333 },
      topRight: { x: .906, y: .280 },
      bottomRight: { x: .906, y: .660 },
      bottomLeft: { x: .589, y: .660 }
    };

    let visible = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: '160px' }).observe(canvas);
    }

    function drawScreen(time) {
      const gradient = art.createRadialGradient(760, 80, 20, 760, 80, 740);
      gradient.addColorStop(0, '#1f4a2c');
      gradient.addColorStop(.42, '#0a271a');
      gradient.addColorStop(1, '#04110c');
      art.fillStyle = gradient;
      art.fillRect(0, 0, artwork.width, artwork.height);

      art.strokeStyle = 'rgba(185, 226, 65, .09)';
      art.lineWidth = 1;
      for (let x = 0; x < artwork.width; x += 80) {
        art.beginPath(); art.moveTo(x, 0); art.lineTo(x, artwork.height); art.stroke();
      }
      for (let y = 0; y < artwork.height; y += 72) {
        art.beginPath(); art.moveTo(0, y); art.lineTo(artwork.width, y); art.stroke();
      }

      art.fillStyle = '#b9e43f';
      art.beginPath(); art.arc(60, 58, 8, 0, Math.PI * 2); art.fill();
      art.fillStyle = '#ffffff';
      art.font = '700 23px "Open Sans", Arial, sans-serif';
      art.letterSpacing = '4px';
      art.fillText(copy.live, 82, 66);
      art.fillStyle = 'rgba(255,255,255,.5)';
      art.font = '600 15px "Open Sans", Arial, sans-serif';
      art.fillText('HOTELINNOVATIV · MANAGED TV', 626, 64);

      const cardWidth = 154;
      const cardHeight = 72;
      const gap = 22;
      const step = cardWidth + gap;
      const speed = reducedMotion ? 0 : 22;
      const rows = [logos.slice(0, 8), logos.slice(8, 16)];
      const rowY = [142, 270];

      rows.forEach((row, rowIndex) => {
        const direction = rowIndex ? -1 : 1;
        const rawOffset = ((time / 1000) * speed) % step;
        const offset = direction > 0 ? rawOffset : step - rawOffset;
        for (let repeat = -2; repeat < 9; repeat += 1) {
          const logoIndex = ((repeat % row.length) + row.length) % row.length;
          const x = repeat * step + offset - 24;
          art.fillStyle = 'rgba(255,255,255,.97)';
          art.shadowColor = 'rgba(0,0,0,.24)';
          art.shadowBlur = 16;
          roundedRect(art, x, rowY[rowIndex], cardWidth, cardHeight, 18);
          art.fill();
          art.shadowBlur = 0;
          drawContained(art, row[logoIndex], x + 22, rowY[rowIndex] + 14, cardWidth - 44, cardHeight - 28);
        }
      });

      art.fillStyle = 'rgba(255,255,255,.16)';
      art.fillRect(44, 408, 872, 1);
      art.fillStyle = '#ffffff';
      art.font = '600 19px "Open Sans", Arial, sans-serif';
      art.letterSpacing = '2px';
      art.fillText(copy.languages, 52, 466);
      const colors = ['#e31d2b', '#f4c741', '#2d80c9', '#f5f5f5', '#2b9a58', '#e56d35', '#843cae', '#cf3434'];
      colors.forEach((color, index) => {
        art.fillStyle = color;
        art.beginPath(); art.arc(704 + index * 29, 459, 8, 0, Math.PI * 2); art.fill();
      });
    }

    let lastFrame = 0;
    function frame(time) {
      if (visible && (time - lastFrame > 42 || !lastFrame)) {
        lastFrame = time;
        drawCover(context, room, 0, 0, width, height);
        drawScreen(time);
        projectArtwork(context, artwork, quad, width, height);
      }
      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  function drawFinder(context, x, y, moduleSize) {
    context.fillStyle = '#06120d';
    context.fillRect(x, y, moduleSize * 7, moduleSize * 7);
    context.fillStyle = '#ffffff';
    context.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5);
    context.fillStyle = '#06120d';
    context.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
  }

  function createQrArtwork() {
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    const context = canvas.getContext('2d', { alpha: false });
    const gradient = context.createRadialGradient(720, 100, 20, 720, 100, 760);
    gradient.addColorStop(0, '#214d2d');
    gradient.addColorStop(.46, '#0a281b');
    gradient.addColorStop(1, '#04110c');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'rgba(188,228,65,.08)';
    for (let x = 0; x < canvas.width; x += 72) context.fillRect(x, 0, 1, canvas.height);
    for (let y = 0; y < canvas.height; y += 72) context.fillRect(0, y, canvas.width, 1);

    context.fillStyle = '#b9e43f';
    context.font = '700 18px "Open Sans", Arial, sans-serif';
    context.letterSpacing = '5px';
    context.fillText(copy.pairKicker, 70, 70);
    context.fillStyle = '#ffffff';
    context.font = '600 43px "Open Sans", Arial, sans-serif';
    const titleWords = copy.pairTitle.split(' ');
    const midpoint = Math.ceil(titleWords.length / 2);
    context.fillText(titleWords.slice(0, midpoint).join(' '), 70, 146);
    context.fillText(titleWords.slice(midpoint).join(' '), 70, 198);

    const qrModules = 29;
    const qrSize = 230;
    const moduleSize = qrSize / qrModules;
    const qrX = 650;
    const qrY = 150;
    context.fillStyle = '#ffffff';
    roundedRect(context, qrX - 24, qrY - 24, qrSize + 48, qrSize + 48, 26);
    context.fill();
    context.fillStyle = '#06120d';
    drawFinder(context, qrX, qrY, moduleSize);
    drawFinder(context, qrX + moduleSize * 22, qrY, moduleSize);
    drawFinder(context, qrX, qrY + moduleSize * 22, moduleSize);
    for (let row = 0; row < qrModules; row += 1) {
      for (let column = 0; column < qrModules; column += 1) {
        const inFinder = (row < 7 && column < 7) || (row < 7 && column > 21) || (row > 21 && column < 7);
        if (!inFinder && ((row * 13 + column * 7 + row * column) % 9 < 4)) {
          context.fillRect(qrX + column * moduleSize, qrY + row * moduleSize, moduleSize + .35, moduleSize + .35);
        }
      }
    }

    context.fillStyle = 'rgba(255,255,255,.72)';
    context.font = '500 20px "Open Sans", Arial, sans-serif';
    context.fillText(copy.pairHint, 70, 448);
    context.fillStyle = '#b9e43f';
    roundedRect(context, 70, 474, 222, 8, 4);
    context.fill();
    context.fillStyle = 'rgba(255,255,255,.18)';
    roundedRect(context, 304, 474, 286, 8, 4);
    context.fill();
    return canvas;
  }

  function createMovieArtwork(movie) {
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    const context = canvas.getContext('2d', { alpha: false });
    drawCover(context, movie, 0, 0, canvas.width, canvas.height);
    const shade = context.createLinearGradient(0, 0, 760, 0);
    shade.addColorStop(0, 'rgba(2,10,8,.86)');
    shade.addColorStop(.52, 'rgba(2,10,8,.36)');
    shade.addColorStop(1, 'rgba(2,10,8,.08)');
    context.fillStyle = shade;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#c2e94a';
    context.font = '700 18px "Open Sans", Arial, sans-serif';
    context.letterSpacing = '5px';
    context.fillText(copy.movieKicker, 64, 72);
    context.fillStyle = '#ffffff';
    context.font = '700 52px "Open Sans", Arial, sans-serif';
    context.fillText('BEYOND THE', 64, 154);
    context.fillText('SUMMIT', 64, 210);

    context.fillStyle = 'rgba(3,16,11,.8)';
    roundedRect(context, 64, 356, 258, 54, 27);
    context.fill();
    context.strokeStyle = 'rgba(190,229,73,.68)';
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = '#b9e43f';
    context.beginPath(); context.arc(92, 383, 8, 0, Math.PI * 2); context.fill();
    context.fillStyle = '#ffffff';
    context.font = '600 19px "Open Sans", Arial, sans-serif';
    context.fillText(copy.connected, 112, 390);
    context.fillStyle = 'rgba(255,255,255,.24)';
    roundedRect(context, 64, 466, 820, 7, 3.5); context.fill();
    context.fillStyle = '#b9e43f';
    roundedRect(context, 64, 466, 510, 7, 3.5); context.fill();
    return canvas;
  }

  async function buildCasting() {
    const demo = document.querySelector('#casting .casting-demo');
    if (!demo) return;
    demo.className = 'casting-demo hi-v5-casting-demo';
    demo.innerHTML = '<div class="hi-v5-casting-scene"><span class="hi-v5-media-loader" aria-hidden="true"></span></div>';
    const scene = demo.querySelector('.hi-v5-casting-scene');
    keepOnly(demo, '.hi-v5-casting-scene');

    const [room, movie] = await Promise.all([
      loadImage(asset('casting-anna-premium-v3-web.webp')),
      loadImage(asset('blockbuster-alpine-v1.jpg'))
    ]);
    const width = 1600;
    const height = 900;
    const screen = document.createElement('span');
    screen.className = 'hi-v5-tv-screen';
    screen.setAttribute('aria-hidden', 'true');
    const qrImage = document.createElement('span');
    qrImage.className = 'hi-v5-tv-state hi-v5-tv-qr';
    qrImage.style.backgroundImage = `url(${createQrArtwork().toDataURL('image/png')})`;
    const movieImage = document.createElement('span');
    movieImage.className = 'hi-v5-tv-state hi-v5-tv-movie';
    movieImage.style.backgroundImage = `url(${createMovieArtwork(movie).toDataURL('image/jpeg', .94)})`;
    screen.append(qrImage, movieImage);
    const status = document.createElement('span');
    status.className = 'sr-only hi-v5-casting-status';
    status.textContent = copy.pairTitle;
    scene.replaceChildren(screen, status);
    status.textContent = `${copy.pairTitle}. ${copy.movieTitle}. ${copy.connected}`;
    if (!reducedMotion) {
      let movieIsVisible = false;
      const advanceCasting = () => {
        movieIsVisible = !movieIsVisible;
        screen.classList.toggle('is-movie', movieIsVisible);
        window.setTimeout(advanceCasting, movieIsVisible ? 7000 : 5500);
      };
      window.setTimeout(advanceCasting, 5500);
    }
  }

  const jobs = [buildHero(), buildCasting()];
  Promise.allSettled(jobs).finally(() => {
    document.documentElement.classList.remove('hi-v5-booting');
    document.documentElement.classList.add('hi-v5-ready');
  });
  window.setTimeout(() => {
    document.documentElement.classList.remove('hi-v5-booting');
    document.documentElement.classList.add('hi-v5-ready');
  }, 5000);
})();
