function camelize(str) {
  str = str.split('-');
  let result = str.map ((word, index) => {
      if (index == 0) {
          return `${word}`;
      } return `${word[0].toUpperCase()}${word.slice(1)}`;
  }).join('');
  return result;
}
