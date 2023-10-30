function factorial (number) {
  let i = 1;
  let result = 1;
  while (i <= number) {
    result *= i;
    i++;
  } return result;
}

const factorialWithFor = (number) => { // Стрелочная функция и цикл for для разнообразия;
  let result = 1;
  for (let i = 1; i <= number; i++) {
    result *= i;
  } return result;
};
