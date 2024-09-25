// Dữ liệu sản phẩm mẫu
const products = [
  { id: 1, name: "Sản phẩm 1", price: 100000, image: "images/product1.jpg", description: "Mô tả sản phẩm 1" },
  { id: 2, name: "Sản phẩm 2", price: 200000, image: "images/product2.jpg", description: "Mô tả sản phẩm 2" },
  { id: 3, name: "Sản phẩm 3", price: 300000, image: "images/product3.jpg", description: "Mô tả sản phẩm 3" },
];

// Hiển thị danh sách sản phẩm
function displayProducts(productsToShow = products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  productsToShow.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');
      productElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Giá: ${product.price.toLocaleString('vi-VN')} VNĐ</p>
          <button onclick="showProductDetails(${product.id})">Xem chi tiết</button>
          <button onclick="addToWishlist(${product.id})">Thêm vào yêu thích</button>
      `;
      productList.appendChild(productElement);
  });
}

// Khởi tạo trang web
function initializeWebsite() {
  displayProducts();
  setupSearchAndFilter();
}

// Gọi hàm khởi tạo khi trang web được tải
window.onload = initializeWebsite;