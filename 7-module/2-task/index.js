import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #elem;
  #title;
  #body;

  constructor() {
    this.#elem = null;
    this.#title = null;
    this.#body = null;
    }

  open = () => {
    this.#render();
    document.body.classList.add('is-modal-open');
    this.#elem.querySelector('.modal__title').innerHTML = this.#title;
    this.#elem.querySelector('.modal__body').append(this.#body);
    document.body.append(this.#elem);
    this.#onClickEvent();
    this.#escapeEvent();
  }

  setTitle = (title) => {
      if(this.#elem) {
        this.#elem.querySelector('.modal__title').innerHTML = title;
      }
      return this.#title = title;
    }

  setBody = (html) => {
    if(this.#elem) {
      this.#elem.querySelector('.modal__body').remove();
      let tempElem = document.createElement('div');
      tempElem.classList.add('modal__body');
      this.#elem.querySelector('.modal__header').after(tempElem);
      this.#elem.querySelector('.modal__body').append(html);

    };
    return this.#body = html;
  }

  close = () => {
    this.#elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.#escape);
  }

  #render = () => {
    return this.#elem = createElement(this.#template());
  }

  #template = () => {
     return `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">
            </h3>
          </div>
          <div class="modal__body">
          </div>
        </div>
      </div>`

  }

  #onClickEvent = () => {
    const button = document.querySelector('.modal__close');
    button.addEventListener('click', this.close, {once: true});
    document.removeEventListener('keydown', this.#escape);
  }

  #escape = () => {
    if (event.code == 'Escape') {
      this.#elem.remove();
      document.body.classList.remove('is-modal-open');
    }
  }

  #escapeEvent = () => {
    document.addEventListener('keydown', this.#escape, {once: true});
  }
}
