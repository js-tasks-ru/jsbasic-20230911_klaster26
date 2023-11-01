import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  #initSlider = {
    steps: 5,
    value: 3
  };
  #productFilter;
  #ribbon;
  #slider;
  #cart;
  #productsGrid;
  #productList;
  #nutsCheckbox;
  #vegCheckbox;


  constructor() {
    this.#ribbon = null;
    this.#slider = null;
    this.#productsGrid = null;
    this.#cart = null;
    this.#productList = null;
    this.#vegCheckbox = document.getElementById('vegeterian-checkbox');
    this.#nutsCheckbox = document.getElementById('nuts-checkbox');

    document.body.addEventListener('product-add', (event) => {
      for (let dish of this.#productList) {
        if (event.detail == dish.id) {
          this.#cart.addProduct(dish);
        }
      }
    });
  }

  async render() {
    document.querySelector('[data-carousel-holder]').append(await this.#carouselPromise());

    this.#ribbon = await this.#ribbonPromise();
    document.querySelector('[data-ribbon-holder]').append(this.#ribbon.elem);

    this.#slider = await this.#stepSliderPromise();
    document.querySelector('[data-slider-holder]').append(this.#slider.elem);

    const cartIcon = await this.#cartIconPromise();
    document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);

    await this.#cartPromise(cartIcon);
    this.#cart = await this.#cartPromise(cartIcon);

    this.#productList = await this.#productsList();
    this.#productsGrid = new ProductsGrid(this.#productList);
    document.querySelector('[data-products-grid-holder]').firstElementChild.replaceWith(this.#productsGrid.elem);

    this.#productFilter = {
      noNuts: this.#nutsCheckbox.checked,
      vegeterianOnly: this.#vegCheckbox.checked,
      maxSpiciness: this.#slider.value,
      category: this.#ribbon.value
    };

    this.updateFilter(this.#productFilter);

    this.#ribbon.elem.addEventListener('ribbon-select', this.ribbonUpdater);

    this.#slider.elem.addEventListener('slider-change', this.sliderUpdater);

    document.body.addEventListener('change', this.checkboxesClickUpdater);
  }

  updateFilter(products) {
    this.#productsGrid.updateFilter(products);
  }

  checkboxesClickUpdater = (event) => {
    if (event.target.getAttribute('id') == 'nuts-checkbox') {
      Object.assign(this.#productFilter, {noNuts: this.#nutsCheckbox.checked});
      this.updateFilter(this.#productFilter);
    }
    if (event.target.getAttribute('id') == 'vegeterian-checkbox') {
      Object.assign(this.#productFilter, {vegeterianOnly: this.#vegCheckbox.checked});
      this.updateFilter(this.#productFilter);
    }
  }

  ribbonUpdater = (event) => {
    Object.assign(this.#productFilter, {category: event.detail});
    this.updateFilter(this.#productFilter);
  }

  sliderUpdater = (event) => {
    Object.assign(this.#productFilter, {maxSpiciness: event.detail});
    this.updateFilter(this.#productFilter);
  }

  #carouselPromise() {
    return new Promise((resolve) => {
      resolve(new Carousel(slides).elem);
    });
  }

  #ribbonPromise() {
    return new Promise((resolve) => {
      resolve(new RibbonMenu(categories));
    });
  }

  #stepSliderPromise() {
    return new Promise((resolve) => {
      resolve(new StepSlider(this.#initSlider));
    });
  }

  #cartIconPromise() {
    return new Promise((resolve) => {
      resolve(new CartIcon());
    });
  }

  #cartPromise(arg) {
    return new Promise((resolve) => {
      resolve(new Cart(arg));
    });
  }

  async #productsList() {
    const response = await fetch('./products.json');
    return await response.json();
  }
}
