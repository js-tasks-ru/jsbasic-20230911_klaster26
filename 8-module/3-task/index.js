export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

