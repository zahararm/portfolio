var SITE={

  playlist:'https://music.apple.com/us/playlist/website/pl.u-RRbVVD1TmjRWxV1',

  notify:{topic:'zahara-site-1c39a387acb0c3c0bab1',delay:6},

  projects:[
    {title:'Virtual Birthday Card',blurb:'Birthday card I built to send to distant loved ones created using URLSearchParams which allows me to customize the recipient.',image:'bday-card.png',github:'https://github.com/zahararm/virtual-birthday-card'},
    {title:'Budget Tracker',blurb:'Fun budget tracker that calculates your net savings/savings rate and if you’re over/under budget.',image:'budget-tracker.png',github:'https://github.com/zahararm/budget-tracker'},
    {title:'Pomodoro Study Site',blurb:'An interactive site for studying featuring rain, wave, and fire sounds along with a task list and focus timer!.',image:'relaxing-pomodoro.png',github:'https://github.com/zahararm/relaxing-pomodoro'}
  ],

  folders:[
    {name:'Myself!',slug:'myself/',color:'#FF8FCB',back:'#E064A8',items:[{src:'images/IMG_8151.jpeg',caption:'me after a kehlani concert'},{src:'images/IMG_8149.jpeg',caption:'me before giving a speech'},{src:'images/IMG_8148.jpeg',caption:'me after winning 2nd at the WiCys CTF'},{src:'images/IMG_8150.jpeg',caption:'me after the andy warhol museum'},{src:'images/IMG_8152.jpeg',caption:'me acting cool while holding a heavy pumpkin'},{src:'images/IMG_8153.jpeg',caption:'me and my co-interns graduating from our internship'}]},
    {name:'Music',slug:'music/',color:'#B9A4FF',back:'#8F78F0',items:[{src:'images/IMG_8164.jpeg',caption:'TBH - PARTYNEXTDOOR'},{src:'images/IMG_8163.jpeg',caption:'Rocketeer - Far East Movement'},{src:'images/IMG_8162.jpeg',caption:'Island In the Sun - Weezer'},{src:'images/IMG_8165.jpeg',caption:'Drive - The Weeknd'},{src:'images/IMG_8166.jpeg',caption:'butterflies. - Brent Faiyaz'},{src:'images/IMG_8167.jpeg',caption:'Time - Snoh Aalegra'}]},
    {name:'Nature',slug:'nature/',color:'#9FC3FF',back:'#6F9FEE',items:[{src:'images/IMG_8169.jpeg',caption:'on a walk'},{src:'images/IMG_8170.jpeg',caption:'sight seeing'},{src:'images/IMG_8171.jpeg',caption:'picnic with a friend'},{src:'images/IMG_8172.jpeg',caption:'exploration trip'},{src:'images/IMG_8173.jpeg',caption:'DC botanical garden'},{src:'images/IMG_8174.jpeg',caption:'on a walk'}]},
    {name:'Podcasts',slug:'podcasts/',color:'#9BE3C1',back:'#62C79B',items:[{src:'images/IMG_8178.jpeg',caption:'been listening since 2021, waiting for the day shes off hiatus'},{src:'images/IMG_8179.jpeg',caption:'I realized GMM isnt a podcast so I wanted to include this as representation'},{src:'images/IMG_8177.jpeg',caption:'I like to listen when I need a laugh'}]}
  ]
};
var lbOpen=false,fdOpen=false;
(function(){
  var g=document.getElementById('projects');
  SITE.projects.forEach(function(p){
    var a=document.createElement('a');a.className='card sw';a.href=p.github;a.target='_blank';a.rel='noopener noreferrer';
    a.setAttribute('aria-label',p.title+' on GitHub');
    a.innerHTML='<div class="shot"><span>'+(p.image?p.image.split('/').pop():'Project image')+'</span>'+(p.image?'<img src="'+p.image+'" alt="'+p.title+' screenshot" onerror="this.remove()">':'')+'</div><h3>'+p.title+'</h3><p>'+p.blurb+'</p><span class="gh">View on GitHub ↗</span>';
    g.appendChild(a);
  });
  var fg=document.getElementById('fgrid');
  SITE.folders.forEach(function(f,i){
    var b=document.createElement('button');b.className='folder';
    b.style.cssText='--fc:'+f.color+';--fb:'+f.back;
    b.setAttribute('aria-label','Open the '+f.name+' folder');
    b.innerHTML='<span class="fback"></span><span class="ftab">'+f.slug+'</span><span class="fpaper p1"></span><span class="fpaper p2"></span><span class="fpaper p3"></span><span class="ffront"><span>'+f.name+'<small>'+f.items.length+' items</small></span></span>';
    fg.appendChild(b);
  });
})();
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var scenes=[].slice.call(document.querySelectorAll('.scene')),N=scenes.length;
var pos=0,target=0,last=0,idle=0;
 
