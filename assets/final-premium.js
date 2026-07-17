(()=>{
  document.body.classList.add('hi-final-premium');
  document.querySelectorAll('.hi-section-nav,.hi-scroll-rail,.story-progress,.story-rail,.story-chapter-marker').forEach(node=>node.remove());

  const channelStrip=document.querySelector('.hero-tv-channel-strip');
  if(channelStrip&&!channelStrip.dataset.finalMarquee){
    channelStrip.dataset.finalMarquee='true';
    Array.from(channelStrip.querySelectorAll('img')).forEach(image=>channelStrip.append(image.cloneNode(true)));
    channelStrip.classList.add('is-running');
  }

  const aboutBrandCard=document.querySelector('#about .about-card.accent');
  if(aboutBrandCard&&!aboutBrandCard.querySelector('.hi-core-pictogram')){
    const mark=document.createElement('div');
    mark.className='hi-core-pictogram';
    mark.setAttribute('aria-label','Hotelinnovativ Digital Core');
    mark.innerHTML='<img src="/assets/logo-hotelinnovativ-original.png" alt="Hotelinnovativ hi Piktogramm">';
    aboutBrandCard.prepend(mark);
  }

  const flagFallbacks={ch:'🇨🇭',ar:'🌍',es:'🇪🇸',ru:'🇷🇺',uk:'🇺🇦',pt:'🇵🇹'};
  const replaceFlag=image=>{
    if(!image.isConnected)return;
    const code=(image.getAttribute('src')||'').split('/').pop().split('.')[0];
    const fallback=document.createElement('span');
    fallback.className='flag-fallback';
    fallback.setAttribute('aria-hidden','true');
    fallback.textContent=flagFallbacks[code]||'🇨🇭';
    image.replaceWith(fallback);
  };
  document.querySelectorAll('#finder img[src*="assets/flags/"]').forEach(image=>{
    if(image.complete&&!image.naturalWidth)replaceFlag(image);
    else image.addEventListener('error',()=>replaceFlag(image),{once:true});
  });
})();
