const products = [
  // --- PRODUCT 1: DENVER PERFUME ---
  {
    id: 1,
    name: "Denver Perfume – Pack of 3 (50ml each)",
    price: 239,
    mrp: 599,
    rating: "4.6 ★",
    category: "Perfumes",
    isNew: true,
    description: `Premium Denver Perfume Pack of 3 — perfect for men.
Long-lasting fragrance, ideal for daily use or gifting 🎁

<strong>✅ Key Features:</strong><br>
- 3 Bottles × 50ml each (Total 150ml)<br>
- perfect for men<br>
- Made in India 🇮🇳
<br><br>
<strong>🧾 Product Details:</strong><br>
- Brand: Denver<br>
- Type: Eau De Parfum`,
    colors: [ { name: 'Default', images: ["Images/perfumes/denver/1.jpg", "Images/perfumes/denver/2.jpg", "Images/perfumes/denver/3.jpg", "Images/perfumes/denver/4.jpg"] } ],
    images: ["Images/perfumes/denver/1.jpg"]
  },
  // --- PRODUCT 2: LED WATCH ---
  {
    id: 2,
    name: "Trendy LED Digital Watch – Unisex (2 Pc)",
    price: 219,
    mrp: 499,
    rating: "4.4 ★",
    category: "Watches",
    isNew: false,
    description: `Upgrade your style with this modern LED Digital Watch.
Trendy design with glowing LED display – perfect for daily use or gifting! 🎁

<strong>✅ Key Features:</strong><br>
- Bright LED Digital Display<br>
- Soft & Durable Rubber Strap
- Made in India 🇮🇳
<br><br>
<strong>📏 Dimensions:</strong><br>
- Width: 4 cm, Height: 2 cm, Length: 20 cm
<br><br>
<strong>📦 Packaging:</strong><br>
- Premium box packed (2 Watch)
<br><br>
<strong>🧾 Product Details:</strong><br>
- Type: LED Digital Watch<br>
- Display: Time & Date`,
    colors: [ { name: 'Default', images: ["Images/watches/led watch/1.jpg", "Images/watches/led watch/2.jpg", "Images/watches/led watch/3.jpg"] } ],
    images: ["Images/watches/led watch/1.jpg"]
  },
  // --- PRODUCT 3: VOGUISH ANALOG WATCHES ---
  {
    id: 3,
    name: "Voguish Men Analog Watches (Pack of 2)",
    price: 199,
    mrp: 699,
    rating: "4.5 ★",
    category: "Watches",
    isNew: false,
    description: `Stylish & premium Voguish Analog Watches (Pack of 2) for men.
Classic stainless steel design with quartz mechanism. ⌚✨

<strong>✅ Key Features:</strong><br>
- Pack of 2 Elegant Analog Watches<br>
- Stainless Steel Strap<br>
- Quartz Mechanism<br>
- Made in India 🇮🇳
<br><br>
<strong>📏 Size:</strong><br>
- Free Size (Adjustable Strap)
<br><br>
<strong>🧾 Product Details:</strong><br>
- Brand: Voguish<br>
- Mechanism: Quartz`,
     colors: [ { name: 'Default', images: ["Images/watches/Voguish Men Waches/1.jpg", "Images/watches/Voguish Men Waches/2.jpg"] } ],
    images: ["Images/watches/Voguish Men Waches/1.jpg"]
  },
  // --- PRODUCT 4: BACKPACK ---
  {
    id: 4,
    name: "Stylish Colorblocked Backpacks (XL Size, 3 Colors)",
    price: 279,
    mrp: 799,
    rating: "4.7 ★",
    category: "Backpacks",
    isNew: true,
    description: `Spacious & trendy Colorblocked Backpacks made from durable polyester fabric — available in Gray, Blue & Red.
Perfect for school, college, office, or travel. Lightweight, durable, and modern design! 🎒✨

<strong>✅ Key Features:</strong><br>
- Material: Polyester<br>
- Size: XL (24–30 Litres)<br>
- Design: Colorblocked (Modern Pattern 🎨)<br>
- Made in India 🇮🇳
<br><br>
<strong>📏 Dimensions:</strong><br>
- 41 cm (H) × 28 cm (L) × 11 cm (W)
<br><br>
<strong>🧾 Product Details:</strong><br>
- Brand: MarketSale<br>
- Type: Casual / Laptop Compatible`,
    colors: [
      { name: 'Gray', images: ["Images/Backpacks/Travel-College-Bags/gray-1.jpg", "Images/Backpacks/Travel-College-Bags/gray-2.jpg", "Images/Backpacks/Travel-College-Bags/gray-3.jpg", "Images/Backpacks/Travel-College-Bags/gray-4.jpg"] },
      { name: 'Blue', images: ["Images/Backpacks/Travel-College-Bags/blue-1.jpg", "Images/Backpacks/Travel-College-Bags/blue-2.jpg", "Images/Backpacks/Travel-College-Bags/blue-3.jpg", "Images/Backpacks/Travel-College-Bags/blue-4.jpg"] },
      { name: 'Red', images: ["Images/Backpacks/Travel-College-Bags/red-1.jpg", "Images/Backpacks/Travel-College-Bags/red-2.jpg", "Images/Backpacks/Travel-College-Bags/red-3.jpg", "Images/Backpacks/Travel-College-Bags/red-4.jpg"] }
    ],
    images: ["Images/Backpacks/Travel-College-Bags/gray-1.jpg"] // Default image for card
  }
];

