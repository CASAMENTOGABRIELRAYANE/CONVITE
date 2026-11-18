let R={},P={},playing=false;
const hash=()=>decodeURIComponent(location.hash.slice(1));
const guest=()=>G.find(n=>slug(n)===hash());
function setup(){const g=guest();renderGifts();
 $('cg').textContent=g||'';$('g2').textContent=g||'';$('rsvp').hidden=!g;
 $('cdate').textContent=CONFIG.dateText;$('dd').textContent=CONFIG.dateText;$('tt').textContent=CONFIG.timeText;status()}
function status(){const g=guest();if(!g)return;const r=R[slug(g)];
 $('rmsg').textContent=r?(r.status==='yes'?'Presença confirmada. Obrigado! ♥':'Registramos que você não poderá ir. Sentiremos sua falta.'):''}
function tick(){const d=new Date(CONFIG.dateISO)-Date.now();if(d<0)return;$('cdw').hidden=false;
 $('c1').textContent=Math.floor(d/864e5);$('c2').textContent=Math.floor(d/36e5)%24;$('c3').textContent=Math.floor(d/6e4)%60;$('c4').textContent=Math.floor(d/1e3)%60}
setInterval(tick,1000);tick();
function play(){if(!$('yt').src)$('yt').src='https://www.youtube.com/embed/'+CONFIG.musicId+'?autoplay=1&loop=1&playlist='+CONFIG.musicId;playing=true;$('music').textContent='♪'}
function stop(){$('yt').removeAttribute('src');playing=false;$('music').textContent='▷'}
$('music').onclick=()=>playing?stop():play();
$('open').onclick=()=>{$('cover').classList.add('hide');play()};
function renderGifts(){const g=guest();$('gifts').hidden=!g;if(!g)return;const me=slug(g);
 $('gl').innerHTML=GIFTS.filter(([id])=>!P[id]||P[id].by===me).map(([id,n])=>P[id]?'<li class="m">✓ '+n+'<button class="sm" data-u="'+id+'">Desmarcar</button></li>':'<li>'+n+'<button class="sm" data-c="'+id+'">Vou levar</button></li>').join('')}
async function refresh(){try{[R,P]=await Promise.all([Store.list('rsvp'),Store.list('gifts')]);status();renderGifts()}catch(e){}}
async function save(s){const g=guest();if(!g)return;try{await Store.set('rsvp',slug(g),{name:g,status:s,ts:Date.now()});R[slug(g)]={status:s};status()}catch(e){$('rmsg').textContent='Não foi possível registrar agora. Tente novamente.'}}
$('yes').onclick=()=>save('yes');$('no').onclick=()=>save('no');
$('gl').onclick=async e=>{const b=e.target.closest('button');if(!b)return;const g=guest();if(!g)return;const me=slug(g);
 try{if(b.dataset.c){const s=await Store.get('gifts',b.dataset.c);if(s&&s.by!==me){$('gmsg').textContent='Esse item acabou de ser marcado por outra pessoa.';await refresh();return}
   await Store.set('gifts',b.dataset.c,{by:me,name:g,ts:Date.now()});$('gmsg').textContent='Obrigado! ♥'}
  else{const s=await Store.get('gifts',b.dataset.u);if(s&&s.by===me)await Store.del('gifts',b.dataset.u);$('gmsg').textContent=''}
  await refresh()}catch(x){$('gmsg').textContent='Não foi possível registrar agora. Tente novamente.'}};
window.addEventListener('hashchange',setup);setup();refresh();setInterval(refresh,20000);
