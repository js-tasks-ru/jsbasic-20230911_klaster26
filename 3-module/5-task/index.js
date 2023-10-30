function getMinMax(str) {
  str = str.split(' ');
  let array = str.reduce((result, item) => {
    if (isFinite(item)) {
      result.push(item);
    } return result;
  }, []);
  return ({
    min: Math.min.apply(null, array),
    max: Math.max.apply(null, array),
  });
}
