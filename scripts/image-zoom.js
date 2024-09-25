function zoomImage(event) {
  const image = event.currentTarget;
  const zoomer = document.createElement('div');
  zoomer.className = 'img-zoomer';
  zoomer.style.backgroundImage = `url(${image.src})`;
  
  // Tính toán vị trí của zoomer
  const x = event.offsetX / image.offsetWidth * 100;
  const y = event.offsetY / image.offsetHeight * 100;
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
  
  // Thêm zoomer vào DOM
  image.parentElement.appendChild(zoomer);
}

function resetZoom(event) {
  const zoomer = event.currentTarget.parentElement.querySelector('.img-zoomer');
  if (zoomer) {
      zoomer.remove();
  }
}

// Thêm styles cho zoomer
const style = document.createElement('style');
style.textContent = `
  .img-zoomer {
      position: absolute;
      top: 0;
      left: 100%;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 800%;
      z-index: 10;
  }
`;
document.head.appendChild(style);