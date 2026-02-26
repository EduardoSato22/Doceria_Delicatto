const WA = '5535997360026';

const produtos = [
  { id:1, nome:'Kinder',              desc:'Recheio suculento com creme de Kinder e pedaços de chocolate.',                            peso:'350g', preco:84.90,  img:'./images/thumb/kinder.jpg',        imgFull:'./images/kinder.jpg',        dest:'🔥 Mais Pedido' },
  { id:2, nome:'Ninho com Nutella',   desc:'Recheio suculento com creme de Ninho e Nutella e docinhos de Ninho.',                                 peso:'350g', preco:69.90,  img:'./images/thumb/ninho_nutella.jpg', imgFull:'./images/ninho_nutella.jpg', dest:null },
  { id:3, nome:'Brigadeiro c/ Maracujá', desc:'Recheio suculento com creme de brigadeiro e mousse de maracujá.',                       peso:'350g', preco:69.90,  img:'./images/thumb/brig_maracuja.jpg', imgFull:'./images/brig_maracuja.jpg', dest:null },
  { id:4, nome:'Ferrero Rocher',      desc:'Recheio suculento com creme de ferrero e pedaços de castanhas e amendoim.',                                  peso:'350g', preco:84.90,  img:'./images/thumb/ferrero.jpg',       imgFull:'./images/ferrero.jpg',       dest:'⭐ Premium' },
  { id:5, nome:'Infantil',            desc:'Recheio suculento de brigadeiro ou ninho com guloseimas.',                      peso:'350g', preco:59.90,  img:'./images/thumb/infantil.jpg',      imgFull:'./images/infantil.jpg',      dest:'👧 Kids' },
  { id:6, nome:'Kit Degustação',      desc:'Brigadeiro, Maracujá, Oreo, ferrero e Ninho com Nutella.',                      peso:'200g', preco:34.90,  img:'./images/thumb/kit.jpg',           imgFull:'./images/kit.jpg',           dest:'🎁 Kit' },
  { id:7, nome:'Ovo Fatia',           desc:'Ferrero Rocher, Ninho com Nutella, Brigadeiro, Ninho com geleia de frutas vermelhas, Dois amores e Prestigio.', peso:'750g', preco:119.90, img:'./images/thumb/fatia.jpg',         imgFull:'./images/fatia.jpg',         dest:'✨ Especial' },
  { id:8, nome:'Barra de Chocolate',  desc:'Chocolate com castanhas, Oreo, chocolate branco com castanhas.',                        peso:'200g', preco:19.90,  img:'./images/thumb/barra.jpg',         imgFull:'./images/barra.jpg',         dest:null },
  { id:9, nome:'Trufado Ferrero',     desc:'Delicioso ovo trufado com recheio de Ferrero Rocher.', peso:'500g', preco:69.90, img:'./images/Ferrero-Trufado.jpeg', imgFull:'./images/Ferrero-Trufado.jpeg', dest:null },
  { id:10, nome:'Trufado Prestígio',  desc:'Delicioso ovo trufado com recheio de Prestígio.', peso:'500g', preco:69.90, img:'./images/Prestigio-Trufado.jpeg', imgFull:'./images/Prestigio-Trufado.jpeg', dest:null },
  { id:11, nome:'Trufado Ninho com geleia de frutas vermelhas', desc:'Delicioso ovo trufado com recheio de Ninho e geleia de frutas vermelhas.', peso:'500g', preco:69.90, img:'./images/Ninho-Frutas-Vermelhas-Trufado.jpeg', imgFull:'./images/Ninho-Frutas-Vermelhas-Trufado.jpeg', dest:null },
  { id:12, nome:'Trufado de Brigadeiro', desc:'Delicioso ovo trufado com recheio de Brigadeiro.', peso:'500g', preco:69.90, img:'./images/Brigadeiro-Trufado.jpeg', imgFull:'./images/Brigadeiro-Trufado.jpeg', dest:null },
];

let cart = {};
const fmt = n => 'R$ ' + Number(n).toFixed(2).replace('.', ',');