// --- CATEGORIES ---
const categories = ["All", "Perfumes", "Watches", "Backpacks"];

// ----- GET HTML ELEMENTS -----
const productContainer = document.getElementById('product-container');
const categoryBar = document.getElementById('category-bar');
const searchInput = document.getElementById('search-input');
const pageTitle = document.getElementById('page-title');
const productModal = document.getElementById('product-modal');
const modalBody = document.getElementById('modal-body');
const customerFormModal = document.getElementById('customer-form-modal');
const customerForm = document.getElementById('customer-form');
const sortSelect = document.getElementById('sort-select');
const backToTopButton = document.getElementById('back-to-top');

let currentImageIndex = 0;
let activeProduct = null;
let selectedColorIndex = 0;
let likedProductIds = new Set(JSON.parse(localStorage.getItem('likedProducts') || '[]'));

// --- LIKE BUTTON LOGIC ---
function saveLikes() { localStorage.setItem('likedProducts', JSON.stringify(Array.from(likedProductIds))); }
function handleLikeClick(productId, buttonElement) {
    productId = parseInt(productId);
    if (likedProductIds.has(productId)) {
        likedProductIds.delete(productId);
        buttonElement.classList.remove('liked');
        buttonElement.innerHTML = '<i class="far fa-heart"></i>';
    } else {
        likedProductIds.add(productId);
        buttonElement.classList.add('liked');
        buttonElement.innerHTML = '<i class="fas fa-heart"></i>';
    }
    saveLikes();
}

// --- Skeleton Loader HTML ---
const skeletonCardHTML = `
<div class="skeleton-card">
    <div class="skeleton-image"></div>
    <div class="skeleton-text"></div>
    <div class="skeleton-text short"></div>
</div>`;

// --- Function to render products ---
function renderProducts(productsToRender) {
    productContainer.classList.remove('loading');
    productContainer.innerHTML = '';
    if (productsToRender.length === 0) {
        productContainer.innerHTML = '<p style="text-align: center; width: 100%; color: #888;">No products found!</p>';
        return;
    }
    productsToRender.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        card.style.animationDelay = `${index * 0.05}s`;
        const isLiked = likedProductIds.has(product.id);
        const cardImage = (product.colors && product.colors.length > 0 && product.colors[0].images.length > 0)
                          ? product.colors[0].images[0]
                          : 'placeholder.jpg'; // Fallback image

        card.innerHTML = `
            ${product.isNew ? '<span class="product-tag">NEW</span>' : ''}
            <button class="like-button ${isLiked ? 'liked' : ''}" data-product-id="${product.id}" title="Like">
                <i class="${isLiked ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <img src="${cardImage}" alt="${product.name}" class="product-image">
            <div class="card-body">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">₹${product.price}</p>
            </div>
        `;
        productContainer.appendChild(card);
        observer.observe(card);
    });
}

// --- Function to render category buttons ---
function renderCategories() {
    categoryBar.innerHTML = ''; // Clear existing buttons
    const uniqueCategories = ['All', ...new Set(products.map(p => p.category))]; // Dynamically get categories + 'All'

    uniqueCategories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.textContent = category;
        button.dataset.category = category;
        if (category === "All") button.classList.add('active');
        categoryBar.appendChild(button);
    });
}

