import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  #steps;
  value;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.value = value;
    this.#render();
    const spanArray = Array.from(this.elem.querySelector('.slider__steps').querySelectorAll('span'));
    spanArray[value].classList.add('slider__step-active');
    this.#onClickEvent();
  }

  #render = () => {
    this.elem = createElement(this.#template());
  }

  #template = () => {
    return `
      <div class="slider">
        <div class="slider__thumb" style="left: ${(100 / (this.#steps - 1)) * this.value}%;">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress" style="width: ${(100 / (this.#steps - 1)) * this.value}%;"></div>
        <div class="slider__steps">
          ${this.#spanRender()}
        </div>
      </div>
      `;
  }

  #spanRender = () => {
    let tempArray = [];
    for (let i = 0; i < this.#steps; i++) {
      tempArray[i] = '<span></span>';}
    return tempArray.join('');
  }

  #onClickEvent = () => {
    const sliderFiller = (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let stepValue = Math.round(left / (this.elem.offsetWidth) * (this.#steps - 1));

      if (stepValue > 4) {
        stepValue = 4;
      }
      if (stepValue < 0) {
        stepValue = 0;
      }

      this.elem.querySelector('.slider__value').innerHTML = stepValue;
      this.elem.querySelector('.slider__thumb').style.left = `${stepValue / (this.#steps - 1) * 100}%`;
      this.elem.querySelector('.slider__progress').style.width = `${stepValue / (this.#steps - 1) * 100}%`;

      const eventCreator = new CustomEvent('slider-change', {
        detail: stepValue,
        bubbles: true,
      });

      this.elem.dispatchEvent(eventCreator);
    };

    const sliderMover = (event) => {
      event.preventDefault();
      this.elem.classList.add('slider_dragging');
      let position = event.clientX - this.elem.getBoundingClientRect().left;
      let positionRelative = position / this.elem.offsetWidth * 100;

      if (positionRelative > 100) {
        positionRelative = 100;
      }
      if (positionRelative < 0) {
        positionRelative = 0;
      }

      let stepValue = Math.round(position / (this.elem.offsetWidth) * (this.#steps - 1));

      if (stepValue > 4) {
        stepValue = 4;
      }
      if (stepValue < 0) {
        stepValue = 0;
      }

      this.elem.querySelector('.slider__thumb').style.left = `${positionRelative}%`;
      this.elem.querySelector('.slider__progress').style.width = `${positionRelative}%`;
      this.elem.querySelector('.slider__value').innerHTML = stepValue;
    };


    const pointerDown = (event) => {
      this.elem.querySelector('.slider__thumb').ondragstart = () => false;
      document.addEventListener('pointermove', sliderMover);
      document.addEventListener('pointerup', pointerUp, {once: true});
    };

    const pointerUp = (event) => {
      this.elem.classList.remove('slider_dragging');
      let position = event.clientX - this.elem.getBoundingClientRect().left;
      let stepValue = Math.round(position / (this.elem.offsetWidth) * (this.#steps - 1));

      if (stepValue > 4) {
        stepValue = 4;
      }
      if (stepValue < 0) {
        stepValue = 0;
      }

      const eventCreator = new CustomEvent('slider-change', {
        detail: stepValue,
        bubbles: true,
      });

      this.elem.dispatchEvent(eventCreator);
      document.removeEventListener('pointermove', sliderMover);
    };

    this.elem.addEventListener('click', sliderFiller);
    this.elem.querySelector('.slider__thumb').addEventListener('pointerdown', pointerDown);
  }
}