// ── Render grid ──
function renderGrid() {
  document.getElementById('grid').innerHTML = produtos.map(p => `
    <article class="card" role="listitem">
      <div class="card-img" title="Ver detalhes" onclick="openModal(${p.id})">
        <img
          src="${p.img}"
          alt="${p.nome} — Doceria Dellicato"
          loading="lazy"
          decoding="async"
          width="400" height="400"
          onload="this.classList.add('loaded')"
        />
        ${p.dest ? `<div class="card-dest">${p.dest}</div>` : ''}
      </div>
      <div class="card-body">
        <div class="card-name">${p.nome}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-meta"><span class="badge-sm">⚖️ ${p.peso}</span></div>
        <div class="card-bottom">
          <div>
            <div class="card-preco">${fmt(p.preco)}</div>
            <div class="card-peso">${p.peso}</div>
          </div>
          <button class="btn-add" id="btn-${p.id}" onclick="addCart(${p.id})" aria-label="Adicionar ${p.nome} ao carrinho">
            🛒 Adicionar
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// ── Modal Logic ──
function openModal(id) {
  const p = produtos.find(x => x.id === id);
  if (!p) return;
  document.getElementById('pm-img').src = p.imgFull;
  document.getElementById('pm-img').alt = p.nome;
  document.getElementById('pm-title').textContent = p.nome;
  document.getElementById('pm-desc').textContent = p.desc;
  document.getElementById('pm-price').textContent = fmt(p.preco);
  document.getElementById('pm-weight').textContent = 'Peso: ' + p.peso;
  
  document.getElementById('pm-add').onclick = () => { addCart(id); closeModal(); };
  
  document.getElementById('pm-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('pm-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalBg(e) {
  if (e.target.id === 'pm-overlay') closeModal();
}

// ── Cart logic ──
function addCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  const btn = document.getElementById('btn-' + id);
  if(btn) {
    btn.classList.add('added'); btn.textContent = '✅ Adicionado!';
    setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = '🛒 Adicionar'; }, 1500);
  }
  const badge = document.getElementById('cart-count');
  badge.classList.remove('bounce'); void badge.offsetWidth; badge.classList.add('bounce');
  document.getElementById('cart-pulse').style.display = 'block';
  setTimeout(() => document.getElementById('cart-pulse').style.display = 'none', 2000);
  updateUI();
  toast('🛒 ' + produtos.find(x => x.id == id).nome + ' adicionado!');
}

function changeQty(id, d) {
  const n = (cart[id] || 0) + d;
  if (n <= 0) delete cart[id]; else cart[id] = n;
  updateUI();
}

function removeItem(id) { delete cart[id]; updateUI(); }

function getTotal() {
  return Object.entries(cart).reduce((s, [id, q]) => {
    const p = produtos.find(x => x.id == id);
    return s + (p ? p.preco * q : 0);
  }, 0);
}
function getTotalItens() { return Object.values(cart).reduce((s, q) => s + q, 0); }

function updateUI() {
  const total = getTotal(), itens = getTotalItens();
  const badge = document.getElementById('cart-count');
  badge.textContent = itens; badge.style.display = itens > 0 ? 'flex' : 'none';
  const itemsDiv = document.getElementById('drawer-items');
  const footer = document.getElementById('drawer-footer');
  if (!itens) {
    itemsDiv.innerHTML = '<div class="drawer-empty"><div class="emo">🐣</div><p>Seu carrinho está vazio!<br>Escolha seus ovos favoritos.</p></div>';
    footer.style.display = 'none'; return;
  }
  itemsDiv.innerHTML = Object.entries(cart).map(([id, qty]) => {
    const p = produtos.find(x => x.id == id); if (!p) return '';
    return `<div class="cart-item">
      <img class="ci-img" src="${p.img}" alt="${p.nome}" loading="lazy" />
      <div class="ci-info">
        <div class="ci-name">${p.nome}</div>
        <div class="ci-unit">${fmt(p.preco)} / unid · ${p.peso}</div>
        <div class="ci-row">
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeQty(${id},-1)" aria-label="Diminuir">−</button>
            <span class="qty-val" aria-label="${qty} unidades">${qty}</span>
            <button class="qty-btn" onclick="changeQty(${id},1)" aria-label="Aumentar">+</button>
          </div>
          <span class="ci-total">${fmt(p.preco * qty)}</span>
        </div>
      </div>
      <button class="ci-remove" onclick="removeItem(${id})" aria-label="Remover ${p.nome}">🗑</button>
    </div>`;
  }).join('');
  footer.style.display = 'block';
  document.getElementById('subtotal').textContent = fmt(total);
  document.getElementById('total-val').textContent = fmt(total);
}

// ── WhatsApp message ──
function finalizar() {
  const itens = Object.entries(cart);
  if (!itens.length) { toast('⚠️ Carrinho vazio!'); return; }
  const linhas = itens.map(([id, qty]) => {
    const p = produtos.find(x => x.id == id);
    return `  • ${p.nome} (${p.peso}) — ${qty}x — ${fmt(p.preco * qty)}`;
  });
  const total = getTotal();
  const msg = [
    'Olá Leticia! 👋 Quero fazer meu pedido de ovos de Páscoa 🐰🍫',
    '', '🛒 *Meu Pedido:*', ...linhas, '',
    `📦 *Total de itens:* ${getTotalItens()}`,
    `💰 *Valor total:* ${fmt(total)}`,
    `💵 *Entrada (50%):* ${fmt(total * 0.5)}`,
    '', 'Por favor, confirme meu pedido para que eu possa enviar a entrada! 😊'
  ].join('\n');
  window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
}

// ── Drawer ──
function openCart()  { document.getElementById('overlay').classList.add('open'); document.getElementById('drawer').classList.add('open'); document.body.style.overflow='hidden'; }
function closeCart() { document.getElementById('overlay').classList.remove('open'); document.getElementById('drawer').classList.remove('open'); document.body.style.overflow=''; }
function toggleCart(){ document.getElementById('drawer').classList.contains('open') ? closeCart() : openCart(); }

// ── Navbar scroll ──
window.addEventListener('scroll', () => document.getElementById('navbar').classList.toggle('scrolled', scrollY > 40), { passive: true });
document.addEventListener('keydown', e => { 
  if (e.key === 'Escape') {
    closeCart();
    closeModal();
  } 
});

// ── Toast ──
function toast(msg) {
  const w = document.getElementById('toast-wrap');
  const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = msg;
  w.appendChild(el); setTimeout(() => el.remove(), 2500);
}

// ── Scroll animations ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; io.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  renderGrid(); updateUI();
  setTimeout(() => {
    document.querySelectorAll('.card, .dif-card, .dep-card, .info-card').forEach((el, i) => {
      el.style.opacity='0'; el.style.transform='translateY(22px)';
      el.style.transition=`opacity .5s ${i*60}ms ease, transform .5s ${i*60}ms ease`;
      io.observe(el);
    });
  }, 100);
});