// --- Sorting Logic ---
function sortProducts(productsToSort, sortBy) {
    const sorted = [...productsToSort];
    switch (sortBy) {
        case 'price-low-high': sorted.sort((a, b) => a.price - b.price); break;
        case 'price-high-low': sorted.sort((a, b) => b.price - a.price); break;
        default: sorted.sort((a, b) => a.id - b.id); break;
    }
    return sorted;
}

// --- Main filtering and sorting logic ---
function filterSortAndRender() {
    const activeCategoryBtn = categoryBar.querySelector('.active');
    if (!activeCategoryBtn) { console.warn("No active category button found."); renderProducts(products); return; }
    const currentCategory = activeCategoryBtn.dataset.category;
    const searchTerm = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;
    let filteredProducts = products;
    if (currentCategory !== "All") {
        filteredProducts = products.filter(product => product.category === currentCategory);
    }
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchTerm));
    }
    const sortedProducts = sortProducts(filteredProducts, sortBy);
    renderProducts(sortedProducts);
}

// --- Event Listeners for Filtering & Sorting ---
categoryBar.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const currentActive = categoryBar.querySelector('.active');
        if (currentActive) currentActive.classList.remove('active');
        event.target.classList.add('active');
        pageTitle.textContent = (event.target.dataset.category === "All") ? "All Products" : event.target.dataset.category;
        filterSortAndRender();
    }
});
searchInput.addEventListener('input', filterSortAndRender);
sortSelect.addEventListener('change', filterSortAndRender);

// --- Intersection Observer for Scroll Animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
}, { threshold: 0.1 });

// --- Back to Top Button Logic ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { backToTopButton.classList.remove('hidden'); }
    else { backToTopButton.classList.add('hidden'); }
});
backToTopButton.addEventListener('click', () => { window.scrollTo(0, 0); });

// --- Modal Functions ---
function updateSlider() {
    if (!activeProduct) return;
    const mainImage = modalBody.querySelector('#main-product-image');
    const colorSwatches = modalBody.querySelectorAll('.color-swatch');
    const thumbnailContainer = modalBody.querySelector('.thumbnail-container');

    if (!activeProduct.colors || activeProduct.colors.length === 0 || !activeProduct.colors[selectedColorIndex]) {
        console.error("Color data missing for product:", activeProduct.id);
        return;
    }

    const currentImages = activeProduct.colors[selectedColorIndex].images;

    if (mainImage && currentImages && currentImages.length > currentImageIndex) {
        mainImage.src = currentImages[currentImageIndex];
    } else if (mainImage && currentImages && currentImages.length > 0) {
         mainImage.src = currentImages[0]; currentImageIndex = 0;
    } else { console.error("Slider elements error for product:", activeProduct.id); }

    if (thumbnailContainer && currentImages) {
        thumbnailContainer.innerHTML = currentImages.map((imgSrc, index) =>
            `<img src="${imgSrc}" class="thumbnail ${index === currentImageIndex ? 'active' : ''}" data-index="${index}">`
        ).join('');
    }

    if (colorSwatches.length > 0) {
      colorSwatches.forEach((swatch, index) => {
          swatch.classList.toggle('active', index === selectedColorIndex);
      });
    }
}


function showProductModal(product) {
  activeProduct = product;
  currentImageIndex = 0;
  selectedColorIndex = 0;

  let colorSelectorHtml = '';
  if (product.colors && (product.colors.length > 1 || (product.colors.length === 1 && product.colors[0].name !== 'Default'))) {
      colorSelectorHtml = `
          <div class="color-selector">
              <label>Color:</label>
              ${product.colors.map((color, index) => {
                  let colorValue = color.name.toLowerCase();
                  if (colorValue === 'gray') colorValue = '#808080';
                  else if (colorValue === 'blue') colorValue = '#4682B4';
                  else if (colorValue === 'red') colorValue = '#B22222';
                  return `<span class="color-swatch ${index === 0 ? 'active' : ''}" data-color-index="${index}" style="background-color: ${colorValue};" title="${color.name}"></span>`;
              }).join('')}
          </div>`;
  }

  const initialImages = (product.colors && product.colors.length > 0 && product.colors[selectedColorIndex].images) ? product.colors[selectedColorIndex].images : [];
  const thumbnailsHtml = initialImages.map((imgSrc, index) => `<img src="${imgSrc}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">`).join('');
  const discount = (product.mrp && product.mrp > product.price) ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  modalBody.innerHTML = `
    <div class="image-gallery">
        <div class="main-image-container"><img src="${initialImages[0] || 'placeholder.jpg'}" id="main-product-image" alt="${product.name}"></div>
        <div class="thumbnail-container">${thumbnailsHtml}</div>
    </div>
    <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
         ${colorSelectorHtml}
        <div class="price-container">
            <span class="final-price">₹${product.price}</span>
            ${product.mrp && product.mrp > product.price ? `<span class="mrp">₹${product.mrp}</span>` : ''}
            ${discount > 0 ? `<span class="discount">${discount}% OFF</span>` : ''}
        </div>
        <p class="rating">${product.rating || ''}</p>
        <div class="description">${product.description || ''}</div>
        <button class="buy-btn">🛒 Buy Now</button>
    </div>`;
  productModal.classList.remove('hidden');
  updateSlider();
  history.pushState({ productId: product.id }, '', `#product-${product.id}`);
}

