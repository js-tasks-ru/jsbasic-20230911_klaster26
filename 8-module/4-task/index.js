import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!Boolean(product)) {
      return;
    }
    let dishNames = [];
    if (this.cartItems.length == 0) {
      let temp = {};
      temp.product = product;
      temp.count = 1;
      this.cartItems.push(temp);
    } else {
      for (let dish of this.cartItems) {
        if (dish.product.name) {
          dishNames.push(dish.product.name);
        }
      }
      if (!dishNames.includes(product.name)) {
        let temp = {};
        temp.product = product;
        temp.count = 1;
        this.cartItems.push(temp);
      } else {
        for (let dish of this.cartItems) {
          if (dish.product.name == product.name) {
            dish.count += 1;
          }
        }
      }
    }
    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id == productId) {
        this.cartItems[i].count += amount;
      }
      if (this.cartItems[i].count == 0) {
        this.cartItems.splice(i, 1);
      }
    }
    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    let result = 0;
    for (let dish of this.cartItems) {
      result += dish.count;
    }
    return result;
  }

  getTotalPrice() {
    let result = 0;
    for (let dish of this.cartItems) {
      result += dish.product.price * dish.count;
    }
    return result;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  #modalTemplate() {
    let modalDiv = document.createElement('div');
    this.cartItems.map((dish) => modalDiv.append(this.renderProduct(dish.product, dish.count)));
    modalDiv.append(this.renderOrderForm());
    return modalDiv;
  }

  #countChange = (event) => {
    const minusButton = Array.from(document.querySelectorAll('.cart-counter__button_minus'));
    const plusButton = Array.from(document.querySelectorAll('.cart-counter__button_plus'));
    if (minusButton.includes(event.target) || minusButton.includes(event.target.parentElement)) {
      for (let dish of this.cartItems) {
        if (dish.product.id == event.target.closest('.cart-product').dataset.productId) {
          this.updateProductCount(dish.product.id, -1);
        }
        if (dish.count == 0) {
          event.target.closest('.cart-product').remove();
        }
      }
    }
    if (plusButton.includes(event.target) || plusButton.includes(event.target.parentElement)) {
      for (let dish of this.cartItems) {
        if (dish.product.id == event.target.closest('.cart-product').dataset.productId) {
          this.updateProductCount(dish.product.id, 1);
        }
      }
    }
  }

  renderModal = () => {
    const modal = new Modal();
    modal.open();
    const modalDOM = document.querySelector('.modal');
    modal.setTitle('Your order');
    modal.setBody(this.#modalTemplate());
    modalDOM.addEventListener('click', this.#countChange);
    modalDOM.querySelector('.cart-form').addEventListener('submit', this.onSubmit);
    this.#closeModal = modal.close;
    this.#modalTitle = modal.setTitle;
    this.#modalBody = modal.setBody;
  }

  #modalTitle;
  #modalBody;
  #closeModal;

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (document.body.classList.contains('is-modal-open')) {
      let totalValue = 0;
      let modalBody = document.querySelector('.modal');
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      for (let dish of cartItem) {
        let productId = dish.product.id;
        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        productCount.innerHTML = dish.count;
        productPrice.innerHTML = `€${(dish.count * dish.product.price).toFixed(2)}`;
        totalValue += +(dish.count * dish.product.price).toFixed(2);
      }
      infoPrice.innerHTML = `€${totalValue.toFixed(2)}`;
      if (this.cartItems.length == 0) {
        this.#closeModal();
      }
    }
  }

  #successMessage() {
    return createElement(
      `<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`);
  }

  #failMessage() {
    return createElement(
      `<div class="modal__body-inner">
        <h3>
          There is some problem!<br>
          Sorry, seems to be the hardest world :(<br>
          Try again later!
        </h3>
      </div>`);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const form = document.querySelector('.cart-form');
    const formData = new FormData(form);
    const responsePromise = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    });
    document.querySelector('[type="submit"]').classList.add('is-loading');
    responsePromise.then((response) => {
      this.cartItems.splice(0, this.cartItems.length);
      this.cartIcon.update(this);
      this.#modalTitle('Success!');
      this.#modalBody(this.#successMessage());
    });
    responsePromise.catch((response) => {
      this.#modalTitle('Error!');
      this.#modalBody(this.#failMessage());
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
