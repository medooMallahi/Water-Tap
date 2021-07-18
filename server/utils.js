let calcualteRate = (array = []) => {
  let calculate = false;

  for (let i = 0; i < array.length; i++) {
    if (array[i] > 0) {
      calculate = true;
      break;
    }
  }

  let rate = 0;

  if (calculate) {
    rate =
      (5 * array[4] +
        4 * array[3] +
        3 * array[2] +
        2 * array[1] +
        1 * array[0]) /
      (array[4] + array[3] + array[2] + array[1] + array[0]);
  } else {
    rate = 0;
  }

  return rate;
};

module.exports = { calcualteRate };
