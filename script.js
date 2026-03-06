const WA = '5535997360026';

// Imagens alteradas para .webp para otimização de performance (Ponto 3)
const produtos = [
  { id:1, nome:'Kinder',              desc:'Recheio suculento com creme de Kinder e pedaços de chocolate.',                            peso:'350g', preco:84.90,  img:'./images/thumb/kinder.webp',        imgFull:'./images/kinder.webp',        dest:'🔥 Mais Pedido' },
  { id:2, nome:'Ninho com Nutella',   desc:'Recheio suculento com creme de Ninho e Nutella e docinhos de Ninho.',                      peso:'350g', preco:69.90,  img:'./images/thumb/ninho_nutella.webp', imgFull:'./images/ninho_nutella.webp', dest:null },
  { id:3, nome:'Brigadeiro c/ Maracujá', desc:'Recheio suculento com creme de brigadeiro e mousse de maracujá.',                       peso:'350g', preco:69.90,  img:'./images/thumb/brig_maracuja.webp', imgFull:'./images/brig_maracuja.webp', dest:null },
  { id:4, nome:'Ferrero Rocher',      desc:'Recheio suculento com creme de ferrero e pedaços de castanhas e amendoim.',                peso:'350g', preco:84.90,  img:'./images/thumb/ferrero.webp',       imgFull:'./images/ferrero.webp',       dest:'⭐ Premium' },
  { id:5, nome:'Infantil',            desc:'Recheio suculento de brigadeiro ou ninho com guloseimas.',                                 peso:'350g', preco:59.90,  img:'./images/thumb/infantil.webp',      imgFull:'./images/infantil.webp',      dest:'👧 Kids' },
  { id:6, nome:'Kit Degustação',      desc:'Sabores: Brigadeiro, Maracujá, Oreo, ferrero, frutas vermelhas e Ninho com Nutella.',                                 peso:'200g', preco:39.90,  img:'./images/thumb/kit.webp',           imgFull:'./images/kit.webp',           dest:'🎁 Kit' },
  { id:7, nome:'Ovo Fatia',           desc:'Ferrero Rocher, Ninho com Nutella, Brigadeiro, Ninho com geleia de frutas vermelhas, Dois amores e Prestigio.', peso:'750g', preco:119.90, img:'./images/thumb/fatia.webp',         imgFull:'./images/fatia.webp',         dest:'✨ Especial' },
  { id:8, nome:'Barra de Chocolate',  desc:'Chocolate com castanhas, Oreo, chocolate branco com castanhas.',                           peso:'200g', preco:19.90,  img:'./images/thumb/barra.webp',         imgFull:'./images/barra.webp',         dest:null },
  { id:9, nome:'Trufado Ferrero',     desc:'Delicioso ovo trufado com recheio de Ferrero Rocher.', peso:'500g', preco:69.90, img:'./images/Ferrero-Trufado.webp', imgFull:'./images/Ferrero-Trufado.webp', dest:null },
  { id:10, nome:'Trufado Prestígio',  desc:'Delicioso ovo trufado com recheio de Prestígio.', peso:'500g', preco:69.90, img:'./images/Prestigio-Trufado.webp', imgFull:'./images/Prestigio-Trufado.webp', dest:null },
  { id:11, nome:'Trufado Ninho com geleia de frutas vermelhas', desc:'Delicioso ovo trufado com recheio de Ninho e geleia de frutas vermelhas.', peso:'500g', preco:69.90, img:'./images/Ninho-Frutas-Vermelhas-Trufado.webp', imgFull:'./images/Ninho-Frutas-Vermelhas-Trufado.webp', dest:null },
  { id:12, nome:'Trufado de Brigadeiro', desc:'Delicioso ovo trufado com recheio de Brigadeiro.', peso:'500g', preco:69.90, img:'./images/Brigadeiro-Trufado.webp', imgFull:'./images/Brigadeiro-Trufado.webp', dest:null },
];

// Ponto 1: LocalStorage (Recupera dados ao carregar)
let cart = JSON.parse(localStorage.getItem('dellicato_cart')) || {};
const btnTimers = {};
let lastFocusedElement = null; // Para o Focus Trap
const fmt = n => 'R$ ' + Number(n).toFixed(2).replace('.', ',');

// Salva carrinho no LocalStorage sempre que alterar
function saveCartData() {
  localStorage.setItem('dellicato_cart', JSON.stringify(cart));
  updateUI();
}

// ── Focus Trap (Ponto 4: Acessibilidade) ──
function trapFocus(element) {
  const focusableEls = element.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])');
  if(focusableEls.length === 0) return;
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener('keydown', function(e) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    if (!isTabPressed) return;

    if (e.shiftKey) { 
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus(); e.preventDefault();
      }
    } else { 
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus(); e.preventDefault();
      }
    }
  });
}

