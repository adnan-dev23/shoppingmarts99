const products = [
  { 
    id: 1, 
    name: "Denver Perfume – Pack of 3 (50ml each)", 
    price: 239, 
    mrp: 599, 
    rating: "4.6 ★", 
    category: "Perfumes",
    isNew: true, // Tag for 'NEW'
    description: `Premium Denver Perfume Pack of 3 — perfect for men.
Long-lasting fragrance, ideal for daily use or gifting 🎁

<strong>✅ Key Features:</strong>
- 3 Bottles × 50ml each (Total 150ml)
- perfect for men
- Made in India 🇮🇳

<strong>🧾 Product Details:</strong>
- Brand: Denver
- Type: Eau De Parfum`, 
    images: ["Images/perfumes/denver/1.jpg", "Images/perfumes/denver/2.jpg", "Images/perfumes/denver/3.jpg", "Images/perfumes/denver/4.jpg"] 
  },
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

<strong>✅ Key Features:</strong>
- Bright LED Digital Display
- Soft & Durable Rubber Strap 
- Made in India 🇮🇳

<strong>📏 Dimensions:</strong>
- Width: 4 cm, Height: 2 cm, Length: 20 cm

<strong>📦 Packaging:</strong>
- Premium box packed (2 Watch)

<strong>🧾 Product Details:</strong>
- Type: LED Digital Watch
- Display: Time & Date`,
    images: ["Images/watches/led watch/1.jpg", "Images/watches/led watch/2.jpg", "Images/watches/led watch/3.jpg"]
  }
];

const categories = ["All", "Perfumes", "Watches"];

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

// --- LIKE BUTTON LOGIC ---
let likedProductIds = new Set(JSON.parse(localStorage.getItem('likedProducts') || '[]'));
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
// --- END LIKE LOGIC ---

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
        
        card.innerHTML = `
            ${product.isNew ? '<span class="product-tag">NEW</span>' : ''} 
            <button class="like-button ${isLiked ? 'liked' : ''}" data-product-id="${product.id}" title="Like">
                <i class="${isLiked ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <img src="${product.images[0]}" alt="${product.name}" class="product-image">
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
    categories.forEach(category => {
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
        categoryBar.querySelector('.active').classList.remove('active');
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
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 }); 

// --- Back to Top Button Logic ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { 
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});
backToTopButton.addEventListener('click', () => {
    window.scrollTo(0, 0); 
});

// --- Modal Functions ---
function updateSlider() {
    if (!activeProduct) return;
    const mainImage = modalBody.querySelector('#main-product-image');
    const thumbnails = modalBody.querySelectorAll('.thumbnail');
    mainImage.src = activeProduct.images[currentImageIndex];
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function showProductModal(product) {
  activeProduct = product;
  currentImageIndex = 0;
  const thumbnailsHtml = activeProduct.images.map((imgSrc, index) => `<img src="${imgSrc}" class="thumbnail" data-index="${index}">`).join('');
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  modalBody.innerHTML = `
    <div class="image-gallery">
        <div class="main-image-container"><img src="${activeProduct.images[0]}" id="main-product-image" alt="${activeProduct.name}"></div>
        <div class="thumbnail-container">${thumbnailsHtml}</div>
    </div>
    <div class="product-info">
        <h3 class="product-title">${activeProduct.name}</h3>
        <div class="price-container">
            <span class="final-price">₹${activeProduct.price}</span>
            <span class="mrp">₹${activeProduct.mrp}</span>
            <span class="discount">${discount}% OFF</span>
        </div>
        <p class="rating">${activeProduct.rating}</p>
        <div class="description">${activeProduct.description}</div>
        <button class="buy-btn">🛒 Buy Now</button>
    </div>
  `;
  productModal.classList.remove('hidden');
  updateSlider();
  history.pushState({ productId: product.id }, '', `#product-${product.id}`);
}

function hideProductModal() { 
    productModal.classList.add('hidden'); 
    activeProduct = null;
    if(window.location.hash.startsWith('#product-')) {
       history.back(); 
    }
}

function showCustomerFormModal() { customerFormModal.classList.remove('hidden'); }
function hideCustomerFormModal() { customerFormModal.classList.add('hidden'); }

// --- Event Listeners for Modals ---
productContainer.addEventListener('click', (event) => {
  // Check if like button was clicked
  if (event.target.closest('.like-button')) {
      const button = event.target.closest('.like-button');
      handleLikeClick(button.dataset.productId, button);
      event.stopPropagation(); // Prevent modal from opening
      return; 
  }
  
  // Otherwise, open modal
  const card = event.target.closest('.product-card');
  if (card) {
    const productId = parseInt(card.dataset.productId);
    const product = products.find(p => p.id === productId);
    if (product) showProductModal(product);
  }
});

productModal.addEventListener('click', (event) => {
  if (!activeProduct) return;
  if (event.target.classList.contains('buy-btn')) { /* Keep history */ showCustomerFormModal(); return; } 
  if (event.target.classList.contains('thumbnail')) { currentImageIndex = parseInt(event.target.dataset.index); updateSlider(); }
  if (event.target.classList.contains('close-btn') || event.target === productModal) { hideProductModal(); }
});

customerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const pincode = document.getElementById('customer-pincode').value;
    const your_whatsapp_number = "919503780721";
    const message = `*New Order from ShoppingMarts99*\n\n*PRODUCT DETAILS:*\n- Name: ${activeProduct.name}\n- Price: ₹${activeProduct.price}\n\n*CUSTOMER DETAILS:*\n- Full Name: ${name}\n- Phone No: ${phone}\n- Address: ${address}\n- Pincode: ${pincode}`;
    window.open(`https://wa.me/${your_whatsapp_number}?text=${encodeURIComponent(message.trim())}`, '_blank');
    customerForm.reset();
    hideCustomerFormModal();
    hideProductModal(); // Hide product modal after order
});

customerFormModal.addEventListener('click', (event) => {
  if (event.target.classList.contains('close-btn') || event.target === customerFormModal) { hideCustomerFormModal(); }
});

window.addEventListener('popstate', () => {
    if (!window.location.hash.startsWith('#product-')) {
        productModal.classList.add('hidden'); 
        activeProduct = null;
    }
});

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    productContainer.innerHTML = skeletonCardHTML.repeat(6); 
    setTimeout(() => {
        filterSortAndRender(); 
    }, 500); 

    if(window.location.hash.startsWith('#product-')) {
        const productId = parseInt(window.location.hash.substring(9));
        const product = products.find(p => p.id === productId);
        if (product) {
            showProductModal(product); 
        }
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