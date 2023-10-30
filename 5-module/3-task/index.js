function initCarousel() {
  let initPosition = 0;
  const rightStringDiv = document.querySelector('.carousel__arrow_right');
  const leftStringDiv = document.querySelector('.carousel__arrow_left');
  const carouselInner = document.querySelector('.carousel__inner');

  if (initPosition >= 0) {
    leftStringDiv.style.display = 'none';
  }

  document.querySelector('.carousel').addEventListener('click', (event) => {
    if (event.target.getAttribute('class') == 'carousel__arrow carousel__arrow_right'
    || event.target.parentElement.getAttribute('class') == 'carousel__arrow carousel__arrow_right') {
      carouselInner
      .style.transform = `translateX(${initPosition - carouselInner.offsetWidth}px)`;
      initPosition -= carouselInner.offsetWidth;
    }

    if (event.target.getAttribute('class') == 'carousel__arrow carousel__arrow_left'
    || event.target.parentElement.getAttribute('class') == 'carousel__arrow carousel__arrow_left') {
      carouselInner
      .style.transform = `translateX(${initPosition + carouselInner.offsetWidth}px)`;
      initPosition += carouselInner.offsetWidth;
    }

    if (initPosition <= -carouselInner.offsetWidth * 3) {
      rightStringDiv.style.display = 'none';
    } else {
      rightStringDiv.style.display = '';
    }

    if (initPosition >= 0) {
      leftStringDiv.style.display = 'none';
    } else {
      leftStringDiv.style.display = '';
    }
  });
}
