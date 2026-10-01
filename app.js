/* D'BUCO · loja (camisetas → WhatsApp) e Folha (jornal da marca) */

/* O número do WhatsApp fica em js/config.js */
const WHATSAPP = (window.SITE_CONFIG||{}).whatsapp || "";

const SHAPES = {
  tee:(c,p)=>`<svg viewBox="0 0 200 220"><path d="M62 18 L34 30 L6 62 L30 86 L46 72 L46 208 L154 208 L154 72 L170 86 L194 62 L166 30 L138 18 C132 32 118 40 100 40 C82 40 68 32 62 18 Z" fill="${c}"/><path d="M62 18 C68 32 82 40 100 40 C118 40 132 32 138 18" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="3"/>${p}</svg>`,
  hoodie:(c,p)=>`<svg viewBox="0 0 200 230"><path d="M70 14 C70 4 130 4 130 14 L164 30 C180 40 190 70 194 150 L172 154 L160 92 L160 214 L40 214 L40 92 L28 154 L6 150 C10 70 20 40 36 30 Z" fill="${c}"/><path d="M76 16 C80 46 120 46 124 16" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="3"/><path d="M92 44 L90 74 M108 44 L110 74" stroke="rgba(255,255,255,.55)" stroke-width="2"/><path d="M62 160 H138 V196 H62 Z" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="2.5"/>${p}</svg>`,
  jacket:(c,p)=>`<svg viewBox="0 0 200 230"><path d="M72 12 L128 12 L166 30 C182 42 190 72 194 150 L172 154 L160 92 L160 214 L40 214 L40 92 L28 154 L6 150 C10 72 18 42 34 30 Z" fill="${c}"/><path d="M100 22 V214" stroke="rgba(0,0,0,.35)" stroke-width="3"/><path d="M72 12 L100 30 L128 12" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="3"/><path d="M40 120 H160" stroke="rgba(255,255,255,.18)" stroke-width="14"/>${p}</svg>`,
  shorts:(c,p)=>`<svg viewBox="0 0 200 200"><path d="M36 30 H164 L184 168 L112 176 L100 96 L88 176 L16 168 Z" fill="${c}"/><path d="M36 30 H164 V46 H36 Z" fill="rgba(0,0,0,.2)"/><path d="M96 46 V60" stroke="rgba(255,255,255,.5)" stroke-width="2"/>${p}</svg>`,
  cap:(c,p)=>`<svg viewBox="0 0 200 160"><path d="M40 104 C36 44 72 22 104 22 C144 22 168 54 166 104 Z" fill="${c}"/><path d="M40 104 C70 96 130 96 166 104 C178 108 196 118 194 128 C160 120 80 116 34 118 Z" fill="${c}" stroke="rgba(0,0,0,.3)" stroke-width="2"/><circle cx="104" cy="24" r="5" fill="rgba(0,0,0,.35)"/>${p}</svg>`
};
const leaf=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 22 C-2 12 3 3 13 0 C15 10 10 19 0 22Z" fill="#1d4fa8"/><path d="M1 17 C5 13 9 11 14 9 L14 13 C9 14 5 16 1 20Z" fill="#f5c400"/><path d="M1 20 C5 16 9 14 14 13 L13 16 C8 17 4 19 1 22Z" fill="#00913a"/></g>`;
const word=(t,x,y,col,size=11)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Archivo,sans-serif" font-stretch="125%" font-weight="700" font-size="${size}" letter-spacing="1" fill="${col}">${t}</text>`;

