import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import graphqlFields from 'graphql-fields';
jest.mock('graphql-fields', () => jest.fn());
import { GqlFields } from './gql-fields.decorator';

describe('GqlFields Decorator', () => {
  let factory: any;
  const parsedFields = { id: {}, name: {}, username: {} };
  const args = [
    undefined,
    {},
    { req: {}, res: {} },
    {
      fieldName: 'users',
      parentType: { name: 'Query' },
      schema: {},
    },
  ];
  const context = { getArgs: jest.fn() };

  const getParamDecoratorFactory = (decorator: any): ((...args) => any) => {
    class Test {
      public test(@decorator() value) {}
    }

    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
    return args[Object.keys(args)[0]].factory;
  };

  beforeEach(() => {
    graphqlFields.mockReturnValue(parsedFields);
    factory = getParamDecoratorFactory(GqlFields);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('Should exist', () => {
    expect(GqlFields).toBeTruthy();
  });

  describe('When executing the decorator', () => {
    let actual: any;

    describe('And the execution context contains the query info', () => {
      beforeEach(() => {
        context.getArgs.mockReturnValue(args);
        actual = factory({}, context);
      });

      it('Should pass the info graphql-fields', () => {
        expect(graphqlFields).toHaveBeenCalledWith(args[3]);
      });

      it('Should return the parsed fields', () => {
        expect(actual).toEqual(parsedFields);
      });
    });

    describe('And the execution context does NOT contains the query info', () => {
      beforeEach(() => {
        context.getArgs.mockReturnValue([undefined, {}, { req: {}, res: {} }]);
        actual = factory({}, context);
      });

      it('Should not call graphql-fields', () => {
        expect(graphqlFields).not.toHaveBeenCalled();
      });

      it('Should return empty object', () => {
        expect(actual).toEqual({});
      });
    });
  });
});
