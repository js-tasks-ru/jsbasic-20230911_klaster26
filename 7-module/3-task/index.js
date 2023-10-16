import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  #steps;
  #value;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#render();
    const spanArray = Array.from(this.elem.querySelector('.slider__steps').querySelectorAll('span'));
    spanArray[value].classList.add ('slider__step-active');
    this.#onClickEvent();
  }

  #render = () => {
    this.elem = createElement(this.#template());
  }

  #template = () => {
    return `
      <!--Корневой элемент слайдера-->
      <div class="slider">
        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: ${(100 / (this.#steps - 1)) * this.#value}%;">
          <span class="slider__value">${this.#value}</span>
        </div>
        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: ${(100 / (this.#steps - 1)) * this.#value}%;"></div>
        <!--Шаги слайдера-->
        <div class="slider__steps">
          ${this.#spanRender()}
        </div>
      </div>
      `
  }

  #spanRender = () => {
    let tempArray = [];
    for (let i = 0; i < this.#steps; i++) {
      tempArray[i] = '<span></span>'}
    return tempArray.join('');
  }

  #onClickEvent = () => {
    const sliderFiller = (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let stepValue = Math.round(left/(this.elem.offsetWidth) * (this.#steps - 1));
      this.elem.querySelector('.slider__value').innerHTML = stepValue;
      this.elem.querySelector('.slider__thumb').style.left = `${stepValue / (this.#steps - 1) * 100}%`;
      this.elem.querySelector('.slider__progress').style.width = `${stepValue / (this.#steps - 1) * 100}%`;
      const eventCreator = new CustomEvent('slider-change', {
          detail: stepValue,
          bubbles: true,
        })
      this.elem.dispatchEvent(eventCreator);
    }
    this.elem.addEventListener('click', sliderFiller);
  }
}
