const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const overlay = document.querySelector('[data-overlay]');
const cartDrawer = document.querySelector('[data-cart-drawer]');
const cartToggle = document.querySelector('[data-cart]');
const closeCartBtn = document.querySelector('[data-close-cart]');
const cartContinueBtn = document.querySelector('[data-cart-continue]');
const cartItemsContainer = document.querySelector('[data-cart-items]');
const cartEmptyState = document.querySelector('[data-cart-empty]');
const cartFooter = document.querySelector('[data-cart-footer]');
const cartSubtotal = document.querySelector('[data-cart-subtotal]');
const cartTotal = document.querySelector('[data-cart-total]');
const cartShipping = document.querySelector('[data-cart-shipping]');
const cartCountBadge = document.querySelector('[data-cart-count]');
const cartNote = document.querySelector('[data-cart-note]');
const checkoutBtn = document.querySelector('[data-checkout]');

const searchPanel = document.querySelector('[data-search-panel]');
const searchTrigger = document.querySelector('[data-search-trigger]');
const searchClose = document.querySelector('[data-close-search]');
const searchInput = document.querySelector('[data-search-input]');
const searchResults = document.querySelector('[data-search-results]');
const searchEmpty = document.querySelector('[data-search-empty]');
const searchTrending = document.querySelector('[data-search-trending]');
const searchChips = document.querySelectorAll('[data-search-chip]');

const productGrid = document.querySelector('[data-products]');
const filtersGroup = document.querySelector('[data-filter-group]');
const sortSelect = document.querySelector('[data-sort]');
const emptyState = document.querySelector('[data-empty]');
const clearFiltersBtn = document.querySelector('[data-clear-filters]');
const toast = document.querySelector('[data-toast]');
let toastTimeout = null;

const STORAGE_KEYS = {
  cart: 'omens-store-cart-v1',
};

const products = [
  {
    id: 'parka-kyoto',
    name: 'Kyoto Trail Parka',
    price: 328,
    note: 'Modular shell • Sandstone',
    image:
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=600&q=80',
    tags: ['apparel', 'gifting'],
    rating: 4.8,
    reviews: 268,
    added: '2025-09-10',
  },
  {
    id: 'incense-hinoki',
    name: 'Hinoki Incense Set',
    price: 58,
    note: 'Slow-burn cones • Cedarwood',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80',
    tags: ['home', 'wellness', 'fragrance', 'gifting'],
    rating: 4.9,
    reviews: 412,
    added: '2025-09-22',
  },
  {
    id: 'cups-sumi',
    name: 'Sumi Ceramic Cups',
    price: 96,
    note: 'Set of 4 • Hand-thrown',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
    tags: ['home', 'gifting'],
    rating: 4.7,
    reviews: 153,
    added: '2025-08-28',
  },
  {
    id: 'parfum-moonlit',
    name: 'Moonlit Eau de Parfum',
    price: 142,
    note: 'Black tea • Bergamot • Tonka',
    image:
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
    tags: ['fragrance', 'gifting'],
    rating: 4.9,
    reviews: 389,
    added: '2025-09-29',
  },
  {
    id: 'blanket-cocoon',
    name: 'Cocoon Knit Blanket',
    price: 218,
    note: 'Organic cotton • Obsidian',
    image:
      'https://images.unsplash.com/photo-1493932484895-752d1471ecc2?auto=format&fit=crop&w=600&q=80',
    tags: ['home', 'wellness'],
    rating: 4.8,
    reviews: 245,
    added: '2025-07-30',
  },
  {
    id: 'lamp-gild',
    name: 'Gild Teahouse Lamp',
    price: 260,
    note: 'Brushed brass • Dimmable',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    tags: ['home'],
    rating: 4.6,
    reviews: 104,
    added: '2025-08-18',
  },
  {
    id: 'tote-atlas',
    name: 'Atlas Travel Tote',
    price: 188,
    note: 'Recycled ripstop • Graphite',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    tags: ['apparel', 'gifting'],
    rating: 4.5,
    reviews: 178,
    added: '2025-09-05',
  },
  {
    id: 'cushion-kumo',
    name: 'Kumo Floor Cushion',
    price: 174,
    note: 'Memory foam • Heathered linen',
    image:
      'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?auto=format&fit=crop&w=600&q=80',
    tags: ['home', 'wellness'],
    rating: 4.7,
    reviews: 201,
    added: '2025-09-12',
  },
];

