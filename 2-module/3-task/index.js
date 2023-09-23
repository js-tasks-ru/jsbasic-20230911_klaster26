let calculator = {
  read (a, b) {
      this.number1 = a;
      this.number2 = b;
  },
  sum () {
      return this.number1 + this.number2;
  },

  mul () {
      return this.number1 * this.number2;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
