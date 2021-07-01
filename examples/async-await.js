const add = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a < 0 || b < 0) {
      return reject('Numbers must be non-negative');
    }
    resolve(a + b);
  }, 2000);
};

const doAdd = async () => {
  const sum = await add(1, 2);
  const sum2 = await add(sum, 3);
  const sum3 = await add(sum2, 4);
  return sum3;
};

console.log('This will show up first because of asynchronous');

doAdd()
  .then((result) => {
    console.log('result', result);
  })
  .catch((err) => {
    console.log('error: ', err);
  });
