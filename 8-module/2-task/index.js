import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem;

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = null;
    this.#render();
  }

  #render() {
    this.elem = createElement(
      `<div class="products-grid">
         <div class="products-grid__inner">
         <!--карточки товаров вставлять сюда-->
         </div>
      </div>`
    );
    this.#elementContent();
  }

  #elementContent() {
    let inner = this.elem.querySelector(`.products-grid__inner`);
    inner.innerHTML = '';
    for (let dish of this.products) {
      if (this.filters.noNuts && dish.nuts) {
        continue;
      }
      if (this.filters.vegeterianOnly && !dish.vegeterian) {
        continue;
      }
      if (isFinite(this.filters.maxSpiciness) && Number(dish.spiciness) > Number(this.filters.maxSpiciness)) {
        continue;
      }
      if (this.filters.category && dish.category != this.filters.category) {
        continue;
      }
      let dishCard = new ProductCard(dish);
      dishCard.elem.dataset.category = dish.category;
      dishCard.elem.dataset.spiciness = dish.spiciness;
      inner.append(dishCard.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.#elementContent();
  }
}
