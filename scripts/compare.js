// Mảng chứa sản phẩm để so sánh
let productsToCompare = [];

// Thêm HTML cho modal vào body
document.body.insertAdjacentHTML('beforeend', `
  <div id="compareModal" class="compare-modal">
    <div class="compare-overlay"></div>
    <div class="compare-content">
      <div class="compare-header">
        <h2>So sánh sản phẩm</h2>
        <button class="close-button">&times;</button>
      </div>
      <div class="compare-body">
        <table class="compare-table">
          <thead>
            <tr>
              <th>Thông tin</th>
              <td class="product-column">Sản phẩm 1</td>
              <td class="product-column">Sản phẩm 2</td>
            </tr>
          </thead>
          <tbody>
            <!-- Nội dung so sánh sẽ được thêm vào đây -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
`);

// Xử lý sự kiện so sánh sản phẩm
function compareProduct(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    if (productsToCompare.length >= 2) {
        productsToCompare = [];
    }
    
    if (!productsToCompare.find(p => p.id === product.id)) {
        productsToCompare.push(product);
        if (productsToCompare.length === 2) {
            const modal = document.getElementById('compareModal');
            
            // Hiển thị modal trước khi thêm class active
            modal.style.display = 'block';
            
            // Force reflow
            modal.offsetHeight;
            
            // Sau đó mới thêm nội dung và class active
            showComparison();
        }
    }
}

// Sửa lại hàm showComparison
function showComparison() {
    const modal = document.getElementById('compareModal');
    const tbody = modal.querySelector('tbody');
    
    // Tạo nội dung so sánh
    tbody.innerHTML = `
        <tr>
            <th>Hình ảnh</th>
            ${productsToCompare.map(product => `
                <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
            `).join('')}
        </tr>
        <tr>
            <th>Tên sản phẩm</th>
            ${productsToCompare.map(product => `
                <td class="highlight">${product.name}</td>
            `).join('')}
        </tr>
        <tr>
            <th>Giá</th>
            ${productsToCompare.map(product => `
                <td class="highlight">${product.price.toLocaleString('vi-VN')} VNĐ</td>
            `).join('')}
        </tr>
        <tr>
            <th>Danh mục</th>
            ${productsToCompare.map(product => `
                <td class="highlight">${product.category}</td>
            `).join('')}
        </tr>
        <tr>
            <th>Mô tả</th>
            ${productsToCompare.map(product => `
                <td class="highlight">${product.description}</td>
            `).join('')}
        </tr>
    `;

    // Thêm class active để kích hoạt animation
    modal.classList.add('active');
}

// Sửa lại hàm đóng modal
function closeCompareModal() {
    const modal = document.getElementById('compareModal');
    modal.classList.add('closing');
    
    setTimeout(() => {
        modal.classList.remove('active');
        modal.classList.remove('closing');
        modal.style.display = 'none';
        productsToCompare = [];
    }, 300);
}

// Thiết lập các event listener
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('compareModal');
    const closeButton = modal.querySelector('.close-button');
    const overlay = modal.querySelector('.compare-overlay');

    // Đóng modal khi click nút close
    closeButton.addEventListener('click', closeCompareModal);

    // Đóng modal khi click outside
    overlay.addEventListener('click', closeCompareModal);

    // Ngăn chặn việc đóng modal khi click vào nội dung
    modal.querySelector('.compare-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
});