const PRODUCTS = [
  {id:"tee-psv",name:"Camiseta Pernambuco se veste",price:129,color:"#0d0d0d",tag:"Mais pedida",
   desc:"Preta, algodão 30.1 penteado e modelagem oversized. Folha bordada no peito e a frase da marca em silk nas costas.",print:leaf(118,62,1.1)+word("PERNAMBUCO",100,128,"#e9e9e9",12)+word("SE VESTE",100,144,"#e9e9e9",12)},
  {id:"tee-frevo",name:"Camiseta Frevo",price:119,color:"#111111",tag:"Novo",
   desc:"Sombrinha de frevo em silk nas cores da bandeira, desenhada em gomos. Algodão pesado e gola canelada reforçada.",print:`<g transform="translate(100 120)"><path d="M-30 0 A30 30 0 0 1 30 0Z" fill="#1d4fa8"/><path d="M-30 0 A30 30 0 0 1 -10 -28 L0 0Z" fill="#d42b1f"/><path d="M10 -28 A30 30 0 0 1 30 0 L0 0Z" fill="#f5c400"/><path d="M-10 -28 A30 30 0 0 1 10 -28 L0 0Z" fill="#00913a"/><path d="M0 0 V34" stroke="#eee" stroke-width="3"/></g>`},
  {id:"tee-marcozero",name:"Camiseta Marco Zero",price:119,color:"#ecebe6",
   desc:"Off-white com a rosa dos ventos do Marco Zero em traço fino. Algodão pesado e toque macio.",print:`<g transform="translate(100 112)" stroke="#111" stroke-width="2" fill="none"><circle r="22"/><path d="M0 -30 L5 0 L0 30 L-5 0Z M-30 0 L0 -5 L30 0 L0 5Z"/></g>`},
  {id:"tee-mangue",name:"Camiseta Manguebeat",price:129,color:"#1d4fa8",
   desc:"Azul da bandeira com a antena parabólica fincada na lama, homenagem a Chico Science e Nação Zumbi.",print:`<g transform="translate(100 118)" stroke="#fff" stroke-width="3" fill="none"><path d="M-24 -6 A26 26 0 0 0 24 -6"/><path d="M0 8 V34 M-14 34 H14"/><circle cy="-14" r="3" fill="#fff"/></g>`},
  {id:"tee-maracatu",name:"Camiseta Maracatu",price:129,color:"#6e1410",
   desc:"Bordô com a cabeleira do caboclo de lança em fitas coloridas. Estampa em silk com toque zero.",print:`<g transform="translate(100 108)">${[["#1d4fa8",-24],["#f5c400",-12],["#00913a",0],["#ffffff",12],["#d42b1f",24]].map(([c,x])=>`<path d="M0 -20 Q${x} 10 ${x*1.4} 44" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`).join("")}</g>`},
  {id:"tee-capibaribe",name:"Camiseta Capibaribe",price:119,color:"#3a3a3a",
   desc:"Grafite com as ondas do Capibaribe em bordado tom sobre tom.",print:`<g stroke="#5c5c5c" stroke-width="3" fill="none"><path d="M60 118 q10 -8 20 0 t20 0 t20 0 t20 0"/><path d="M60 132 q10 -8 20 0 t20 0 t20 0 t20 0"/><path d="M60 146 q10 -8 20 0 t20 0 t20 0 t20 0"/></g>`},
  {id:"tee-olinda",name:"Camiseta Olinda",price:119,color:"#f7f7f5",tag:"Tiragem limitada",
   desc:"Branca, com as ladeiras e casarios de Olinda em linha contínua. Feita em tiragem pequena.",print:`<path d="M58 140 L70 140 L70 120 L80 112 L90 120 L90 140 L100 140 L100 108 L112 98 L124 108 L124 140 L142 140" stroke="#111" stroke-width="2.5" fill="none"/>`},
  {id:"tee-leao",name:"Camiseta Leão do Norte",price:129,color:"#d9a900",
   desc:"Amarelo ouro com o leão do Norte em traço preto. Uma das cores da bandeira virando peça inteira.",print:word("LEÃO DO NORTE",100,126,"#111",11)+leaf(92,82,1)},
].map(p=>({...p,cat:"Camisetas",shape:"tee",sizes:["P","M","G","GG","XG"]}));

const fmt=n=>"R$ "+n.toLocaleString("pt-BR");
const $=s=>document.querySelector(s);
const wa=t=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
const art=p=>SHAPES[p.shape](p.color,p.print||"");

