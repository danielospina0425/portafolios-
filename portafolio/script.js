/* PORTAFOLIO DE DANIEL OSPINA LOSADA
   Edita títulos, descripciones y rutas. Carrusel: 10 imágenes por sección.
   Capturas: assets/web/web-01.jpg a web-10.jpg. Diseños: assets/grafico/grafico-01.jpg a grafico-10.jpg.
*/
const webProjects=Array.from({length:10},(_,i)=>({title:`Proyecto web ${String(i+1).padStart(2,'0')}`,type:['Sitio web','Tienda online','Landing page'][i%3],description:'Reemplaza este texto por una descripción real del proyecto.',image:`assets/web/web-${String(i+1).padStart(2,'0')}.jpg`}));
const graphicProjects=Array.from({length:10},(_,i)=>({title:`Diseño gráfico ${String(i+1).padStart(2,'0')}`,type:['Póster publicitario','Banner','Identidad visual','Ilustración'][i%4],description:'Describe brevemente la idea y el propósito de esta pieza.',image:`assets/grafico/grafico-${String(i+1).padStart(2,'0')}.jpg`}));
const projectLinks=Array.from({length:10},(_,i)=>({title:`Proyecto en línea ${String(i+1).padStart(2,'0')}`,type:['Sitio web','Tienda online','Landing page'][i%3],description:'Descripción corta del proyecto.',url:'https://ejemplo.com'}));
const mediaProjects=[{kind:'image',src:'assets/gif/animacion-01.gif',title:'Animación / GIF 01',description:'Reemplaza por una animación tuya.'},{kind:'video',src:'assets/video/video-01.mp4',title:'Video multimedia 01',description:'Reemplaza por un video promocional.'},{kind:'image',src:'assets/gif/animacion-02.gif',title:'Animación / GIF 02',description:'Agrega otra pieza animada.'}];
const contactEmail='noaseo01@gmail.com';const contactPhone='573213076112';const workanaUrl='https://www.workana.com/';
const contactSubject='Consulta sobre servicios de diseño y contenido digital';
const contactMessage='Hola Daniel, vi tu portafolio y quisiera hacerte una consulta sobre tus servicios.\n\nMi nombre es: \nMi proyecto o negocio: \nEl servicio que necesito: \nPresupuesto aproximado (opcional): \nFecha ideal (opcional): \n\n¡Gracias!';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeUrl(s){try{const u=new URL(s);return ['http:','https:'].includes(u.protocol)?u.href:'#'}catch{return '#'}}
function showProject(item){const d=document.querySelector('#viewer'),im=document.querySelector('#viewerImg');im.style.display='block';im.src=item.image;im.onerror=()=>im.style.display='none';document.querySelector('#viewerTitle').textContent=item.title;document.querySelector('#viewerDesc').textContent=`${item.type} — ${item.description}`;if(d.showModal)d.showModal();else alert(`${item.title}\n${item.description}`)}
function renderCarousel(shell,items,kind){
 const track=shell.querySelector('[data-track]'),counter=shell.querySelector('[data-counter]'),dots=shell.querySelector('[data-dots]'),n=items.length,pad=v=>String(v).padStart(2,'0');
 let current=0,suppressClick=false;
 shell.setAttribute('tabindex','0');
 dots.innerHTML=items.map((_,i)=>`<button class="carousel-dot ${i===0?'active':''}" aria-label="Ir al proyecto ${i+1}"></button>`).join('');
 const dotButtons=[...dots.querySelectorAll('button')];
 /* Las tarjetas se crean UNA sola vez; al navegar solo cambian de posición y el CSS las desliza hacia el lado indicado. */
 const cards=items.map((item,idx)=>{
  const card=document.createElement('button');card.type='button';card.className='carousel-slide';
  card.innerHTML=`<div class="slide-frame"><div class="slide-chrome"><span></span><span></span><span></span><i>${kind==='web'?'PREVIEW / WEB':'VISUAL / DESIGN'}</i></div><div class="slide-image-wrap"><img src="${esc(item.image)}" alt="${esc(item.title)}" draggable="false"><div class="image-fallback"><b>${kind==='web'?'WEB':'VISUAL'}</b><span>AÑADE TU IMAGEN</span></div><div class="scanline"></div></div><div class="slide-meta"><span>${pad(idx+1)} / ${pad(n)}</span><span>↗</span></div></div>`;
  card.querySelector('img').onerror=()=>card.classList.add('no-image');
  card.addEventListener('click',()=>{if(suppressClick)return;if(card._off===0)showProject(item);else goTo(idx)});
  track.appendChild(card);return card});
 function offsetOf(idx){let d=((idx-current)%n+n)%n;if(d>n/2)d-=n;return d}
 function layout(){
  cards.forEach((card,idx)=>{
   const off=offsetOf(idx),a=Math.abs(off),visible=a<=2;card._off=off;
   const pos=!visible?(off<0?'pos-hidden-left':'pos-hidden-right'):off===0?'pos-center is-active':off<0?`pos-left${a}`:`pos-right${a}`;
   card.className=card.className.replace(/\s*(pos-\S+|is-active)/g,'')+' '+pos;
   card.tabIndex=visible?0:-1;card.setAttribute('aria-hidden',visible?'false':'true');
   card.setAttribute('aria-label',`${items[idx].title}; ${off===0?'ver detalles':'seleccionar proyecto'}`)});
  counter.textContent=`${pad(current+1)} / ${pad(n)}`;
  dotButtons.forEach((b,i)=>{b.classList.toggle('active',i===current);b.setAttribute('aria-current',i===current?'true':'false')})}
 function goTo(i){if(i===current)return;shell.dataset.dir=offsetOf(i)>0?'next':'prev';current=i;layout()}
 function move(k){shell.dataset.dir=k>0?'next':'prev';current=(current+k+n)%n;layout()}
 shell.querySelector('[data-prev]').addEventListener('click',()=>move(-1));
 shell.querySelector('[data-next]').addEventListener('click',()=>move(1));
 dotButtons.forEach((b,i)=>b.addEventListener('click',()=>goTo(i)));
 /* Arrastre con ratón o dedo: el carrusel sigue el gesto y al soltar corre hacia ese lado. */
 let startX=0,lastX=0,dragging=false;
 track.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;startX=lastX=e.clientX;dragging=true;suppressClick=false;track.style.transition='none'});
 track.addEventListener('pointermove',e=>{if(!dragging)return;lastX=e.clientX;track.style.transform=`translateX(${Math.max(-90,Math.min(90,(lastX-startX)*.6))}px)`});
 function finishDrag(){if(!dragging)return;dragging=false;const dx=lastX-startX;track.style.transition='transform .45s cubic-bezier(.22,.8,.2,1)';track.style.transform='translateX(0)';if(Math.abs(dx)>42){suppressClick=true;move(dx<0?1:-1);setTimeout(()=>suppressClick=false,300)}}
 track.addEventListener('pointerup',finishDrag);track.addEventListener('pointercancel',finishDrag);
 track.addEventListener('pointerleave',finishDrag);
 shell.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}if(e.key==='ArrowRight'){e.preventDefault();move(1)}});
 layout()}