function currency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.productId = product.id;
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" loading="lazy" />
    <header>
      <h3>${product.name}</h3>
      <span class="price">${currency(product.price)}</span>
    </header>
    <p class="meta">${product.note}</p>
    <div class="rating" aria-label="Rated ${product.rating} out of 5">
      <span>★ ${product.rating.toFixed(1)}</span>
      <span>(${product.reviews})</span>
    </div>
    <div class="tags">${product.tags.map(tag => `<span class="pill">${tag}</span>`).join('')}</div>
    <button class="btn btn--primary add-btn" type="button" data-add-to-cart data-product-id="${product.id}">
      Add to cart
    </button>
  `;
  return card;
}

function renderProducts(list = products) {
  if (!productGrid) return;

  if (!list.length) {
    productGrid.innerHTML = '';
    emptyState?.removeAttribute('hidden');
    return;
  }

  emptyState?.setAttribute('hidden', '');

  const fragment = document.createDocumentFragment();
  list.forEach(product => fragment.appendChild(createProductCard(product)));

  productGrid.innerHTML = '';
  productGrid.appendChild(fragment);
}

const state = {
  filter: 'all',
  sort: 'featured',
  cart: new Map(),
};

function applyFilters() {
  const filtered = products.filter(product => {
    if (state.filter === 'all') return true;
    return product.tags.includes(state.filter);
  });

  const sorted = filtered.sort((a, b) => {
    switch (state.sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.added).getTime() - new Date(a.added).getTime();
      default:
        return 0;
    }
  });

  renderProducts(sorted);
}

renderProducts();
applyFilters();

filtersGroup?.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;

  const filter = button.getAttribute('data-filter');
  if (!filter) return;

  filtersGroup.querySelectorAll('.filter-chip').forEach(chip => {
    chip.setAttribute('aria-pressed', String(chip === button));
  });

  state.filter = filter;
  applyFilters();
});

sortSelect?.addEventListener('change', () => {
  state.sort = sortSelect.value;
  applyFilters();
});

clearFiltersBtn?.addEventListener('click', () => {
  state.filter = 'all';
  state.sort = 'featured';
  filtersGroup?.querySelectorAll('.filter-chip').forEach(chip => {
    chip.setAttribute('aria-pressed', chip.dataset.filter === 'all' ? 'true' : 'false');
  });
  if (sortSelect) sortSelect.value = 'featured';
  applyFilters();
});

function updateCartBadge() {
  const count = Array.from(state.cart.values()).reduce((total, item) => total + item.quantity, 0);
  if (!cartCountBadge) return;
  cartCountBadge.textContent = String(count);
  if (count > 0) {
    cartCountBadge.removeAttribute('hidden');
  } else {
    cartCountBadge.setAttribute('hidden', '');
  }
}

function updateCartSummary() {
  const items = Array.from(state.cart.values());
  if (!items.length) {
    cartEmptyState?.removeAttribute('hidden');
    cartItemsContainer?.setAttribute('hidden', '');
    cartFooter?.setAttribute('hidden', '');
    return;
  }

  cartEmptyState?.setAttribute('hidden', '');
  cartItemsContainer?.removeAttribute('hidden');
  cartFooter?.removeAttribute('hidden');

  const subtotal = items.reduce((total, item) => total + item.quantity * item.product.price, 0);
  const shipping = subtotal >= 150 ? 0 : 18;
  const shippingLabel = shipping === 0 ? 'Free' : currency(shipping);
  const total = subtotal + (shipping === 0 ? 0 : shipping);

  if (cartSubtotal) cartSubtotal.textContent = currency(subtotal);
  if (cartShipping) cartShipping.textContent = shippingLabel;
  if (cartTotal) cartTotal.textContent = currency(total);
  if (cartNote) {
    cartNote.textContent =
      shipping === 0
        ? 'Complimentary shipping applied. Thank you for supporting independent makers.'
        : 'Complimentary shipping on orders above $150.';
  }
}

function renderCart() {
  if (!cartItemsContainer) return;

  persistCart();
  cartItemsContainer.innerHTML = '';

  state.cart.forEach(item => {
    const { product, quantity } = item;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.dataset.cartItem = product.id;
    row.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <h4>${product.name}</h4>
        <div class="cart-meta">${product.note}</div>
        <div class="cart-meta">${currency(product.price)} each</div>
      </div>
      <div>
        <div class="qty-control" aria-label="Adjust quantity">
          <button class="qty-btn" type="button" data-qty="decrease" aria-label="Decrease quantity">−</button>
          <span>${quantity}</span>
          <button class="qty-btn" type="button" data-qty="increase" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn-icon inline" type="button" data-remove aria-label="Remove ${product.name}">
          <span class="icon">✕</span>
          Remove
        </button>
      </div>
    `;
    cartItemsContainer.appendChild(row);
  });

  updateCartSummary();
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2200);
}