["#waGeneral","#waFoot","#waFab"].forEach(id=>$(id).href=wa("Oi, D'BUCO! Vim pelo site e queria saber mais sobre as peças."));

/* ----- grade ----- */
function renderGrid(){
  $("#countLine").textContent=PRODUCTS.length+" camisetas";
  $("#grid").innerHTML=PRODUCTS.map(p=>`
    <button class="card" data-id="${p.id}" aria-label="${p.name}, ${fmt(p.price)}">
      <div class="ph">${p.tag?`<span class="tag">${p.tag}</span>`:""}${art(p)}</div>
      <div class="meta"><span>${p.name}</span><span>${fmt(p.price)}</span></div>
      <div class="sub">${p.sizes.join(" ")}</div>
    </button>`).join("");
}
$("#grid").addEventListener("click",e=>{const c=e.target.closest(".card");if(c)openModal(c.dataset.id);});

/* ----- modal ----- */
let active=null,size=null,lastFocus=null;
function openModal(id){
  active=PRODUCTS.find(p=>p.id===id);size=active.sizes.length===1?active.sizes[0]:null;lastFocus=document.activeElement;
  $("#mImg").innerHTML=art(active);$("#mTitle").textContent=active.name;$("#mPrice").textContent=fmt(active.price);
  $("#mDesc").textContent=active.desc;$("#mHint").textContent="";
  renderSizes();show("#modal");$("#mClose").focus();
}
function renderSizes(){
  $("#mSizes").innerHTML=active.sizes.map(s=>`<button aria-pressed="${s===size}" data-s="${s}">${s}</button>`).join("");
}
$("#mSizes").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;size=b.dataset.s;$("#mHint").textContent="";renderSizes();});
function needSize(){if(!size){$("#mHint").textContent="Selecione um tamanho para continuar.";return true}return false}
$("#mAdd").onclick=()=>{if(needSize())return;addToBag(active,size);hideAll();toast(`${active.name} (${size}) adicionada à lista`);};
$("#mWa").onclick=()=>{if(needSize())return;
  window.open(wa(`Oi, D'BUCO! Quero pedir:\n• ${active.name}, tamanho ${size}, ${fmt(active.price)}\n\nPode me passar as formas de pagamento e entrega?`),"_blank","noopener");};

/* ----- lista ----- */
let bag=[];
try{bag=JSON.parse(localStorage.getItem("pe-lista")||"[]")}catch(e){bag=[]}
const save=()=>{try{localStorage.setItem("pe-lista",JSON.stringify(bag))}catch(e){}};
function addToBag(p,s){const f=bag.find(i=>i.id===p.id&&i.s===s);f?f.q++:bag.push({id:p.id,s,q:1});save();renderBag();}
function renderBag(){
  const n=bag.reduce((a,i)=>a+i.q,0);$("#bagCount").textContent=n;
  if(!bag.length){$("#bagList").innerHTML=`<li class="empty-bag" style="display:block;border:0">Sua lista está vazia. Abra uma peça da coleção e adicione o tamanho que você quer.</li>`;}
  else $("#bagList").innerHTML=bag.map((i,k)=>{const p=PRODUCTS.find(x=>x.id===i.id);return `<li><div class="mini">${art(p)}</div><div>${p.name}<small>Tamanho ${i.s} · ${i.q} un.</small><small>${fmt(p.price*i.q)}</small></div><button data-k="${k}">Remover</button></li>`}).join("");
  $("#bagTotal").textContent=fmt(bag.reduce((a,i)=>a+PRODUCTS.find(x=>x.id===i.id).price*i.q,0));
  $("#sendBag").disabled=!bag.length;$("#sendBag").style.opacity=bag.length?1:.4;
}
$("#bagList").addEventListener("click",e=>{const b=e.target.closest("button[data-k]");if(!b)return;bag.splice(+b.dataset.k,1);save();renderBag();});
$("#sendBag").onclick=()=>{if(!bag.length)return;
  const lines=bag.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id);return `• ${i.q}x ${p.name}, tamanho ${i.s}, ${fmt(p.price*i.q)}`});
  const tot=bag.reduce((a,i)=>a+PRODUCTS.find(x=>x.id===i.id).price*i.q,0);
  window.open(wa(`Oi, D'BUCO! Montei minha lista no site:\n${lines.join("\n")}\n\nTotal: ${fmt(tot)}\nComo faço pra pagar e receber?`),"_blank","noopener");};