// ── Mobile Menu (Ponto 2) ──
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('nav-toggle');
  const isOpen = menu.classList.contains('open');

  if(isOpen) {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
  } else {
    menu.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 6L6 18M6 6l12 12"></path></svg>';
  }
}

// ── Render grid ──
function renderGrid() {
  const grid = document.getElementById('grid');
  if(!grid) return;
  grid.innerHTML = produtos.map(p => `
    <article class="card" role="listitem">
      <div class="card-img" title="Ver detalhes" onclick="openModal(${p.id})">
        <img src="${p.img}" alt="${p.nome} — Doceria Dellicato" loading="lazy" decoding="async" width="400" height="400" onload="this.classList.add('loaded')" />
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
          <button class="btn-add" id="btn-${p.id}" onclick="addCart(${p.id})" aria-label="Adicionar ${p.nome} ao carrinho">🛒 Adicionar</button>
        </div>
      </div>
    </article>
  `).join('');
}

// ── Modal Logic ──
function openModal(id) {
  const p = produtos.find(x => x.id === id);
  if (!p) return;
  lastFocusedElement = document.activeElement; // Salva de onde veio o foco
  
  document.getElementById('pm-img').src = p.imgFull;
  document.getElementById('pm-img').alt = p.nome;
  document.getElementById('pm-title').textContent = p.nome;
  document.getElementById('pm-desc').textContent = p.desc;
  document.getElementById('pm-price').textContent = fmt(p.preco);
  document.getElementById('pm-weight').textContent = 'Peso: ' + p.peso;
  document.getElementById('pm-add').onclick = () => { addCart(id); closeModal(); };
  
  const modalOverlay = document.getElementById('pm-overlay');
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  trapFocus(document.querySelector('.p-modal')); // Prende foco
  setTimeout(() => document.querySelector('.pm-close').focus(), 100); // Foca no fechar
}

function closeModal() {
  document.getElementById('pm-overlay').classList.remove('open');
  document.body.style.overflow = '';
  if (lastFocusedElement) lastFocusedElement.focus(); // Devolve foco
}

function closeModalBg(e) { if (e.target.id === 'pm-overlay') closeModal(); }

// ── Cart logic ──
function addCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCartData(); // Ponto 1
  
  const btn = document.getElementById('btn-' + id);
  if(btn) {
    btn.classList.add('added'); 
    btn.textContent = '✅ Adicionado!';
    if(btnTimers[id]) clearTimeout(btnTimers[id]);
    btnTimers[id] = setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = '🛒 Adicionar'; }, 1500);
  }
  
  const badge = document.getElementById('cart-count');
  badge.classList.remove('bounce'); void badge.offsetWidth; badge.classList.add('bounce');
  document.getElementById('cart-pulse').style.display = 'block';
  setTimeout(() => document.getElementById('cart-pulse').style.display = 'none', 2000);
  
  toast('🛒 ' + produtos.find(x => x.id == id).nome + ' adicionado!');
}

function changeQty(id, d) {
  const n = (cart[id] || 0) + d;
  if (n <= 0) delete cart[id]; else cart[id] = n;
  saveCartData();
}

function removeItem(id) { delete cart[id]; saveCartData(); }

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
  
  // Limpa o carrinho após enviar pedido
  cart = {}; saveCartData();
  
  window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
}

// ── Drawer ──
function openCart() { 
  lastFocusedElement = document.activeElement;
  document.getElementById('overlay').classList.add('open'); 
  const drawer = document.getElementById('drawer');
  drawer.classList.add('open'); 
  document.body.style.overflow='hidden'; 
  trapFocus(drawer);
  setTimeout(() => drawer.querySelector('.drawer-close').focus(), 100);
}
function closeCart() { 
  document.getElementById('overlay').classList.remove('open'); 
  document.getElementById('drawer').classList.remove('open'); 
  document.body.style.overflow=''; 
  if (lastFocusedElement) lastFocusedElement.focus();
}
function toggleCart(){ document.getElementById('drawer').classList.contains('open') ? closeCart() : openCart(); }

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeCart(); closeModal(); } });

function toast(msg) {
  const w = document.getElementById('toast-wrap');
  if(!w) return;
  const el = document.createElement('div'); el.className = 'toast'; el.innerHTML = msg;
  w.appendChild(el); setTimeout(() => el.remove(), 2500);
}

// ── Scroll Anim ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  renderGrid(); updateUI(); // Carrega o UI com o que estava salvo no LocalStorage
  setTimeout(() => {
    document.querySelectorAll('.card, .dif-card, .dep-card, .info-card').forEach((el, i) => {
      el.classList.add('scroll-anim');
      el.style.transitionDelay = `${(i % 10) * 60}ms`;
      io.observe(el);
    });
  }, 100);
});