import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { GqlExecutionContext } from '@nestjs/graphql';
import graphqlFields from 'graphql-fields';
jest.mock('graphql-fields', () => jest.fn());
import { GqlFields } from './gql-fields.decorator';

describe('GqlFields Decorator', () => {
  let factory: any;
  const parsedFields = { id: {}, name: {}, username: {} };
  const context = {};
  const MockGqlExecutionContext = {
    getInfo: jest.fn(),
  } as any;

  const getParamDecoratorFactory = (decorator: any): ((...args) => any) => {
    class Test {
      public test(@decorator() value) {}
    }

    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
    return args[Object.keys(args)[0]].factory;
  };

  beforeEach(() => {
    jest
      .spyOn(GqlExecutionContext, 'create')
      .mockReturnValue(MockGqlExecutionContext);
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
        MockGqlExecutionContext.getInfo.mockReturnValue({});
        actual = factory({}, context);
      });

      it('Should pass the info graphql-fields', () => {
        expect(graphqlFields).toHaveBeenCalled();
      });

      it('Should return the parsed fields', () => {
        expect(actual).toEqual(parsedFields);
      });
    });

    describe('And the execution context does NOT contains the query info', () => {
      beforeEach(() => {
        MockGqlExecutionContext.getInfo.mockReturnValue(undefined);
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