$("#openBag").onclick=()=>{lastFocus=document.activeElement;show("#drawer");$("#dClose").focus();};

/* ----- utilidades ----- */
function show(sel){$("#overlay").classList.add("on");$(sel).classList.add("on");document.body.style.overflow="hidden";}
function hideAll(){["#overlay","#modal","#drawer"].forEach(s=>$(s).classList.remove("on"));document.body.style.overflow="";lastFocus&&lastFocus.focus&&lastFocus.focus();}
$("#overlay").onclick=hideAll;$("#mClose").onclick=hideAll;$("#dClose").onclick=hideAll;
document.addEventListener("keydown",e=>{if(e.key==="Escape"){if($("#composer").classList.contains("on"))closeComposer();else hideAll();}});
let tt;function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),2400);}

renderGrid();renderBag();

/* ===================== FOLHA (jornal da marca) ===================== */
const KINDS=[
  {k:"peca",label:"Peça",color:"#1d4fa8"},
  {k:"colecao",label:"Coleção",color:"#d42b1f"},
  {k:"processo",label:"Processo",color:"#f5c400"},
  {k:"ideia",label:"Ideia",color:"#00913a"},
  {k:"livre",label:"Livre",color:"#8a8a8a"}];
const FORMATS=[
  {f:"texto",label:"Texto",hint:"Leitura corrida, foto ao lado",ico:'<i style="left:10%;top:22%;width:44%;height:5px"></i><i style="left:10%;top:42%;width:40%;height:3px;opacity:.4"></i><i style="left:10%;top:58%;width:40%;height:3px;opacity:.4"></i><i style="right:10%;top:18%;width:28%;height:64%;opacity:.25"></i>'},
  {f:"manchete",label:"Manchete",hint:"Título gigante, texto em colunas",ico:'<i style="left:8%;top:16%;width:84%;height:14px"></i><i style="left:8%;top:56%;width:38%;height:3px;opacity:.4"></i><i style="left:54%;top:56%;width:38%;height:3px;opacity:.4"></i><i style="left:8%;top:70%;width:38%;height:3px;opacity:.4"></i><i style="left:54%;top:70%;width:38%;height:3px;opacity:.4"></i>'},
  {f:"citacao",label:"Citação",hint:"Uma frase em destaque, centralizada",ico:'<i style="left:25%;top:28%;width:50%;height:7px"></i><i style="left:32%;top:48%;width:36%;height:7px"></i><i style="left:40%;top:72%;width:20%;height:3px;opacity:.4"></i>'}];
const kindOf=k=>KINDS.find(x=>x.k===k)||KINDS[4];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const paras=t=>String(t||"").split(/\n\s*\n|\n/).map(p=>p.trim()).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join("");
const dateBR=ms=>new Date(ms).toLocaleDateString("pt-BR",{day:"numeric",month:"long",year:"numeric"});

let BE=null,me=null,posts=[],jrFilter="todos",openId=null;
const ADMINS=((window.SITE_CONFIG||{}).admins||[]).map(e=>e.toLowerCase());
const isAdmin=()=>!!(me&&me.email&&ADMINS.includes(me.email.toLowerCase()));
$("#jrEdition").textContent="Edição de "+new Date().toLocaleDateString("pt-BR",{day:"numeric",month:"long"});

function renderJrFilters(){
  const opts=[{k:"todos",label:"Tudo"},...KINDS];
  $("#jrFilters").innerHTML=opts.map(o=>`<button aria-pressed="${o.k===jrFilter}" data-k="${o.k}">${o.label}</button>`).join("");
}
$("#jrFilters").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;jrFilter=b.dataset.k;renderJrFilters();renderFeed();});

