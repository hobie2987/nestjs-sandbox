// import * as rxjs from 'rxjs';

/**
 * Promise that resolves after the provide time in milliseconds
 * @param ms
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

declare type PromiseExecutor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void,
) => void;

/**
 *
 * @param func PromiseExecutor (resolve, reject) => void
 * @param attempts number of attempts
 */
export function retry(func: PromiseExecutor<any>, attempts = 3): Promise<any> {
  return new Promise(func).catch((err) => {
    return --attempts ? retry(func, attempts) : Promise.reject(err);
  });
}
