function setupSearchAndFilter() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const filterOptions = document.getElementById('filter-options');
  
    // Thêm các tùy chọn lọc
    filterOptions.innerHTML = `
      <select id="price-filter">
        <option value="">Tất cả giá</option>
        <option value="0-99999">0 - 99,999 VNĐ</option>
        <option value="100000-199999">100,000 - 199,999 VNĐ</option>
        <option value="200000-299999">200,000 - 299,999 VNĐ</option>
        <option value="300000+">300,000+ VNĐ</option>
      </select>
      <select id="category-filter">
        <option value="">Tất cả loại</option>
        ${[...new Set(products.map(p => p.category))].map(category => 
          `<option value="${category}">${category}</option>`
        ).join('')}
      </select>
    `;
  
    // Tìm kiếm bằng button và Enter
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        performSearch();
      }
    });
  
    // Tìm kiếm real-time
    searchInput.addEventListener('input', performSearch);
    document.getElementById('price-filter').addEventListener('change', performSearch);
    document.getElementById('category-filter').addEventListener('change', performSearch);
  
    function performSearch() {
      const searchTerm = searchInput.value.toLowerCase();
      const priceFilter = document.getElementById('price-filter').value;
      const categoryFilter = document.getElementById('category-filter').value;
  
      const filteredProducts = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm);
        let priceMatch = true;
        let categoryMatch = true;
  
        if (priceFilter) {
            if (priceFilter === '0-99999') {
              priceMatch = product.price >= 0 && product.price <= 99999;
            } else if (priceFilter === '100000-199999') {
              priceMatch = product.price >= 100000 && product.price <= 199999;
            } else if (priceFilter === '200000-299999') {
              priceMatch = product.price >= 200000 && product.price <= 299999;
            } else if (priceFilter === '300000+') {
              priceMatch = product.price >= 300000;
            }
            // Thêm các khoảng giá mới ở đây nếu cần
        }
  
        if (categoryFilter) {
          categoryMatch = product.category === categoryFilter;
        }
  
        return nameMatch && priceMatch && categoryMatch;
      });
  
      displayProducts(filteredProducts);
    }
  }
  
  document.addEventListener('DOMContentLoaded', setupSearchAndFilter);