function byline(p){return p.signature||p.authorName||"Alguém da galera";}
function picHTML(p,feature){
  if(p.image)return `<div class="pic"><img src="${esc(p.image)}" alt="" loading="lazy"></div>`;
  const t=String(p.body||"").split(/(?<=[.!?])\s/)[0].slice(0,110);
  return `<div class="pic q"><span class="word">“${esc(t)}”</span></div>`;
}
function renderFeed(){
  const list=posts.filter(p=>jrFilter==="todos"||p.kind===jrFilter);
  if(BE===null){$("#feed").innerHTML=`<div class="jr-empty"><strong>Carregando a Folha…</strong></div>`;return;}
  if(BE.mode==="offline"){$("#feed").innerHTML=`<div class="jr-empty"><strong>A Folha não carregou</strong>Verifique a internet e recarregue a página. Se continuar, confira os dados do Firebase em js/config.js.</div>`;return;}
  if(!list.length){$("#feed").innerHTML=`<div class="jr-empty"><strong>${posts.length?"Nada nesse assunto ainda":"A Folha está esperando a primeira página"}</strong>${posts.length?"Escolha Tudo para ver todas as publicações, ou escreva a primeira sobre esse tema.":"Toque em Escrever na Folha e conte a história de uma camisa."}</div>`;return;}
  $("#feed").innerHTML=list.map((p,i)=>{const k=kindOf(p.kind),feat=i===0&&jrFilter==="todos";
    const prod=p.piece&&PRODUCTS.find(x=>x.id===p.piece);
    return `<button class="post ${feat?"feature":""}" data-id="${esc(p.id)}">
      ${picHTML(p,feat)}
      <div style="display:grid;gap:10px">
        <span class="kind"><i style="background:${k.color}"></i>${k.label}${prod?` · ${esc(prod.name)}`:""}</span>
        <h2>${esc(p.title)}</h2>
        <span class="ex">${esc(String(p.body||"").slice(0,240))}</span>
        <span class="by">${esc(byline(p))}, ${dateBR(p.createdAt)}</span>
      </div></button>`}).join("");
}
$("#feed").addEventListener("click",e=>{const b=e.target.closest(".post");if(b)location.hash="#/folha/"+b.dataset.id;});

function renderArticle(){
  const p=posts.find(x=>x.id===openId);
  const el=$("#jrArticle");
  if(!p){el.innerHTML=`<button class="back" data-back>Voltar à Folha</button><div class="jr-empty"><strong>Publicação não encontrada</strong>Ela pode ter sido apagada. Volte à Folha para ver as outras.</div>`;return;}
  const k=kindOf(p.kind),prod=p.piece&&PRODUCTS.find(x=>x.id===p.piece);
  const fig=p.image?`<figure class="fig"><img src="${esc(p.image)}" alt=""></figure>`:"";
  const head=`<header><span class="kind"><i style="background:${k.color}"></i>${k.label}</span><h1>${esc(p.title)}</h1>
    <div class="meta"><span>Por ${esc(byline(p))}</span><span>${dateBR(p.createdAt)}</span>${prod?`<span>Sobre a ${esc(prod.name)}</span>`:""}</div></header>`;
  let inner;
  if(p.layout==="texto") inner=head+`<div class="wrap-t"><div class="body">${paras(p.body)}</div>${fig}</div>`;
  else if(p.layout==="citacao") inner=head+fig+`<div class="body">${paras(p.body)}</div>`;
  else inner=fig+head+`<div class="body">${paras(p.body)}</div>`;
  const own=!!(me&&p.authorId===me.id),mine=own||isAdmin();
  el.className="art l-"+(p.layout||"manchete");
  el.innerHTML=`<button class="back" data-back>Voltar à Folha</button>${inner}
    <div class="art-foot">${prod?`<button class="btn btn-solid" data-prod="${prod.id}">Ver a ${esc(prod.name)}</button>`:"<span></span>"}
    ${mine?`<span style="display:flex;gap:18px">${own?`<button class="link-btn" data-edit>Editar</button>`:""}<button class="link-btn danger" data-del>Apagar publicação</button></span>`:""}</div>`;
}
$("#jrArticle").addEventListener("click",async e=>{
  if(e.target.closest("[data-back]"))location.hash="#/folha";
  const pr=e.target.closest("[data-prod]");if(pr)openModal(pr.dataset.prod);
  if(e.target.closest("[data-edit]"))openComposer(posts.find(x=>x.id===openId));
  if(e.target.closest("[data-del]")){
    if(!confirm("Apagar esta publicação da Folha? Não dá pra desfazer."))return;
    try{await BE.remove(openId);location.hash="#/folha";toast("Publicação apagada");}
    catch(err){toast("Não foi possível apagar. Tente de novo em instantes.");}
  }
});