function openCart() {
  closeSearch({ preserveOverlay: true });
  cartDrawer?.classList.add('is-open');
  overlay?.classList.add('is-active');
  cartDrawer?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeCart() {
  cartDrawer?.classList.remove('is-open');
  overlay?.classList.remove('is-active');
  cartDrawer?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

cartToggle?.addEventListener('click', () => {
  openCart();
});

closeCartBtn?.addEventListener('click', () => {
  closeCart();
});

cartContinueBtn?.addEventListener('click', () => {
  closeCart();
});

overlay?.addEventListener('click', () => {
  closeCart();
  closeSearch();
});

productGrid?.addEventListener('click', event => {
  const button = event.target.closest('[data-add-to-cart]');
  if (!button) return;

  const productId = button.getAttribute('data-product-id');
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const cartItem = state.cart.get(productId);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    state.cart.set(productId, { product, quantity: 1 });
  }

  button.classList.add('is-added');
  button.textContent = 'Added';
  setTimeout(() => {
    button.classList.remove('is-added');
    button.textContent = 'Add to cart';
  }, 1400);

  updateCartBadge();
  renderCart();
  openCart();
  showToast(`${product.name} added to cart`);
});

cartItemsContainer?.addEventListener('click', event => {
  const container = event.target.closest('.cart-item');
  if (!container) return;
  const productId = container.dataset.cartItem;
  if (!productId) return;

  if (event.target.matches('[data-remove]') || event.target.closest('[data-remove]')) {
    state.cart.delete(productId);
    updateCartBadge();
    renderCart();
    if (!state.cart.size) closeCart();
    return;
  }

  const actionBtn = event.target.closest('[data-qty]');
  if (!actionBtn) return;

  const cartItem = state.cart.get(productId);
  if (!cartItem) return;

  if (actionBtn.dataset.qty === 'increase') {
    cartItem.quantity += 1;
  } else if (actionBtn.dataset.qty === 'decrease') {
    cartItem.quantity = Math.max(1, cartItem.quantity - 1);
  }

  renderCart();
  updateCartBadge();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeCart();
    closeSearch();
  }
});

checkoutBtn?.addEventListener('click', () => {
  if (!state.cart.size) return;
  closeCart();
  showToast('Checkout flow not connected yet. Integrate your payment provider to complete orders.');
});

function openSearch() {
  searchPanel?.classList.add('is-open');
  overlay?.classList.add('is-active');
  document.body.classList.add('no-scroll');
  searchPanel?.setAttribute('aria-hidden', 'false');
  setTimeout(() => searchInput?.focus(), 100);
}

