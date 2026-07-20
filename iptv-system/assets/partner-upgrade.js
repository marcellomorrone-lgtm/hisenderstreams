(function () {
  const partners = [
    ["Samsung", "partner-samsung", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Samsung_wordmark.svg"],
    ["LG", "partner-lg", "https://commons.wikimedia.org/wiki/Special:Redirect/file/LG_Electronics_Logo_(modern).svg"],
    ["Loewe", "partner-loewe", "https://commons.wikimedia.org/wiki/Special:Redirect/file/LOEWE-Logo.svg"],
    ["Uniguest", "partner-uniguest", "https://uniguest.com/wp-content/uploads/2022/05/Uniguest-Group-Logo.png"],
  ];

  const nodeMarks = ["PMS", "TV", "CAST", "CMS", "SVC", "DATA"];

  function repairImagePath(image) {
    const src = image.getAttribute("src") || "";
    if (src.startsWith("/images/")) image.setAttribute("src", `/iptv-system${src}`);
    if (src === "/hotelinnovativ-logo.png") image.setAttribute("src", "/iptv-system/hotelinnovativ-logo.png");
  }

  function repairAssetPaths(root = document) {
    if (root instanceof HTMLImageElement) repairImagePath(root);
    root.querySelectorAll?.('img[src^="/images/"], img[src="/hotelinnovativ-logo.png"]').forEach(repairImagePath);
  }

  const assetObserver = new MutationObserver((records) => {
    records.forEach((record) => {
      if (record.type === "attributes") repairAssetPaths(record.target);
      record.addedNodes.forEach((node) => {
        if (node instanceof Element) repairAssetPaths(node);
      });
    });
  });

  repairAssetPaths();
  assetObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["src"],
    childList: true,
    subtree: true,
  });

  function enhanceHub() {
    const hub = document.querySelector(".hub-network");
    if (!hub || hub.dataset.premiumHub === "true") return;
    hub.dataset.premiumHub = "true";

    hub.insertAdjacentHTML("afterbegin", '<div class="hub-aurora" aria-hidden="true"></div>');
    const thirdRadar = hub.querySelector(".hub-radar.r3");
    thirdRadar?.insertAdjacentHTML(
      "afterend",
      '<div class="hub-orbit hub-orbit-inner" aria-hidden="true"><i></i><i></i><i></i></div><div class="hub-orbit hub-orbit-outer" aria-hidden="true"><i></i><i></i></div><div class="hub-radar-sweep" aria-hidden="true"></div>'
    );

    const center = hub.querySelector(".hub-center");
    if (center) {
      center.insertAdjacentHTML("afterbegin", '<span class="hub-center-halo"></span>');
      center.insertAdjacentHTML("beforeend", "<em>CONNECTED</em>");
    }

    hub.querySelectorAll(".hub-satellite i").forEach((icon, index) => {
      icon.innerHTML = `<b>${nodeMarks[index] || "LINK"}</b>`;
    });
    hub.insertAdjacentHTML("beforeend", '<div class="data-pulse p4"></div>');
  }

  function partnerGroup(hidden) {
    const logos = partners.map(([name, className, src]) => (
      `<span class="partner-logo ${className}"><img src="${src}" alt="${hidden ? "" : name}" decoding="async"><b>${name}</b></span>`
    )).join("");
    return `<div class="partner-group"${hidden ? ' aria-hidden="true"' : ""}>${logos}</div>`;
  }

  function enhancePartnerBand() {
    const band = document.querySelector(".integration-band");
    if (!band || band.dataset.partnerUpgrade === "true") return;
    band.dataset.partnerUpgrade = "true";
    band.innerHTML = `<small>NAHTLOS VERBUNDEN · TECHNOLOGIEPARTNER</small><div class="partner-marquee" aria-label="Technologiepartner Samsung, LG, Loewe und Uniguest"><div class="partner-track">${partnerGroup(false)}${partnerGroup(true)}</div></div><p>Hospitality-Technologie, die mit führenden TV-Marken und Uniguest als Plattform zusammenspielt.</p>`;
    band.querySelectorAll(".partner-logo img").forEach((image) => {
      image.addEventListener("error", () => {
        image.style.display = "none";
        const fallback = image.nextElementSibling;
        if (fallback) fallback.style.display = "block";
      });
    });
  }

  function enhance() {
    repairAssetPaths();
    enhanceHub();
    enhancePartnerBand();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance, { once: true });
  else enhance();
  window.setTimeout(enhance, 500);
  window.setTimeout(enhance, 1500);
})();