/* ----- compositor ----- */
let draft={};
function openComposer(edit){
  draft=edit?{...edit}:{kind:"peca",layout:"manchete",piece:"",image:"",title:"",body:"",signature:""};
  $("#compTitle").textContent=edit?"Editar publicação":"Nova publicação";
  $("#cPublish").textContent=edit?"Salvar alterações":"Publicar na Folha";
  $("#cTitle").value=draft.title;$("#cBody").value=draft.body;$("#cSign").value=draft.signature||"";$("#cPiece").value=draft.piece||"";
  $("#cStatus").textContent="";$("#cStatus").className="status";$("#cFile").value="";
  renderComp();lastFocus=document.activeElement;
  $("#composer").classList.add("on");document.body.style.overflow="hidden";setTimeout(()=>$("#cTitle").focus(),50);
}
function closeComposer(){$("#composer").classList.remove("on");document.body.style.overflow="";lastFocus&&lastFocus.focus&&lastFocus.focus();}
function renderComp(){
  $("#cKinds").innerHTML=KINDS.map(k=>`<button aria-pressed="${k.k===draft.kind}" data-k="${k.k}">${k.label}</button>`).join("");
  $("#cFormats").innerHTML=FORMATS.map(f=>`<button aria-pressed="${f.f===draft.layout}" data-f="${f.f}"><div class="fmt-ico">${f.ico}</div><strong>${f.label}</strong><small>${f.hint}</small></button>`).join("");
  $("#cPhotoInfo").innerHTML=draft.image?`<img src="${esc(draft.image)}" alt="">`:"Toque para escolher uma foto do celular ou do computador";
  if(draft.image)$("#cPhotoInfo").insertAdjacentHTML("beforeend","");
  $("#cPhotoRemove").hidden=!draft.image;
}
$("#cPiece").innerHTML+=PRODUCTS.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join("");
$("#cKinds").addEventListener("click",e=>{const b=e.target.closest("button");if(b){draft.kind=b.dataset.k;renderComp();}});
$("#cFormats").addEventListener("click",e=>{const b=e.target.closest("button");if(b){draft.layout=b.dataset.f;renderComp();}});
$("#cPhotoRemove").onclick=()=>{draft.image="";renderComp();};
$("#cClose").onclick=closeComposer;
$("#cFile").addEventListener("change",async e=>{
  const f=e.target.files[0];if(!f)return;
  $("#cStatus").className="status";$("#cStatus").textContent="Preparando a foto…";
  try{draft.image=await shrink(f);$("#cStatus").textContent="";renderComp();}
  catch(err){$("#cStatus").className="status err";$("#cStatus").textContent="Essa foto não abriu. Tente outra em JPG ou PNG.";}
});
function shrink(file){return new Promise((res,rej)=>{
  const img=new Image(),url=URL.createObjectURL(file);
  img.onload=()=>{let max=1100,q=.78,out;
    for(let i=0;i<8;i++){const sc=Math.min(1,max/Math.max(img.width,img.height));
      const c=document.createElement("canvas");c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);
      c.getContext("2d").drawImage(img,0,0,c.width,c.height);out=c.toDataURL("image/jpeg",q);
      if(out.length<190000)break;max*=.82;q=Math.max(.5,q-.06);}
    URL.revokeObjectURL(url);res(out);};
  img.onerror=()=>{URL.revokeObjectURL(url);rej();};img.src=url;});}
