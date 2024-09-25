function setupSearchAndFilter() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const filterOptions = document.getElementById('filter-options');

  // Thêm các tùy chọn lọc
  filterOptions.innerHTML = `
      <select id="price-filter">
          <option value="">Tất cả giá</option>
          <option value="0-100000">0 - 100,000 VNĐ</option>
          <option value="100000-200000">100,000 - 200,000 VNĐ</option>
          <option value="200000+">200,000+ VNĐ</option>
      </select>
  `;

  //Tìm kiếm bằng button
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
  });
  document.getElementById('price-filter').addEventListener('change', performSearch);

  function performSearch() {
      const searchTerm = searchInput.value.toLowerCase();
      const priceFilter = document.getElementById('price-filter').value;

      const filteredProducts = products.filter(product => {
          const nameMatch = product.name.toLowerCase().includes(searchTerm);
          let priceMatch = true;

          if (priceFilter) {
              const [min, max] = priceFilter.split('-').map(Number);
              if (max) {
                  priceMatch = product.price >= min && product.price < max;
              } else {
                  priceMatch = product.price >= min;
              }
          }

          return nameMatch && priceMatch;
      });

      displayProducts(filteredProducts);
  }

//Tìm kiếm real time
searchInput.addEventListener('input', performSearch);
document.getElementById('price-filter').addEventListener('change', performSearch);

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const priceFilter = document.getElementById('price-filter').value;

    const filteredProducts = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm);
        let priceMatch = true;

        if (priceFilter) {
            const [min, max] = priceFilter.split('-').map(Number);
            if (max) {
                priceMatch = product.price >= min && product.price < max;
            } else {
                priceMatch = product.price >= min;
            }
        }

        return nameMatch && priceMatch;
    });

    displayProducts(filteredProducts);
  }
}

document.addEventListener('DOMContentLoaded', setupSearchAndFilter);
