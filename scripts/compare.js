let productsToCompare = [];

function compareProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !productsToCompare.includes(product)) {
        productsToCompare.push(product);
        if (productsToCompare.length === 2) {
            showComparison();
        }
    }
}

function showComparison() {
    const compareSection = document.getElementById('compare-products');
    compareSection.innerHTML = `
        <h2>So sánh sản phẩm</h2>
        <table>
            <tr>
                <th>Tên sản phẩm</th>
                <td>${productsToCompare[0].name}</td>
                <td>${productsToCompare[1].name}</td>
            </tr>
            <tr>
                <th>Giá</th>
                <td>${productsToCompare[0].price.toLocaleString('vi-VN')} VNĐ</td>
                <td>${productsToCompare[1].price.toLocaleString('vi-VN')} VNĐ</td>
            </tr>
            <tr>
                <th>Mô tả</th>
                <td>${productsToCompare[0].description}</td>
                <td>${productsToCompare[1].description}</td>
            </tr>
        </table>
        <button onclick="clearComparison()">Xóa so sánh</button>
    `;
    compareSection.style.display = 'block';
}

function clearComparison() {
    productsToCompare = [];
    document.getElementById('compare-products').style.display = 'none';
}