import { retry } from './';

let number = 10;

const doWork = async () => {
  console.log(number);
  return --number ? Promise.reject(number) : number;
};

retry(doWork, 9)
  .then((num) => {
    console.log(`Done: ${num}`);
  })
  .catch((err) => {
    console.error(`Catch: ${err}`);
  });
