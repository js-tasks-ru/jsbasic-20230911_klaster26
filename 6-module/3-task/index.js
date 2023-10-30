import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;
  constructor(slides) {
    this.slides = slides;
    this.#render();
    this.#carouselAnimator();

  }

  #template = () => {
    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        ${this.#tableContentMaker(this.slides)}
        </div>
      </div>
    `;
  }

  #render = () => {
    this.elem = createElement(this.#template());

  }

  #tableContentMaker = (arr) => {
    return arr.map((dish) => (`
        <div class="carousel__slide" data-id="${dish.id}">
          <img src="/assets/images/carousel/${dish.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${dish.price.toFixed(2)}</span>
            <div class="carousel__title">${dish.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
    `)).join('\n');
  }

  #carouselAnimator = () => {
    let initPosition = 0;
    const wholeCarousel = this.elem.closest('.carousel');
    const rightStringDiv = this.elem.querySelector('.carousel__arrow_right');
    const leftStringDiv = this.elem.querySelector('.carousel__arrow_left');
    const carouselInner = this.elem.querySelector('.carousel__inner');

    if (initPosition >= 0) {
      leftStringDiv.style.display = 'none';
    }

    wholeCarousel.addEventListener('click', (event) => {
      if (event.target == rightStringDiv || event.target.parentElement == rightStringDiv) {
        carouselInner
        .style.transform = `translateX(${initPosition - carouselInner.offsetWidth}px)`;
        initPosition -= carouselInner.offsetWidth;
      }

      if (event.target == leftStringDiv || event.target.parentElement == leftStringDiv) {
        carouselInner
        .style.transform = `translateX(${initPosition + carouselInner.offsetWidth}px)`;
        initPosition += carouselInner.offsetWidth;
      }

      if (initPosition <= -carouselInner.offsetWidth * (carouselInner.querySelectorAll('.carousel__slide').length - 1)) {
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

    for (let elem of this.elem.querySelectorAll('.carousel__button')) {
      elem.addEventListener('click', () => {
        elem.dispatchEvent(new CustomEvent("product-add", {
          detail: elem.closest('.carousel__slide').dataset.id,
          bubbles: true,
        }));
      });
    }
  }
}
