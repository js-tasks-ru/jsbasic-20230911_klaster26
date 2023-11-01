function sumSalary(salaries) {
  let result = 0;
  for (let key in salaries) {
    if (Boolean(salaries[key]) && typeof salaries[key] == 'number' && Math.abs(salaries[key]) != Infinity) {
      result += salaries[key];
    }
  } return result;
}
