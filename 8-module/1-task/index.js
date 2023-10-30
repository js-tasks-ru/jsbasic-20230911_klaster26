import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  #cartTopCoord;
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      if (!this.#cartTopCoord && this.elem.offsetHeight) {
        this.#cartTopCoord = document.querySelector('.cart-icon__inner').getBoundingClientRect().top + window.scrollY
        || this.#cartTopCoord;
      }

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetHeight) {
      if (document.documentElement.clientWidth <= 767) {
        Object.assign(this.elem.style, {
          position: '',
          top: '',
          left: '',
          zIndex: ''
        });
      }
      let leftPos = Math.min(
        (document.querySelector('.container').getBoundingClientRect().right + 20),
        (document.documentElement.clientWidth - this.elem.offsetWidth - 10)
      );
      if (this.#cartTopCoord < window.scrollY) {
        Object.assign(this.elem.style, {
          position: 'fixed',
          top: '50px',
          zIndex: 1e3,
          right: '10px',
          left: `${leftPos}px`});
        return;
      }
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }
  }
}

