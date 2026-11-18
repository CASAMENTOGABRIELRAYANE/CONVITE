let R={},P={};
const base=location.href.replace(/painel\.html.*$/,'index.html');
const est=g=>g.split(/,| e /).map(s=>s.trim()).filter(Boolean).reduce((s,p)=>s+(/fam[ií]lia/i.test(p)?2:1),0);
const num=g=>{const r=R[slug(g)];return r&&r.n?r.n:est(g)};
async function put(g,status,n){try{await Store.set('rsvp',slug(g),{name:g,status,n,ts:Date.now()});await load(true)}catch(e){alert('Não foi possível salvar. Tente de novo.')}}
async function load(force){if(!force&&document.activeElement&&document.activeElement.tagName==='INPUT')return;
 try{[R,P]=await Promise.all([Store.list('rsvp'),Store.list('gifts')])}catch(e){$('sum').textContent='Erro ao carregar. Confira o config.js.';return}
 let y=0,n=0,py=0,pt=0;
 $('tb').innerHTML=G.map(g=>{const r=R[slug(g)],k=num(g);pt+=est(g);if(r&&r.status==='yes'){y++;py+=k}if(r&&r.status==='no')n++;
  const t=r?(r.status==='yes'?'<span class="tag y">Confirmou</span>':'<span class="tag n">Não vai</span>'):'<span class="tag p">Aguardando</span>';
  return '<tr><td>'+g+'</td><td>'+t+'</td><td><input type="number" min="1" max="20" value="'+k+'" data-g="'+slug(g)+'" style="width:46px;font:16px serif"></td><td><button class="sm" data-a="yes" data-g="'+slug(g)+'">Confirmar</button> <button class="sm" data-a="no" data-g="'+slug(g)+'">Não vai</button> <button class="sm" data-a="del" data-g="'+slug(g)+'">Limpar</button> <button class="sm" data-l="'+base+'#'+slug(g)+'">Copiar link</button></td></tr>'}).join('');
 $('sum').innerHTML='<b>'+py+' pessoas confirmadas</b> ('+y+' convites) · '+n+' convites não vão · '+(G.length-y-n)+' aguardando · '+G.length+' convites, cerca de '+pt+' pessoas no total';
 const gl=GIFTS.filter(([id])=>P[id]).map(([id,t])=>t+' — '+P[id].name).join('; ');$('gs').textContent=gl?'Presentes marcados: '+gl:'Nenhum presente marcado ainda.'}
const byslug=s=>G.find(g=>slug(g)===s);
$('tb').onclick=async e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.l){navigator.clipboard&&navigator.clipboard.writeText(b.dataset.l);b.textContent='Copiado!';return}
 const g=byslug(b.dataset.g),inp=$('tb').querySelector('input[data-g="'+b.dataset.g+'"]'),k=parseInt(inp.value)||1;
 if(b.dataset.a==='del'){try{await Store.del('rsvp',slug(g));await load(true)}catch(x){alert('Não foi possível salvar.')}}else put(g,b.dataset.a,k)};
$('tb').onchange=e=>{const i=e.target;if(i.tagName!=='INPUT')return;const g=byslug(i.dataset.g),r=R[slug(g)];if(r)put(g,r.status,parseInt(i.value)||1)};
$('go').onclick=()=>{if($('pw').value===CONFIG.painelSenha){$('lock').hidden=true;$('app').hidden=false;load(true);setInterval(load,15000)}else $('pw').value=''};
