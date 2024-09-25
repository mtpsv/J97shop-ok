function showProductDetails(productId) {
  const product = products.find(p => p.id === productId);
  const productDetails = document.getElementById('product-details');
  
  if (product) {
      productDetails.innerHTML = `
          <h2>${product.name}</h2>
          <img src="${product.image}" alt="${product.name}" id="product-image">
          <p>${product.description}</p>
          <p>Giá: ${product.price.toLocaleString('vi-VN')} VNĐ</p>
          <button onclick="addToWishlist(${product.id})">Thêm vào yêu thích</button>
          <button onclick="compareProduct(${product.id})">So sánh</button>
      `;
      productDetails.style.display = 'block';
      
      // Thêm chức năng zoom ảnh
      const productImage = document.getElementById('product-image');
      productImage.addEventListener('mousemove', zoomImage);
      productImage.addEventListener('mouseleave', resetZoom);
  }
}