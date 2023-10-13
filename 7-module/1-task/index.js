import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;

  constructor(categories) {
    this.categories = categories;
    this.#render();
    this.#carouselAnimator();
    this.#eventMaker();
  }

  #render() {
    this.elem = createElement(this.#template());
  }

  #template() {
    return `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
        ${this.#elemContentMaker(this.categories)}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`
  }

  #elemContentMaker = (arr) => {
    return arr.map((dish) => (`
        <a href="#" class="ribbon__item" data-id="${dish.id}">${dish.name}</a>
    `)).join('\n');
  }

  #carouselAnimator = () => {
    const wholeRibbon = this.elem.closest('.ribbon');
    const rightString = this.elem.querySelector('.ribbon__arrow_right');
    const leftString = this.elem.querySelector('.ribbon__arrow_left');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');


    ribbonInner.addEventListener('scroll', () => {
      if (ribbonInner.scrollLeft == 0) {
        leftString.classList.remove('ribbon__arrow_visible');
      } else {
        leftString.classList.add('ribbon__arrow_visible');
      }})

    ribbonInner.addEventListener('scroll', () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollRight == 0) {
        rightString.classList.remove('ribbon__arrow_visible');
      } else {
        rightString.classList.add('ribbon__arrow_visible');
      }})

    wholeRibbon.addEventListener('click', (event) => {
      if (event.target == rightString || event.target == rightString.firstElementChild) {
        ribbonInner.scrollBy(350, 0);

      }
      if (event.target == leftString || event.target == leftString.firstElementChild) {
        ribbonInner.scrollBy(-350, 0);
      };
    });
  }

  #eventMaker = () => {
    const rightString = this.elem.querySelector('.ribbon__arrow_right');
    const leftString = this.elem.querySelector('.ribbon__arrow_left');
    this.elem.addEventListener ('click', () => {
      event.preventDefault();
      event.target.dispatchEvent(this.#onClickEvent());
      for (let elem of this.elem.querySelectorAll ('.ribbon__item')) {
        elem.classList.remove('ribbon__item_active');
      }
      if (event.target != rightString && event.target != leftString) {
      event.target.classList.add('ribbon__item_active');
      }
      //console.log(event.target.dataset.id); // В консоль логируется data-id выбранного элемента.
      //console.log(this.#onClickEvent() instanceof CustomEvent); // В консоль логируется true, событие произошло от CustomEvent.
      //console.log ((this.#onClickEvent())); // В консоль логириуется событие с соответствующим выбранному элементу значением details.
    });
  }

  #onClickEvent = () => {
    return new CustomEvent("product-add", {
    detail: event.target.dataset.id,
    bubbles: true,
    });
  }
}