document.querySelectorAll('.sw').forEach(function(el){
  var t=document.createElement('span');t.className='t';
  while(el.firstChild)t.appendChild(el.firstChild);
  el.appendChild(t);
  if(!el.style.getPropertyValue('--d')){
    var i=[].filter.call(el.parentNode.children,function(c){return c.classList.contains('sw')}).indexOf(el);
    el.style.setProperty('--d',(i*.15)+'s');
  }
});

var dots=document.getElementById('dots'),names=['Intro','About','Work','Engineer','Creative','Contact'];
scenes.forEach(function(s,i){
  var b=document.createElement('button');b.setAttribute('aria-label',names[i]);
  b.onclick=function(){target=i+N*Math.round((target-i)/N);idle=0};
  dots.appendChild(b);
});

addEventListener('wheel',function(e){if(fdOpen||lbOpen){if(lbOpen)e.preventDefault();return}e.preventDefault();target+=e.deltaY*.0011;idle=performance.now()},{passive:false});
var ty=null;
addEventListener('touchstart',function(e){ty=e.touches[0].clientY},{passive:true});
addEventListener('touchmove',function(e){
  if(lbOpen||fdOpen)return;var y=e.touches[0].clientY;if(ty===null)ty=y;
  target+=(ty-y)/innerHeight*1.5;ty=y;idle=performance.now();
},{passive:true});
addEventListener('keydown',function(e){
  if(lbOpen||fdOpen)return;var k=e.key,step=(k==='ArrowDown'||k==='PageDown'||k===' ')?1:(k==='ArrowUp'||k==='PageUp')?-1:0;
  if(step){e.preventDefault();target=Math.round(target)+step;idle=0}
});

var cv=document.getElementById('sp'),cx=cv.getContext('2d'),W,H,stars=[];
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight}
size();addEventListener('resize',size);
for(var k=0;k<240;k++)stars.push({a:Math.random()*6.283,r:Math.random()});
function draw(v){
  cx.clearRect(0,0,W,H);
  var m=Math.hypot(W,H)/2,hx=W/2,hy=H/2,dir=v>=0?1:-1,sp=reduce?0:.0012+Math.abs(v)*1.3;
  cx.lineCap='round';
  stars.forEach(function(s){
    var r0=s.r;s.r+=dir*sp*(.3+s.r*2.2);
    if(s.r>1.1||s.r<0){s.r=dir>0?.04:1.05;s.a=Math.random()*6.283;r0=s.r}
    var c=Math.cos(s.a),n=Math.sin(s.a);
    cx.strokeStyle='rgba(205,212,255,'+Math.min(.9,s.r*1.3)+')';
    cx.lineWidth=.6+s.r*1.6;
    cx.beginPath();cx.moveTo(hx+c*r0*m,hy+n*r0*m);cx.lineTo(hx+c*s.r*m,hy+n*s.r*m);cx.stroke();
  });
}

