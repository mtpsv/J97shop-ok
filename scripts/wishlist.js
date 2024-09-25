let wishlist = [];

function createWishlistBanner() {
    const banner = document.createElement('div');
    banner.id = 'wishlistBanner';
    banner.className = 'wishlist-banner';
    banner.innerHTML = `
        <div class="wishlist-content">
            <h2>Danh sách yêu thích</h2>
            <ul id="wishlistItems"></ul>
        </div>
        <button id="closeBanner" class="close-button">&times;</button>
    `;
    document.body.appendChild(banner);
}

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        updateWishlistDisplay();
        saveWishlistToLocalStorage();
    }
}

function removeFromWishlist(productId, event) {
    event.stopPropagation(); // Ngăn sự kiện click lan tỏa
    wishlist = wishlist.filter(product => product.id !== productId);
    updateWishlistDisplay();
    saveWishlistToLocalStorage();
}

function updateWishlistDisplay() {
    const wishlistItems = document.getElementById('wishlistItems');
    wishlistItems.innerHTML = wishlist.length > 0 
        ? wishlist.map((product, index) => `
            <li>
                <span class="wishlist-index">${index + 1}</span>
                <img src="${product.image}" alt="${product.name}" class="wishlist-image">
                <div class="wishlist-details">
                    <h3>${product.name}</h3>
                    <p>${product.price.toLocaleString('vi-VN')} VNĐ</p>
                </div>
                <button onclick="removeFromWishlist(${product.id}, event)">Xóa</button>
            </li>
        `).join('')
        : '<li>Danh sách yêu thích trống</li>';
}

function saveWishlistToLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function loadWishlistFromLocalStorage() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
        updateWishlistDisplay();
    }
}

function showWishlistBanner() {
    const banner = document.getElementById('wishlistBanner');
    banner.style.display = 'block';
    setTimeout(() => {
        banner.classList.add('show');
    }, 10);
    updateWishlistDisplay();
}

function hideWishlistBanner() {
    const banner = document.getElementById('wishlistBanner');
    banner.classList.remove('show');
    banner.classList.add('hide');
    setTimeout(() => {
        banner.style.display = 'none';
        banner.classList.remove('hide');
    }, 300);
}

// Event Listeners
window.addEventListener('load', () => {
    createWishlistBanner();
    loadWishlistFromLocalStorage();
    
    document.getElementById('wishlistButton').addEventListener('click', (e) => {
        e.preventDefault();
        showWishlistBanner();
    });

    document.getElementById('closeBanner').addEventListener('click', hideWishlistBanner);

    // Sử dụng event delegation cho các nút trong banner
    document.getElementById('wishlistBanner').addEventListener('click', (e) => {
        if (e.target.id === 'closeBanner') {
            hideWishlistBanner();
        }
    });

    // Xử lý click bên ngoài banner
    document.addEventListener('click', (e) => {
        const banner = document.getElementById('wishlistBanner');
        const wishlistButton = document.getElementById('wishlistButton');
        if (e.target !== banner && !banner.contains(e.target) && e.target !== wishlistButton && !wishlistButton.contains(e.target)) {
            hideWishlistBanner();
        }
    });
});