function hideProductModal() {
    productModal.classList.add('hidden'); activeProduct = null;
    if(window.location.hash.startsWith('#product-')) { history.go(-1); }
}
function showCustomerFormModal() { customerFormModal.classList.remove('hidden'); }
function hideCustomerFormModal() { customerFormModal.classList.add('hidden'); }

// --- Event Listeners for Modals ---
productContainer.addEventListener('click', (event) => {
  if (event.target.closest('.like-button')) {
      const button = event.target.closest('.like-button');
      handleLikeClick(button.dataset.productId, button);
      event.stopPropagation(); return;
  }
  const card = event.target.closest('.product-card');
  if (card) {
    const productId = parseInt(card.dataset.productId);
    const product = products.find(p => p.id === productId);
    if (product) showProductModal(product);
  }
});

productModal.addEventListener('click', (event) => {
  if (!activeProduct) return;
  if (event.target.classList.contains('buy-btn')) { showCustomerFormModal(); return; }
  if (event.target.classList.contains('thumbnail')) { currentImageIndex = parseInt(event.target.dataset.index); updateSlider(); }
  if (event.target.classList.contains('color-swatch')) {
      selectedColorIndex = parseInt(event.target.dataset.colorIndex);
      currentImageIndex = 0; // Reset image index
      updateSlider();
  }
  if (event.target.classList.contains('close-btn') || event.target === productModal) { hideProductModal(); }
});

customerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const pincode = document.getElementById('customer-pincode').value;
    const your_whatsapp_number = "919503780721";

    let selectedColorName = '';
     if (activeProduct && activeProduct.colors && activeProduct.colors.length > 0) {
       selectedColorName = activeProduct.colors[selectedColorIndex].name;
       if(activeProduct.colors.length === 1 && selectedColorName === 'Default') {
           selectedColorName = '';
       }
     }

    const message = `*New Order from ShoppingMarts99*\n\n*PRODUCT DETAILS:*\n- Name: ${activeProduct ? activeProduct.name : 'N/A'}\n- Price: ₹${activeProduct ? activeProduct.price : 'N/A'}${selectedColorName ? `\n- Color: ${selectedColorName}` : ''}\n\n*CUSTOMER DETAILS:*\n- Full Name: ${name}\n- Phone No: ${phone}\n- Address: ${address}\n- Pincode: ${pincode}`;

    window.open(`https://wa.me/${your_whatsapp_number}?text=${encodeURIComponent(message.trim())}`, '_blank');
    customerForm.reset();
    hideCustomerFormModal();
});

customerFormModal.addEventListener('click', (event) => {
  if (event.target.classList.contains('close-btn') || event.target === customerFormModal) { hideCustomerFormModal(); }
});

window.addEventListener('popstate', (event) => {
    if (!window.location.hash.startsWith('#product-')) {
        productModal.classList.add('hidden'); activeProduct = null;
    } else {
        const productId = parseInt(window.location.hash.substring(9));
        const product = products.find(p => p.id === productId);
        if (product && productModal.classList.contains('hidden')) { showProductModal(product); }
    }
});

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    productContainer.innerHTML = skeletonCardHTML.repeat(products.length < 6 ? products.length * 2 : 6);
    setTimeout(() => { filterSortAndRender(); }, 500);
    if(window.location.hash.startsWith('#product-')) {
        const productId = parseInt(window.location.hash.substring(9));
        const product = products.find(p => p.id === productId);
        if (product) { setTimeout(() => showProductModal(product), 100); }
        else { history.replaceState(null, '', window.location.pathname + window.location.search); }
    }
});

// --- Service Worker Registration ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => { console.log('✅ Service Worker registered!'); })
      .catch(error => { console.log('❌ Service Worker registration failed:', error); });
  });
}