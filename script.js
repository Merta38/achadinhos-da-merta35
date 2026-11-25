const grid=document.getElementById("grid"),search=document.getElementById("search"),count=document.getElementById("count"),empty=document.getElementById("empty"),buttons=[...document.querySelectorAll(".filters button")];let active="Todos";
function safe(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

function produtoEstaCadastrado(p){
  const nome = String(p.nome || "").trim();
  const imagem = String(p.imagem || "").trim();
  const link = String(p.link || "").trim();

  const nomeModelo = /^nome do produto\s*\d*$/i.test(nome);
  const imagemModelo = /(?:^|\/)produto-\d+\.(?:webp|png|jpe?g)$/i.test(imagem);
  const linkModelo = !/^https?:\/\//i.test(link) || /COLE-SEU-LINK-AQUI/i.test(link);

  return nome !== "" && !nomeModelo &&
         imagem !== "" && !imagemModelo &&
         !linkModelo;
}

function render(){let q=search.value.trim().toLocaleLowerCase("pt-BR");let list=produtos.filter(p=>produtoEstaCadastrado(p)&&(active==="Todos"||p.categoria===active)&&(`${p.nome} ${p.categoria} ${p.descricao} ${p.loja}`).toLocaleLowerCase("pt-BR").includes(q));count.textContent=list.length+" produto(s)";empty.hidden=list.length>0;grid.innerHTML=list.map(p=>{let ok=/^https?:\/\//i.test(p.link);return `<article class="card"><div class="photo"><span class="tag">${safe(p.loja)}</span><img src="${safe(p.imagem)}" alt="${safe(p.nome)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="fallback" style="display:none">🛍️</span></div><div class="info"><span class="category">${safe(p.categoria)}</span><h3>${safe(p.nome)}</h3><p>${safe(p.descricao)}</p><a class="offer" href="${ok?safe(p.link):"#"}" ${ok?'target="_blank" rel="sponsored nofollow noopener"':'onclick="alert(\'Adicione seu link de afiliado em produtos.js.\');return false;"'}>VER OFERTA ↗</a></div></article>`}).join("");}
buttons.forEach(b=>b.addEventListener("click",()=>{active=b.dataset.cat;buttons.forEach(x=>x.classList.toggle("active",x===b));render()}));search.addEventListener("input",render);document.getElementById("clear").addEventListener("click",()=>{search.value="";active="Todos";buttons.forEach(x=>x.classList.toggle("active",x.dataset.cat==="Todos"));render()});document.getElementById("year").textContent=new Date().getFullYear();render();