function closeSearch({ preserveOverlay = false } = {}) {
  searchPanel?.classList.remove('is-open');
  if (!preserveOverlay && !cartDrawer?.classList.contains('is-open')) {
    overlay?.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
  }
  searchPanel?.setAttribute('aria-hidden', 'true');
  if (searchInput) searchInput.value = '';
  renderSearchResults('');
}

searchTrigger?.addEventListener('click', () => {
  openSearch();
});

searchClose?.addEventListener('click', () => {
  closeSearch();
});

function renderSearchResults(query) {
  if (!searchResults || !searchEmpty || !searchTrending) return;

  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 2) {
    searchResults.innerHTML = '';
    searchEmpty.setAttribute('hidden', '');
    searchTrending.removeAttribute('hidden');
    return;
  }

  const matches = products.filter(product => {
    const haystack = [product.name, product.note, ...product.tags].join(' ').toLowerCase();
    return haystack.includes(trimmed);
  });

  searchTrending.setAttribute('hidden', '');

  if (!matches.length) {
    searchResults.innerHTML = '';
    searchEmpty.removeAttribute('hidden');
    return;
  }

  searchEmpty.setAttribute('hidden', '');
  const fragment = document.createDocumentFragment();

  matches.forEach(product => {
    const li = document.createElement('li');
    li.className = 'search-result';
    li.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <h4>${product.name}</h4>
        <p>${product.note}</p>
        <div class="search-meta">${currency(product.price)} · ★ ${product.rating.toFixed(1)} (${product.reviews})</div>
      </div>
      <button class="btn btn--primary" type="button" data-search-add data-product-id="${product.id}">
        Add to cart
      </button>
    `;
    fragment.appendChild(li);
  });

  searchResults.innerHTML = '';
  searchResults.appendChild(fragment);
}

searchInput?.addEventListener('input', event => {
  renderSearchResults(event.target.value);
});

searchResults?.addEventListener('click', event => {
  const button = event.target.closest('[data-search-add]');
  if (!button) return;
  const productId = button.getAttribute('data-product-id');
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const cartItem = state.cart.get(productId);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    state.cart.set(productId, { product, quantity: 1 });
  }

  closeSearch({ preserveOverlay: true });
  updateCartBadge();
  renderCart();
  showToast(`${product.name} added to cart`);
  openCart();
});

searchChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const keyword = chip.getAttribute('data-search-chip');
    if (!keyword) return;
    if (!searchPanel?.classList.contains('is-open')) {
      openSearch();
    }
    if (searchInput) searchInput.value = keyword;
    renderSearchResults(keyword);
  });
});

function persistCart() {
  try {
    const serialised = Array.from(state.cart.entries()).map(([id, { quantity }]) => ({ id, quantity }));
    window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(serialised));
  } catch (error) {
    console.warn('Unable to persist cart', error);
  }
}

function hydrateCartFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.cart);
    if (!raw) {
      updateCartBadge();
      renderCart();
      return;
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      parsed.forEach(item => {
        const product = products.find(entry => entry.id === item.id);
        if (product && item.quantity > 0) {
          state.cart.set(product.id, { product, quantity: item.quantity });
        }
      });
    }
  } catch (error) {
    console.warn('Unable to read cart from storage', error);
  }

  updateCartBadge();
  renderCart();
}

hydrateCartFromStorage();

const slides = document.querySelectorAll('[data-slider] .testimonial__slide');
const prevBtn = document.querySelector('[data-prev]');
const nextBtn = document.querySelector('[data-next]');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlideHandler() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

let sliderInterval = null;

function startSlider() {
  stopSlider();
  sliderInterval = setInterval(nextSlide, 7000);
}

function stopSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
    sliderInterval = null;
  }
}

if (slides.length > 1) {
  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startSlider();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlideHandler();
    startSlider();
  });

  slides.forEach(slide => {
    slide.addEventListener('mouseenter', stopSlider);
    slide.addEventListener('mouseleave', startSlider);
  });

  startSlider();
}

const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

