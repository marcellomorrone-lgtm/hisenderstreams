(function () {
  "use strict";
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("motion-ready", "static-iptv");

  var partners = [
    ["Samsung", "partner-samsung", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Samsung_wordmark.svg"],
    ["LG", "partner-lg", "https://commons.wikimedia.org/wiki/Special:Redirect/file/LG_Electronics_Logo_(modern).svg"],
    ["Loewe", "partner-loewe", "https://commons.wikimedia.org/wiki/Special:Redirect/file/LOEWE-Logo.svg"],
    ["Uniguest", "partner-uniguest", "https://uniguest.com/wp-content/uploads/2022/05/Uniguest-Group-Logo.png"]
  ];
  var nodeMarks = ["PMS", "TV", "CAST", "CMS", "SVC", "DATA"];
  var clamp = function (value, min, max) { return Math.min(max, Math.max(min, value)); };

  function repairAssetPaths() {
    document.querySelectorAll('img[src^="/images/"], img[src="/hotelinnovativ-logo.png"]').forEach(function (image) {
      var src = image.getAttribute("src") || "";
      if (src.indexOf("/images/") === 0) image.setAttribute("src", "/iptv-system" + src);
      if (src === "/hotelinnovativ-logo.png") image.setAttribute("src", "/iptv-system/hotelinnovativ-logo.png");
    });
  }

  function enhanceHub() {
    var hub = document.querySelector(".hub-network");
    if (!hub || hub.dataset.premiumHub === "true") return;
    hub.dataset.premiumHub = "true";
    hub.insertAdjacentHTML("afterbegin", '<div class="hub-aurora" aria-hidden="true"></div>');
    var thirdRadar = hub.querySelector(".hub-radar.r3");
    if (thirdRadar) thirdRadar.insertAdjacentHTML("afterend", '<div class="hub-orbit hub-orbit-inner" aria-hidden="true"><i></i><i></i><i></i></div><div class="hub-orbit hub-orbit-outer" aria-hidden="true"><i></i><i></i></div><div class="hub-radar-sweep" aria-hidden="true"></div>');
    var center = hub.querySelector(".hub-center");
    if (center) {
      center.insertAdjacentHTML("afterbegin", '<span class="hub-center-halo"></span>');
      center.insertAdjacentHTML("beforeend", "<em>CONNECTED</em>");
    }
    hub.querySelectorAll(".hub-satellite i").forEach(function (icon, index) {
      icon.innerHTML = "<b>" + (nodeMarks[index] || "LINK") + "</b>";
    });
    hub.insertAdjacentHTML("beforeend", '<div class="data-pulse p4"></div>');
  }

  function partnerGroup(hidden) {
    return '<div class="partner-group"' + (hidden ? ' aria-hidden="true"' : "") + '>' + partners.map(function (partner) {
      return '<span class="partner-logo ' + partner[1] + '"><img src="' + partner[2] + '" alt="' + (hidden ? "" : partner[0]) + '" decoding="async"><b>' + partner[0] + '</b></span>';
    }).join("") + "</div>";
  }

  function enhancePartnerBand() {
    var band = document.querySelector(".integration-band");
    if (!band || band.dataset.partnerUpgrade === "true") return;
    band.dataset.partnerUpgrade = "true";
    band.innerHTML = '<small>NAHTLOS VERBUNDEN · TECHNOLOGIEPARTNER</small><div class="partner-marquee" aria-label="Technologiepartner Samsung, LG, Loewe und Uniguest"><div class="partner-track">' + partnerGroup(false) + partnerGroup(true) + '</div></div><p>Hospitality-Technologie, die mit führenden TV-Marken und Uniguest als Plattform zusammenspielt.</p>';
    band.querySelectorAll(".partner-logo img").forEach(function (image) {
      image.addEventListener("error", function () {
        image.style.display = "none";
        if (image.nextElementSibling) image.nextElementSibling.style.display = "block";
      });
    });
  }

  function setupReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    items.forEach(function (item, index) { item.style.setProperty("--reveal-order", String(index % 4)); });
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("in-view"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.04 });
    items.forEach(function (item) { observer.observe(item); });
  }

  function setupMobileMenu() {
    var button = document.querySelector(".mobile-menu");
    var nav = document.querySelector(".floating-header nav");
    if (!button || !nav) return;
    button.addEventListener("click", function () {
      var open = !nav.classList.contains("open");
      nav.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
      root.classList.toggle("menu-open", open);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        root.classList.remove("menu-open");
      });
    });
  }

  function setupDesignOrbit() {
    var section = document.querySelector(".design-section");
    if (!section) return;
    var screens = Array.prototype.slice.call(section.querySelectorAll(".design-screen"));
    var dots = Array.prototype.slice.call(section.querySelectorAll(".design-dots button"));
    var previous = section.querySelector('[aria-label="Vorheriges Design"]');
    var next = section.querySelector('[aria-label="Nächstes Design"]');
    var counter = section.querySelector(".design-controls > p b");
    var current = 0;
    var paused = false;
    var pointerStart = null;

    function setDesign(nextIndex, userInitiated) {
      current = (nextIndex + screens.length) % screens.length;
      screens.forEach(function (screen, index) {
        var offset = index - current;
        if (offset > screens.length / 2) offset -= screens.length;
        if (offset < -screens.length / 2) offset += screens.length;
        var distance = Math.abs(offset);
        screen.style.setProperty("--x", (offset * 14) + "vw");
        screen.style.setProperty("--rotate", (offset * -14) + "deg");
        screen.style.setProperty("--scale", String(Math.max(0.7, 1 - distance * 0.09)));
        screen.style.setProperty("--opacity", String(Math.max(0.1, 1 - distance * 0.25)));
        screen.style.setProperty("--depth", (distance * -125) + "px");
        screen.style.setProperty("--z", String(20 - distance));
        screen.classList.toggle("active", offset === 0);
        screen.setAttribute("aria-current", offset === 0 ? "true" : "false");
      });
      dots.forEach(function (dot, index) { dot.classList.toggle("active", index === current); });
      if (counter) counter.textContent = String(current + 1).padStart(2, "0");
      if (userInitiated) section.classList.add("orbit-engaged");
    }

    screens.forEach(function (screen, index) { screen.addEventListener("click", function () { setDesign(index, true); }); });
    dots.forEach(function (dot, index) { dot.addEventListener("click", function () { setDesign(index, true); }); });
    if (previous) previous.addEventListener("click", function () { setDesign(current - 1, true); });
    if (next) next.addEventListener("click", function () { setDesign(current + 1, true); });
    section.addEventListener("pointerenter", function () { paused = true; });
    section.addEventListener("pointerleave", function () { paused = false; pointerStart = null; });
    section.addEventListener("pointerdown", function (event) { pointerStart = event.clientX; });
    section.addEventListener("pointerup", function (event) {
      if (pointerStart === null) return;
      var delta = event.clientX - pointerStart;
      if (Math.abs(delta) > 45) setDesign(current + (delta < 0 ? 1 : -1), true);
      pointerStart = null;
    });
    window.addEventListener("keydown", function (event) {
      var rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      if (event.key === "ArrowLeft") setDesign(current - 1, true);
      if (event.key === "ArrowRight") setDesign(current + 1, true);
    });
    if (!reduceMotion) window.setInterval(function () { if (!paused) setDesign(current + 1, false); }, 5600);
    setDesign(0, false);
  }

  function setupPotential() {
    var section = document.querySelector(".impact-section");
    if (!section) return;
    var inputs = section.querySelectorAll('input[type="range"]');
    if (inputs.length < 2) return;
    var roomInput = inputs[0];
    var occupancyInput = inputs[1];
    var labels = section.querySelectorAll(".impact-controls label b");
    var result = section.querySelector(".result-ring b");
    var stats = section.querySelectorAll(".result-stats b");
    function format(value) { return new Intl.NumberFormat("de-CH").format(value); }
    function update() {
      var rooms = Number(roomInput.value);
      var occupancy = Number(occupancyInput.value);
      var annual = Math.round(rooms * (occupancy / 100) * 365 * 1.8 / 100) * 100;
      var engaged = Math.round(rooms * (occupancy / 100) * 365 * 0.58);
      if (labels[0]) labels[0].textContent = String(rooms);
      if (labels[1]) labels[1].textContent = occupancy + "%";
      if (result) result.textContent = "CHF " + format(annual);
      if (stats[0]) stats[0].textContent = format(engaged);
      if (stats[1]) stats[1].textContent = Math.round(occupancy * 0.24) + "%";
      var ring = section.querySelector(".result-ring");
      if (ring) ring.style.setProperty("--fill", Math.min(92, 35 + occupancy * 0.55) + "%");
    }
    roomInput.addEventListener("input", update);
    occupancyInput.addEventListener("input", update);
    update();
  }

  function setupScrollStory() {
    var hero = document.querySelector(".hero-sequence");
    var heroPin = document.querySelector(".hero-pin");
    var progress = document.querySelector(".page-progress i");
    var header = document.querySelector(".floating-header");
    var journey = document.querySelector(".journey-stage");
    var chapters = Array.prototype.slice.call(document.querySelectorAll(".journey-chapter"));
    var railSteps = Array.prototype.slice.call(document.querySelectorAll(".journey-rail span"));
    var targetY = window.scrollY;
    var smoothY = targetY;
    var frame = 0;

    function render() {
      frame = 0;
      targetY = window.scrollY;
      smoothY += (targetY - smoothY) * (reduceMotion ? 1 : 0.16);
      var docMax = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      if (progress) progress.style.transform = "scaleY(" + clamp(smoothY / docMax, 0, 1) + ")";
      if (header) header.classList.toggle("is-scrolled", targetY > 80);
      if (hero && heroPin) {
        var heroDistance = Math.max(1, hero.offsetHeight - innerHeight);
        var heroProgress = clamp((smoothY - hero.offsetTop) / heroDistance, 0, 1);
        heroPin.style.setProperty("--hero-p", heroProgress.toFixed(4));
      }
      var activeIndex = 0;
      chapters.forEach(function (chapter, index) {
        var rect = chapter.getBoundingClientRect();
        var local = clamp((innerHeight - rect.top) / (rect.height + innerHeight), 0, 1);
        var active = rect.top <= innerHeight * 0.52 && rect.bottom >= innerHeight * 0.48;
        if (active) activeIndex = index;
        chapter.classList.toggle("is-active", active);
        chapter.style.setProperty("--chapter-p", local.toFixed(4));
        chapter.style.setProperty("--image-y", ((0.5 - local) * 18).toFixed(2) + "px");
        chapter.style.setProperty("--copy-y", ((0.5 - local) * 24).toFixed(2) + "px");
        chapter.style.setProperty("--image-scale", (1.045 - Math.abs(0.5 - local) * 0.025).toFixed(4));
      });
      railSteps.forEach(function (step, index) { step.classList.toggle("done", index <= activeIndex); });
      if (journey) {
        var journeyRect = journey.getBoundingClientRect();
        root.classList.toggle("journey-active", journeyRect.top < innerHeight * 0.7 && journeyRect.bottom > innerHeight * 0.3);
      }
      if (Math.abs(targetY - smoothY) > 0.35) frame = requestAnimationFrame(render);
    }
    function requestRender() { targetY = window.scrollY; if (!frame) frame = requestAnimationFrame(render); }
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender, { passive: true });
    render();
  }

  function setupActiveNavigation() {
    if (!("IntersectionObserver" in window)) return;
    var links = Array.prototype.slice.call(document.querySelectorAll('.floating-header nav a[href^="#"]'));
    var map = {};
    links.forEach(function (link) { map[link.getAttribute("href").slice(1)] = link; });
    var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.classList.remove("is-active"); });
        if (map[entry.target.id]) map[entry.target.id].classList.add("is-active");
      });
    }, { rootMargin: "-42% 0px -48% 0px", threshold: 0.01 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  repairAssetPaths();
  enhanceHub();
  enhancePartnerBand();
  setupReveal();
  setupMobileMenu();
  setupDesignOrbit();
  setupPotential();
  setupScrollStory();
  setupActiveNavigation();
  root.classList.add("experience-ready");
})();