$("#cPublish").onclick=async()=>{
  const title=$("#cTitle").value.trim(),body=$("#cBody").value.trim();
  const st=$("#cStatus");st.className="status err";
  if(!title){st.textContent="Dê um título para a publicação.";$("#cTitle").focus();return;}
  if(!body){st.textContent="Escreva o texto da publicação.";$("#cBody").focus();return;}
  const data={title,body,kind:draft.kind,layout:draft.layout,piece:$("#cPiece").value,image:draft.image||"",
    signature:$("#cSign").value.trim(),authorId:draft.authorId||me.id,authorName:draft.authorName||me.name||"",createdAt:draft.createdAt||Date.now()};
  if(draft.id)data.editedAt=Date.now();
  st.className="status";st.textContent=draft.id?"Salvando…":"Publicando…";$("#cPublish").disabled=true;
  try{
    const id=draft.id||BE.newId();
    await BE.save(id,data);
    closeComposer();toast(draft.id?"Alterações salvas":"Publicado na Folha");location.hash="#/folha/"+id;
  }catch(err){
    st.className="status err";
    const c=err&&err.code||"";
    st.textContent=c==="permission-denied"?"O banco recusou a publicação. Entre de novo com sua conta Google e tente outra vez.":
      c==="quota"||c==="resource-exhausted"?"Não coube. Tente com uma foto menor ou apague publicações antigas.":
      "Não foi possível publicar agora. Verifique a internet e tente de novo.";
  }finally{$("#cPublish").disabled=false;}
};
$("#jrWrite").onclick=async()=>{if(me)return openComposer(null);try{await BE.login();if(me)openComposer(null);}catch(e){if(e&&e.code!=="auth/popup-closed-by-user")toast("Não foi possível entrar. Tente de novo.");}};
$("#jrLogout").onclick=()=>BE.logout();

/* ----- conexão com o banco ----- */
function renderMe(){
  $("#jrWrite").textContent=me||(BE&&BE.mode==="teste")?"Escrever na Folha":"Entrar com Google para escrever";
  $("#jrNote").textContent=me?`Você entrou como ${me.name||me.email||"autor"}.`:(BE&&BE.mode==="teste"?"Modo teste: as publicações ficam só neste navegador.":"Para publicar, entre com sua conta Google. Ler é livre.");
  $("#jrLogout").hidden=!me||(BE&&BE.mode==="teste");
}
window.FOLHA_BACKEND.then(be=>{
  BE=be;
  if(be.mode==="offline"){renderFeed();return;}
  $("#jrWrite").hidden=false;
  be.onUser(u=>{me=u;renderMe();if(openId)renderArticle();});
  renderMe();
  be.subscribe(list=>{posts=list;renderFeed();if(openId)renderArticle();},
    ()=>{BE={mode:"offline"};renderFeed();});
});

/* ----- rotas ----- */
function route(){
  const h=location.hash;
  const isJ=h.startsWith("#/folha");
  $("#inicio").hidden=isJ;$("#jornal").hidden=!isJ;
  document.querySelectorAll(".nav a").forEach(a=>a.removeAttribute("aria-current"));
  if(isJ){
    $("#navFolha").setAttribute("aria-current","page");
    const m=h.match(/^#\/folha\/(.+)$/);openId=m?decodeURIComponent(m[1]):null;
    $("#jrList").hidden=!!openId;$("#jrArticle").hidden=!openId;
    if(openId)renderArticle();else renderFeed();
    window.scrollTo(0,0);document.title=openId?((posts.find(p=>p.id===openId)||{}).title||"Folha")+" · Folha D'BUCO":"Folha · O jornal da D'BUCO";
  }else{
    document.title="D'BUCO · Pernambuco se veste";
    const t=h&&h.length>1&&document.getElementById(h.slice(1));
    if(t)requestAnimationFrame(()=>t.scrollIntoView());else window.scrollTo(0,0);
  }
}
window.addEventListener("hashchange",route);
renderJrFilters();route();