function renderLinks(){document.querySelector('#links').innerHTML=projectLinks.map((p,i)=>`<a class="linkcard" href="${safeUrl(p.url)}" target="_blank" rel="noopener noreferrer"><span class="num">${String(i+1).padStart(2,'0')}</span><span class="linkinfo"><strong>${esc(p.title)}</strong><span>${esc(p.type)} · ${esc(p.description)}</span></span><span class="arrow">↗</span></a>`).join('')}
function renderMedia(){const el=document.querySelector('#media');el.innerHTML=mediaProjects.map(m=>`<figure class="mediacard">${m.kind==='video'?`<video controls preload="metadata" playsinline><source src="${esc(m.src)}" type="video/mp4">Tu navegador no admite video.</video>`:`<img src="${esc(m.src)}" alt="${esc(m.title)}" loading="lazy">`}<figcaption>${esc(m.title)}<span>${esc(m.description)}</span></figcaption></figure>`).join('');el.querySelectorAll('img').forEach(img=>img.onerror=()=>img.outerHTML='<div class="mediaplace">✳</div>')}
document.querySelectorAll('[data-carousel="web"]').forEach(s=>renderCarousel(s,webProjects,'web'));
function renderGraphicGallery(){const gallery=document.querySelector('#graphicGallery');gallery.innerHTML=graphicProjects.map((item,i)=>`<button class="graphic-tile tile-${i%5+1}" type="button" aria-label="Ver ${esc(item.title)}"><span class="tile-number">${String(i+1).padStart(2,'0')}</span><img src="${esc(item.image)}" alt="${esc(item.title)}" loading="lazy"><span class="tile-placeholder"><b>${String(i+1).padStart(2,'0')}</b><small>AÑADE TU DISEÑO</small></span><span class="tile-caption"><strong>${esc(item.title)}</strong><small>${esc(item.type)}</small></span><span class="tile-open">↗</span></button>`).join('');gallery.querySelectorAll('.graphic-tile').forEach((tile,i)=>{const img=tile.querySelector('img');img.onerror=()=>tile.classList.add('no-image');tile.addEventListener('click',()=>showProject(graphicProjects[i]))})}
renderGraphicGallery();renderLinks();renderMedia();
document.querySelector('#closeViewer').onclick=()=>document.querySelector('#viewer').close();document.querySelector('#viewer').onclick=e=>{if(e.target.id==='viewer')e.currentTarget.close()};document.querySelector('#menuBtn').onclick=()=>document.querySelector('#nav').classList.toggle('open');document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>document.querySelector('#nav').classList.remove('open'));const encodedBody=encodeURIComponent(contactMessage),encodedSubject=encodeURIComponent(contactSubject);document.querySelector('#emailLink').href=`mailto:${contactEmail}?subject=${encodedSubject}&body=${encodedBody}`;document.querySelector('#gmailLink').href=`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}&su=${encodedSubject}&body=${encodedBody}`;document.querySelector('#outlookLink').href=`https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(contactEmail)}&subject=${encodedSubject}&body=${encodedBody}`;document.querySelector('#whatsappLink').href=`https://wa.me/${contactPhone}?text=${encodedBody}`;document.querySelector('#workanaLink').href=workanaUrl;document.querySelector('#year').textContent=new Date().getFullYear();window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('#progress').style.width=`${max>0?scrollY/max*100:0}%`});
// Partículas ambientales suaves, sin librerías externas.
(()=>{const canvas=document.querySelector('#particles'),ctx=canvas.getContext('2d');let w=0,h=0,particles=[],raf;const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;function resize(){const dpr=Math.min(window.devicePixelRatio||1,1.5);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);const count=Math.min(65,Math.floor(w*h/18000));particles=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.35,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,a:Math.random()*.28+.08,c:Math.random()>.55?'168,85,247':'34,211,238'}))}function draw(){ctx.clearRect(0,0,w,h);for(const q of particles){ctx.beginPath();ctx.fillStyle=`rgba(${q.c},${q.a})`;ctx.arc(q.x,q.y,q.r,0,Math.PI*2);ctx.fill();if(!reduce){q.x+=q.vx;q.y+=q.vy;if(q.x<-5)q.x=w+5;if(q.x>w+5)q.x=-5;if(q.y<-5)q.y=h+5;if(q.y>h+5)q.y=-5}}if(!reduce)raf=requestAnimationFrame(draw)}resize();draw();window.addEventListener('resize',()=>{cancelAnimationFrame(raf);resize();draw()},{passive:true})})();