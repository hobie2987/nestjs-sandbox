import { Test } from '@nestjs/testing';
import { PlaygroundController } from './playground.controller';
import * as GraphQLPlaygroundHtml from '@apollographql/graphql-playground-html';
jest.mock('@apollographql/graphql-playground-html');

describe('PlaygroundController', () => {
  let controller: PlaygroundController;
  const request: any = { originalUrl: '/graphql', cookies: {} };
  const response: any = { redirect: jest.fn(), send: jest.fn() };
  const XSRF_TOKEN = 'XSRF_TOKEN';
  const PLAYGROUND_HTML = '<html lang="en"></html>';

  beforeEach(async () => {
    jest
      .spyOn(GraphQLPlaygroundHtml, 'renderPlaygroundPage')
      .mockReturnValue(PLAYGROUND_HTML);

    const module = await Test.createTestingModule({
      imports: [],
      controllers: [PlaygroundController],
      providers: [],
    }).compile();

    controller = module.get(PlaygroundController);
  });

  afterEach(() => {
    request.cookies = {};
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('Should exist', () => {
    expect(controller).toBeTruthy();
  });

  describe('And the XSRF-TOKEN cookie does not exist', () => {
    beforeEach(() => {
      controller.playground(request, response);
    });

    it('Should redirect to the originalUrl', () => {
      expect(response.redirect).toHaveBeenCalledWith(request.originalUrl);
    });
  });

  describe('And the XSRF-TOKEN cookie does exist', () => {
    beforeEach(() => {
      request.cookies['XSRF-TOKEN'] = XSRF_TOKEN;
      controller.playground(request, response);
    });

    it('Should set the Playground options', () => {
      expect(GraphQLPlaygroundHtml.renderPlaygroundPage).toHaveBeenCalledWith({
        tabs: [
          {
            endpoint: request.originalUrl,
            query: '',
            headers: { 'X-XSRF-TOKEN': XSRF_TOKEN },
          },
        ],
        settings: {
          'request.credentials': 'same-origin',
        },
      });
    });

    it('Send the playground HTML on the response', () => {
      expect(response.send).toHaveBeenCalledWith(PLAYGROUND_HTML);
    });
  });
});
