let navbar = document.querySelector('.navbar');
let menuBtn = document.querySelector('#menu-btn');

menuBtn.onclick = () => {
  navbar.classList.toggle('active');
  menuBtn.classList.toggle('fa-times');
};

window.onscroll = () => {
  navbar.classList.remove('active');
  menuBtn.classList.remove('fa-times');
};





  document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const mainImage = document.querySelector('.main-image img');
    let currentIndex = 0;
    let autoSlideInterval;

    function changeImage(index) {
      thumbnails.forEach(t => t.classList.remove('active'));
      thumbnails[index].classList.add('active');
      mainImage.src = thumbnails[index].src;
      currentIndex = index;
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        changeImage(currentIndex);
      }, 3000);
    }

    function pauseAutoSlide() {
      clearInterval(autoSlideInterval);
      setTimeout(startAutoSlide, 5000);
    }

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        changeImage(index);
        pauseAutoSlide();
      });
    });

    if (thumbnails.length > 0) {
      changeImage(0);
      startAutoSlide();
    }
  });