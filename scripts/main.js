// Dữ liệu sản phẩm mẫu
const products = [
  { id: 1, category: "Đồng hồ", name: "Đồng hồ XYZ", price: 100000, image: "images/Watch1.jpg", description: "Đồng hồ xyz ...." },
  { id: 2, category: "Đồng hồ", name: "Đồng hồ 🍎", price: 200000, image: "images/Watch2.jpg", description: "Đồng hồ app" },
  { id: 3, category: "Đồng hồ", name: "Đồng hồ ABC", price: 300000, image: "images/Watch3.jpg", description: "Đồng hồ abc...." },
  { id: 4, category: "Khác", name: "Lightstick J97", price: 1997000, image: "images/lightstickj97.jpg", description: "???" },
  { id: 5, category: "Điện thoại", name: "Điện thoại xxx", price: 5000000, image: "images/iphone16promax-1tb.jpg", description: "Điện thoại thông minh...." },
  { id: 6, category: "Điện thoại", name: "Điện thoại cơ bản ABC", price: 500000, image: "images/phone2.jpg", description: "Điện thoại an🥒" },
];

// Hiển thị danh sách sản phẩm
function displayProducts(productsToShow = products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  if (productsToShow.length === 0) {
    // Không tìm thấy sản phẩm nào
    const noResultsElement = document.createElement('div');
    noResultsElement.classList.add('no-results');
    noResultsElement.innerHTML = `
      <img src="images/no-result-search.png" alt="Không tìm thấy sản phẩm" style="max-width: 200px; margin-bottom: 20px;">
      <p style="font-size: 18px; color: #666;">Không tìm thấy sản phẩm nào</p>
    `;
    productList.appendChild(noResultsElement);
  } else {
    // Hiển thị sản phẩm như bình thường
    productsToShow.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');
      productElement.innerHTML = `
        <div class="image-container">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>Giá: ${product.price.toLocaleString('vi-VN')} VNĐ</p>
          <p>Loại: ${product.category}</p>
          <button onclick="showProductDetails(${product.id})">Xem chi tiết</button>
          <button onclick="addToWishlist(${product.id})">Thêm vào yêu thích</button>
          <button onclick="compareProduct(${product.id})">So sánh</button>
        </div>
      `;
      productList.appendChild(productElement);
    });
  }
}

// Khởi tạo trang web
function initializeWebsite() {
  displayProducts();
  setupSearchAndFilter();
}

// Gọi hàm khởi tạo khi trang web được tải
window.onload = initializeWebsite;