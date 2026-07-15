const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const storyData=[
  {label:'Before Stay',metric:'UPSELL CONVERSION',value:'+12.4%',counter:'01'},
  {label:'Anreise',metric:'TRANSFER STATUS',value:'on time',counter:'01'},
  {label:'Check-in',metric:'ZEIT GEWONNEN',value:'−6 min',counter:'02'},
  {label:'During Stay',metric:'SERVICE UMSATZ',value:'+18.1%',counter:'03'},
  {label:'Check-out',metric:'ANTWORTZEIT',value:'−35%',counter:'04'},
  {label:'After Stay',metric:'DIREKTBUCHUNG',value:'+7.0%',counter:'05'}
];
const header=$('.site-header'),pageProgress=$('.page-progress i'),cursor=$('.cursor-glow'),journey=$('.journey-scroll'),sticky=$('.sticky-stage');
let activeStage=0,rafPending=false;

addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});

function setStory(index){
  if(index===activeStage)return;activeStage=index;
  $$('.story-bg').forEach((el,i)=>el.classList.toggle('active',i===index));
  $$('.story-copy').forEach((el,i)=>el.classList.toggle('active',i===index));
  $$('[data-device]').forEach((el,i)=>el.classList.toggle('active',i===index));
  $$('.rail-stops span').forEach((el,i)=>el.classList.toggle('active',i===index));
  const d=storyData[index];$('#orbLabel').textContent=d.label;$('#metricLabel').textContent=d.metric;$('#metricValue').textContent=d.value;$('#stageCurrent').textContent=d.counter;
}

function onScroll(){
  if(rafPending)return;rafPending=true;requestAnimationFrame(()=>{
    const max=document.documentElement.scrollHeight-innerHeight;pageProgress.style.height=(scrollY/max*100)+'%';header.classList.toggle('scrolled',scrollY>40);
    const rect=journey.getBoundingClientRect(),travel=journey.offsetHeight-innerHeight;
    if(rect.top<=0&&rect.bottom>=innerHeight){
      const p=Math.min(1,Math.max(0,-rect.top/travel));sticky.style.setProperty('--story-progress',p);
      setStory(Math.min(5,Math.floor(p*6)));
      const local=(p*6)%1;
      const bg=$('.story-bg.active img');
      const faceClearance=activeStage>=4?(innerWidth<760?24:38):0;
      if(bg)bg.style.transform=`scale(${1.045-local*.035}) translateY(${faceClearance+(local-.5)*8}px)`;
      const device=$('[data-device].active');if(device)device.style.setProperty('--local-progress',local);
    }
    rafPending=false;
  })
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){setTimeout(()=>entry.target.classList.add('visible'),+(entry.target.dataset.delay||0));revealObserver.unobserve(entry.target)}}),{threshold:.12});$$('.reveal').forEach(el=>revealObserver.observe(el));
const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=+el.dataset.count,start=performance.now();const tick=now=>{const p=Math.min((now-start)/1200,1);el.textContent=Math.floor(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);countObserver.unobserve(el)}),{threshold:.5});$$('[data-count]').forEach(el=>countObserver.observe(el));

const rooms=$('#rooms'),occupancy=$('#occupancy'),adr=$('#adr');
const money=n=>Math.round(n).toLocaleString('de-CH').replace(/’/g,"'");
function fillRange(input){const p=(input.value-input.min)/(input.max-input.min)*100;input.style.setProperty('--fill',p+'%')}
function calculate(){
  [rooms,occupancy,adr].forEach(fillRange);$('#roomsOut').textContent=rooms.value;$('#occupancyOut').textContent=occupancy.value+'%';$('#adrOut').textContent='CHF '+adr.value;
  const services=$$('.service-toggles button.active').length,sf=.52+(services/6)*.48,af=.68+(+adr.value/180)*.32,annual=+rooms.value*108.25*12*1.25*(+occupancy.value/70)*sf*af;
  $('#resultValue').textContent=money(annual);$('#perRoom').textContent='CHF '+(annual/+rooms.value/12).toFixed(2);$('#serviceCount').textContent=services+' von 6';
}
[rooms,occupancy,adr].forEach(el=>el.addEventListener('input',calculate));$$('.service-toggles button').forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('active');calculate()}));calculate();

$$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
const menu=$('.menu-toggle');menu.addEventListener('click',()=>{const open=header.classList.toggle('menu-active');menu.setAttribute('aria-expanded',open)});$$('.site-header nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('menu-active')));

const canvas=$('#ambient'),ctx=canvas.getContext('2d');let dots=[];
function sizeCanvas(){const d=Math.min(devicePixelRatio,2);canvas.width=innerWidth*d;canvas.height=innerHeight*d;ctx.setTransform(d,0,0,d,0,0);dots=Array.from({length:Math.min(65,Math.floor(innerWidth/20))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()+.2,v:Math.random()*.12+.03}))}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);ctx.fillStyle='rgba(113,148,22,.26)';dots.forEach(p=>{p.y-=p.v;if(p.y<0)p.y=innerHeight;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(draw)}addEventListener('resize',sizeCanvas);sizeCanvas();draw();
