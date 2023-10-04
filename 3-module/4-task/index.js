function showSalary(users, age) { // С использованием комбинации методов filter() и map().
  return users.filter ((user) => user.age <= age).map (user => `${user.name}, ${user.balance}`).join('\n');
}

function showSalary(users, age) {
  let result = [];
  users.map ((user) => {
    if (user.age <= age) {
      result.push(`${user.name}, ${user.balance}`);
    }
  }); return (result.join('\n'));
}

function showSalary(users, age) { // Per methodos ad astra!
  let array = users.reduce ((result, user) => {
  if (user.age <= age) {
    result.push(`${user.name}, ${user.balance}`);
  }
  return result;
}, []); return (array.join('\n'));
};