var dotEls=dots.children;
function frame(t){
  if(!introDone)target=pos=0;
  if(t-idle>700)target+=(Math.round(target)-target)*.06;
  pos+=(target-pos)*.09;
  var v=pos-last;last=pos;
  scenes.forEach(function(sc,i){
    var d=((i-pos)%N+N)%N;if(d>N/2)d-=N;
    var s=reduce?1:(d<0?1+d*d*10:1/(1+d*3));
    var o=1-Math.min(1,Math.abs(d)*(d<0?1.6:1.5));
    sc.style.transform='scale('+s+')';
    sc.style.opacity=o;
    sc.style.visibility=o<.01?'hidden':'visible';
    sc.style.pointerEvents=Math.abs(d)<.3?'auto':'none';
    if(Math.abs(d)<.3){if(introDone)sc.classList.add('on')}else if(Math.abs(d)>.9)sc.classList.remove('on');
  });
  var a=((Math.round(pos)%N)+N)%N;
  for(var j=0;j<dotEls.length;j++)dotEls[j].classList.toggle('on',j===a);
  draw(v);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
 
// cursor spotlight
var nm=document.getElementById('name'),moved=false;
addEventListener('pointermove',function(e){
  if(e.pointerType==='touch')return;
  moved=true;
  var r=nm.getBoundingClientRect(),sc=r.width/nm.offsetWidth||1;
  nm.style.setProperty('--mx',(e.clientX-r.left)/sc+'px');
  nm.style.setProperty('--my',(e.clientY-r.top)/sc+'px');
});
(function drift(t){
  if(!moved&&!reduce){
    nm.style.setProperty('--mx',nm.offsetWidth*(.5+.38*Math.sin(t/1300))+'px');
    nm.style.setProperty('--my',nm.offsetHeight*(.5+.3*Math.cos(t/900))+'px');
  }
  requestAnimationFrame(drift);
})(0);
 
// intro
var introDone=false;
(function(){
  var cover=document.getElementById('intro'),row=document.getElementById('introRow');
  var FULL='ZAHARA MORRIS'; 
  var timers=[],gone=false;
  function end(){if(gone)return;gone=true;introDone=true;timers.forEach(clearTimeout);cover.remove()}
  if(reduce){end();return}
  ['pointerdown','keydown','wheel'].forEach(function(ev){addEventListener(ev,end,{once:true,passive:true})});
  function start(){
    if(gone)return;
    var words=[];
    FULL.toUpperCase().split(' ').forEach(function(word,wi){
      if(wi){var sp=document.createElement('span');sp.innerHTML='&nbsp;';sp.dataset.k='gap';row.appendChild(sp)}
      var ls=word.split('').map(function(ch){var s=document.createElement('span');s.textContent=ch;row.appendChild(s);return s});
      words.push(ls);
    });
  
    row.style.fontSize='100px';
    var fs=Math.min(100*innerWidth*1.02/row.getBoundingClientRect().width,innerWidth*.17,280);
    row.style.fontSize=fs+'px';
    var kids=[].slice.call(row.children);
    var ws=kids.map(function(e){return e.getBoundingClientRect().width});
    kids.forEach(function(e,i){e.style.width=ws[i]+'px'});
    var ease='cubic-bezier(.7,0,.3,1)',T0=1100,STEP=55,maxJ=0;
    words.forEach(function(ls){
      var n=ls.length-1; 
      for(var i=1;i<ls.length;i++){
        var j=ls.length-1-i,e=ls[i];maxJ=Math.max(maxJ,j);
        e.animate([{width:ws[kids.indexOf(e)]+'px',opacity:1,transform:'scaleX(1)'},{width:'0px',opacity:0,transform:'scaleX(.12)'}],
          {duration:380,delay:T0+j*STEP,easing:ease,fill:'forwards'});
      }
    });
    kids.forEach(function(e,i){
      if(e.dataset.k==='gap')e.animate([{width:ws[i]+'px'},{width:(fs*.1)+'px'}],{duration:480,delay:T0+maxJ*STEP*.6,easing:ease,fill:'forwards'});
    });
    var collapseEnd=T0+maxJ*STEP+380;
    var growAt=collapseEnd+600;
    row.animate([{clipPath:'inset(47% 0 47% 0)',transform:'scaleY(.12)'},{clipPath:'inset(0)',transform:'scaleY(1)'}],{duration:520,easing:'cubic-bezier(.2,.8,.2,1)'});
    row.animate([{transform:'scale(1)',filter:'blur(0px)',offset:0},{transform:'scale(1.6)',filter:'blur(5px)',offset:.35},{transform:'scale(3.2)',filter:'blur(0px)',offset:1}],{duration:900,delay:growAt,easing:'cubic-bezier(.5,0,.2,1)',fill:'forwards'});
    row.animate([{opacity:1},{opacity:.45,offset:.4},{opacity:0}],{duration:420,delay:growAt+950,fill:'forwards'});
    cover.animate([{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(100% 0 0 0)'}],{duration:700,delay:growAt+1250,easing:'cubic-bezier(.7,0,.2,1)',fill:'forwards'});
    timers.push(setTimeout(function(){introDone=true},growAt+1600),setTimeout(end,growAt+2100));
  }
  var go=(document.fonts&&document.fonts.load)?Promise.race([document.fonts.load('400 40px "Archivo Black"'),new Promise(function(r){setTimeout(r,1500)})]):Promise.resolve();
  go.then(start,start);
})();
 
// folders
(function(){
  var fd=document.getElementById('fd'),mix=document.getElementById('mix'),ttl=document.getElementById('fdtitle'),cnt=document.getElementById('fdcount');
  var btns=[].slice.call(document.querySelectorAll('.folder')),cur=null;
  function fill(i){
    var f=SITE.folders[i];mix.innerHTML='';
    f.items.forEach(function(it,j){
      var t=document.createElement('button');t.className='tile';t.setAttribute('aria-label','Open '+it.caption);
      t.innerHTML=(it.src?'<img src="'+it.src+'" alt="'+it.caption+'" onerror="this.remove()">':'')+'<span>'+it.caption+'</span>';
      t.onclick=function(){openLightbox(f.items,j)};
      mix.appendChild(t);
    });
    ttl.textContent=f.slug;cnt.textContent=f.items.length+' items';
    fd.style.setProperty('--fc',f.color);
  }
  function open(i){cur=i;fill(i);btns[i].classList.add('open');setTimeout(function(){fd.classList.add('open');fdOpen=true;document.getElementById('fdClose').focus()},260)}
  function close(){fd.classList.remove('open');fdOpen=false;if(cur!==null){btns[cur].classList.remove('open');btns[cur].focus()}}
  btns.forEach(function(b,i){b.addEventListener('click',function(){open(i)})});
  document.getElementById('fdClose').onclick=close;
  fd.addEventListener('click',function(e){if(e.target===fd)close()});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&fdOpen&&!lbOpen)close()});
})();

(function(){
  var lb=document.getElementById('lb'),fig=document.getElementById('lbFig'),cap=document.getElementById('lbCap'),items=[],idx=0,x0=null;
  function show(i){
    idx=(i+items.length)%items.length;var g=items[idx];
    fig.innerHTML=g.src?'<img src="'+g.src+'" alt="'+g.caption+'">':'<div class="lbph">'+g.caption+'</div>';
    cap.textContent=(idx+1)+' / '+items.length+'  ·  '+g.caption;
  }
  function open(i){show(i);lb.classList.add('open');lbOpen=true;document.getElementById('lbClose').focus()}
  function close(){lb.classList.remove('open');lbOpen=false}
  window.openLightbox=function(list,i){items=list;open(i)};
  document.getElementById('lbClose').onclick=close;
  document.getElementById('lbPrev').onclick=function(){show(idx-1)};
  document.getElementById('lbNext').onclick=function(){show(idx+1)};
  lb.addEventListener('click',function(e){if(e.target===lb||e.target===fig)close()});
  addEventListener('keydown',function(e){
    if(!lbOpen)return;
    if(e.key==='Escape')close();else if(e.key==='ArrowRight')show(idx+1);else if(e.key==='ArrowLeft')show(idx-1);
  });
  lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){
    if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;
    if(Math.abs(dx)>50)show(idx+(dx<0?1:-1));
  },{passive:true});
})();
 
