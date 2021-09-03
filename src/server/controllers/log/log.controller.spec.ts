import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { LogController } from './log.controller';
import { LoggerService } from '../../services';
import { LogCode, LogMessage } from '../../../types';

describe('LogController', () => {
  let controller: LogController;
  let logger: LoggerService;
  const body: LogMessage = {
    code: LogCode.REQUEST,
    message: 'This is just a test',
  };
  const request: any = { body };
  const response: any = { sendStatus: jest.fn() };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
      providers: [LoggerService],
    }).compile();
    controller = app.get<LogController>(LogController);
    logger = app.get<LoggerService>(LoggerService);
    jest.spyOn(logger, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  describe('POST /log', () => {

    beforeEach(() => {
      controller.log(request, response);
    });

    it('Should log the request body message', () => {
      expect(logger.log).toHaveBeenCalledWith(body);
    });

    it('Should send a 200 response status code', () => {
      expect(response.sendStatus).toHaveBeenCalledWith(HttpStatus.OK);
    });
  });
});
