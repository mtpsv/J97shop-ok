let isDetailsOpen = false;

function createProductDetailsBanner() {
    const banner = document.createElement('div');
    banner.id = 'productDetailsBanner';
    banner.className = 'product-details-banner';
    banner.innerHTML = `
        <div class="product-details-content">
            <button id="closeProductDetails" class="close-button">&times;</button>
            <div id="productDetailsContent"></div>
        </div>
    `;
    document.body.appendChild(banner);
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const productDetailsContent = document.getElementById('productDetailsContent');
    const productDetailsBanner = document.getElementById('productDetailsBanner');
  
    if (product) {
        productDetailsContent.innerHTML = `
            <h2>${product.name}</h2>
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}" id="product-image">
            </div>
            <p>${product.description}</p>
            <p>Giá: ${product.price.toLocaleString('vi-VN')} VNĐ</p>
            <div class="customer-reviews">
                <h3>Đánh giá của khách hàng</h3>
                <p>Chưa có đánh giá nào.</p>
            </div>
            <button class="button3in1" onclick="addToWishlist(${product.id})">Thêm vào yêu thích</button>
            <button class="button3in1" onclick="compareProduct(${product.id})">So sánh</button>
        `;
    
        productDetailsBanner.style.display = 'block';
        setTimeout(() => {
          productDetailsBanner.classList.add('show');
          isDetailsOpen = true;
        }, 10);
    
        // Thêm chức năng zoom ảnh
        const productImage = document.getElementById('product-image');
        productImage.addEventListener('mousemove', zoomImage);
        productImage.addEventListener('mouseleave', resetZoom);
    }
}

function closeProductDetails() {
  const productDetailsBanner = document.getElementById('productDetailsBanner');
  productDetailsBanner.classList.remove('show');
  productDetailsBanner.classList.add('hide');
  isDetailsOpen = false;
  setTimeout(() => {
    productDetailsBanner.style.display = 'none';
    productDetailsBanner.classList.remove('hide');
  }, 300);
}

// Xử lý sự kiện khi trang được tải
window.addEventListener('load', () => {
    createProductDetailsBanner();
    
    const productDetailsBanner = document.getElementById('productDetailsBanner');
    const closeButton = document.getElementById('closeProductDetails');
  
    // Xử lý click cho nút đóng
    closeButton.addEventListener('click', closeProductDetails);

    // Xử lý click bên ngoài để đóng
    document.addEventListener('click', (e) => {
        if (isDetailsOpen && !productDetailsBanner.querySelector('.product-details-content').contains(e.target) && !e.target.closest('.product-item')) {
            closeProductDetails();
        }
    });

    // Ngăn chặn sự kiện click trong .product-details-content lan truyền ra ngoài
    productDetailsBanner.querySelector('.product-details-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
});