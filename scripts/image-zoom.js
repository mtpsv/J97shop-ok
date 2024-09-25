function zoomImage(event) {
  const image = event.currentTarget;
  const zoomer = document.createElement('div');
  zoomer.className = 'img-zoomer';
  zoomer.style.backgroundImage = `url(${image.src})`;
  
  // Calculate zoomer position
  const rect = image.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width * 100;
  const y = (event.clientY - rect.top) / rect.height * 100;
  zoomer.style.backgroundPosition = `${x}% ${y}%`;
  
  // Add zoomer to DOM
  image.parentElement.appendChild(zoomer);
}

function resetZoom(event) {
  const zoomer = event.currentTarget.parentElement.querySelector('.img-zoomer');
  if (zoomer) {
    zoomer.remove();
  }
}


// Zoom dạng block

// function zoomImage(e) {
//   const container = e.currentTarget.parentElement;
//   const img = e.currentTarget;
//   const lens = container.querySelector('.img-zoomer') || createLens(container);
  
//   const rect = img.getBoundingClientRect();
//   const x = e.clientX - rect.left;
//   const y = e.clientY - rect.top;
  
//   const percentX = (x / img.offsetWidth) * 100;
//   const percentY = (y / img.offsetHeight) * 100;
  
//   lens.style.backgroundImage = `url(${img.src})`;
//   lens.style.backgroundPosition = `${percentX}% ${percentY}%`;
//   lens.style.left = `${x - lens.offsetWidth / 2}px`;
//   lens.style.top = `${y - lens.offsetHeight / 2}px`;
// }

// // Hàm tạo lens cho zoom (giữ nguyên như cũ)
// function createLens(container) {
//   const lens = document.createElement('div');
//   lens.classList.add('img-zoomer');
//   container.appendChild(lens);
//   return lens;
// }

// // Hàm reset zoom (giữ nguyên như cũ)
// function resetZoom(e) {
//   const container = e.currentTarget.parentElement;
//   const lens = container.querySelector('.img-zoomer');
//   if (lens) {
//       lens.remove();
//   }
// }