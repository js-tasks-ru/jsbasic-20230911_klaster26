function filterRange(arr, a, b) {
  return arr.filter(num => (num >= a && num <= b));
}

function filterRangeMap(arr, a, b) { // Либо аналогичное решение с использованием метода map().
  let result = [];
  arr.map(num => {
    if (num >= a && num <= b) {
      result.push(num);
    }
  });
  return result;
}

function filterRangeReduce(arr, a, b) { // Либо аналогичное решение с использованием метода reduce().
  return arr.reduce((result, num) => {
    if (num >= a && num <= b) {
      result.push(num);
    } return result;
  }, []);
}

