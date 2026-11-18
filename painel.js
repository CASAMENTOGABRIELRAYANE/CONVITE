let R={},P={};
const base=location.href.replace(/painel\.html.*$/,'index.html');
async function load(){try{[R,P]=await Promise.all([Store.list('rsvp'),Store.list('gifts')])}catch(e){$('sum').textContent='Erro ao carregar. Confira o config.js.';return}
 let y=0,n=0;$('tb').innerHTML=G.map(g=>{const r=R[slug(g)];if(r&&r.status==='yes')y++;if(r&&r.status==='no')n++;
  const t=r?(r.status==='yes'?'<span class="tag y">Confirmou</span>':'<span class="tag n">Não vai</span>'):'<span class="tag p">Aguardando</span>';
  return '<tr><td>'+g+'</td><td>'+t+'</td><td><button class="sm" data-l="'+base+'#'+slug(g)+'">Copiar link</button></td></tr>'}).join('');
 $('sum').textContent=y+' confirmaram · '+n+' não poderão ir · '+(G.length-y-n)+' aguardando (de '+G.length+' convites)';
 const gl=GIFTS.filter(([id])=>P[id]).map(([id,t])=>t+' — '+P[id].name).join('; ');$('gs').textContent=gl?'Presentes marcados: '+gl:'Nenhum presente marcado ainda.';
 $('tb').querySelectorAll('button').forEach(b=>b.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(b.dataset.l);b.textContent='Copiado!'})}
$('go').onclick=()=>{if($('pw').value===CONFIG.painelSenha){$('lock').hidden=true;$('app').hidden=false;load();setInterval(load,15000)}else $('pw').value=''};
