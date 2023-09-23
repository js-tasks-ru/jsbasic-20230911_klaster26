function filterRange(arr, a, b) {
  let result = [];
  arr.map ( num => {
      if (num >= a && num <= b) {
          result.push (num);
      }
  });
  return result;
}

function filterRange(arr, a, b) { // Либо аналогичное решение с использованием метода reduce().
                                  // Это я для себя прорабатываю. Ненавижу методы массивов и пытаюсь это побороть :D
  return arr.reduce ( (result, num) => {
      if (num >= a && num <= b) {
          result.push(num);
      } return result;
  }, []);
}
