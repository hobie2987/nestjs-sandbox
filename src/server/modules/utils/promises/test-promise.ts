import { retry } from './';

let number = 10;

function doWork(resolve, reject): void {
  console.log(number);
  return --number ? reject(number) : resolve(number);
}

retry(doWork, 8)
  .then((num) => {
    console.log(`Done: ${num}`);
  })
  .catch((err) => {
    console.error(`Catch: ${err}`);
  });
