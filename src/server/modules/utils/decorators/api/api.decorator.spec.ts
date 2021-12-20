import { API, URLS } from './api.decorator';

describe('API Decorator', () => {
  let instance: any;
  class Test {
    @API('USERS')
    readonly url: string;
  }

  beforeEach(() => {
    instance = new Test();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('Should populate the url property with the USERS url', () => {
    expect(instance.url).toEqual(URLS.USERS);
  });
});