(function(){
  var panel=document.getElementById('mpanel'),box=document.getElementById('mbox'),tab=document.getElementById('mtab');
  var u=(SITE.playlist||'').trim();
  if(u){
    var f=document.createElement('iframe');
    f.src=u.replace('https://music.apple.com','https://embed.music.apple.com');
    f.allow='autoplay *; encrypted-media *; clipboard-write';
    f.setAttribute('sandbox','allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation');
    f.title='Apple Music playlist';f.height='175';f.loading='eager';
    box.appendChild(f);
  }
  tab.addEventListener('click',function(){
    var o=panel.classList.toggle('open');tab.setAttribute('aria-expanded',o);panel.setAttribute('aria-hidden',!o);
  });
})();

(function(){
  var h=document.getElementById('name');
  function fit(){
    h.style.fontSize='';
    var w=h.offsetWidth,max=innerWidth*.86;
    if(w>max)h.style.fontSize=(parseFloat(getComputedStyle(h).fontSize)*max/w)+'px';
  }
  fit();addEventListener('resize',fit);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
})();

document.querySelectorAll('.card,.tile').forEach(function(c){
  c.addEventListener('pointermove',function(e){
    if(reduce||e.pointerType==='touch')return;
    var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    c.style.transform='rotateY('+x*10+'deg) rotateX('+(-y*10)+'deg) translateY(-4px)';
  });
  c.addEventListener('pointerleave',function(){c.style.transform=''});
});

(function(){
  var cfg=SITE.notify||{};
  if(!cfg.topic)return;                                                    
  try{
    if(/[?&]me(&|$)/.test(location.search))localStorage.setItem('owner','1'); 
    if(localStorage.getItem('owner'))return;
  }catch(e){}
  if(location.protocol==='file:'||/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname))return; 
  if(navigator.webdriver||/bot|crawl|spider|headless|lighthouse|preview|slurp/i.test(navigator.userAgent))return; 
  try{if(Date.now()-(+localStorage.getItem('lastPing')||0)<12*36e5)return}catch(e){}  
  function send(){
    try{localStorage.setItem('lastPing',Date.now())}catch(e){}
    var ref='direct';try{if(document.referrer)ref=new URL(document.referrer).hostname}catch(e){}
    var dev=matchMedia('(pointer:coarse)').matches?(Math.min(screen.width,screen.height)>=600?'tablet':'phone'):'computer';
    var tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}
    var msg='Someone visted!: '+dev+', from '+ref+(tz?', '+tz:'');   
    fetch('https://ntfy.sh/'+encodeURIComponent(cfg.topic)+'?title='+encodeURIComponent('Portfolio visitor')+'&tags=eyes',{method:'POST',body:msg,mode:'no-cors',keepalive:true}).catch(function(){});
  }
  setTimeout(function(){
    if(!document.hidden)return send();
    document.addEventListener('visibilitychange',function f(){if(!document.hidden){document.removeEventListener('visibilitychange',f);send()}});
  },(cfg.delay||6)*1000);
})();
 