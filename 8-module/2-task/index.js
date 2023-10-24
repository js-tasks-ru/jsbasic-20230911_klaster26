import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null;

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
  }

  #render() {
    this.elem = createElement(
      `<div class="products-grid">
          <div class="products-grid__inner">
          </div>
        </div>`);
    this.elem.firstElementChild.append(...this.#template());
  }

  #template() {
    let template = [];
    for (let dish of this.products) {
      let card = new ProductCard(dish).elem;
      card.dataset.category = dish.category;
      card.dataset.spiciness = dish.spiciness;
      if (dish.nuts) {
        card.dataset.nuts = dish.nuts;
      }
      if (dish.vegeterian) {
        card.dataset.vegeterian = dish.vegeterian;
      }
      template.push(card);
    }
    return template;
  }

  updateFilter(filters) {
    for (let dish of this.elem.querySelectorAll('.card')) {
      if (filters.noNuts) {
        if (dish.dataset.nuts) {
          dish.remove();
        }
      }
      if (filters.vegeterianOnly) {
        if (!dish.dataset.vegeterian) {
          dish.remove();
        }
      }
      if (filters.maxSpiciness) {
        if (Number(dish.dataset.spiciness) > filters.maxSpiciness) {
          dish.remove();
        }
      }
      if (filters.category) {
        if (dish.dataset.category != filters.category) {
          dish.remove();
        }
      }
    }
  }
}
