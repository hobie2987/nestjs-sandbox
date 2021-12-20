export const URLS: Readonly<any> = {
  USERS: 'https://jsonplaceholder.typicode.com/users',
};

export function API(key) {
  return (target: any, propertyKey: string) => {
    Reflect.defineProperty(target, propertyKey, {
      get(): any {
        return URLS[key];
      },
    });
  };
}
