let wishlist = [];

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        updateWishlistDisplay();
        saveWishlistToLocalStorage();
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(product => product.id !== productId);
    updateWishlistDisplay();
    saveWishlistToLocalStorage();
}

function updateWishlistDisplay() {
    const wishlistSection = document.getElementById('wishlist') || document.createElement('section');
    wishlistSection.id = 'wishlist';
    wishlistSection.innerHTML = `
        <h2>Danh sách yêu thích</h2>
        ${wishlist.length > 0 ? `
            <ul>
                ${wishlist.map(product => `
                    <li>
                        ${product.name} - ${product.price.toLocaleString('vi-VN')} VNĐ
                        <button onclick="removeFromWishlist(${product.id})">Xóa</button>
                    </li>
                `).join('')}
            </ul>
        ` : '<p>Danh sách yêu thích trống</p>'}
    `;
    
    if (!document.getElementById('wishlist')) {
        document.querySelector('main').appendChild(wishlistSection);
    }
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

// Gọi hàm này khi trang web được tải
window.addEventListener('load', loadWishlistFromLocalStorage);