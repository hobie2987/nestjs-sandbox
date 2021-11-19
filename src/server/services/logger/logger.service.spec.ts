import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { LogCode, LogLevel, LogMessage } from '../../../types';

describe('LoggerService', () => {
  let logger: LoggerService;
  const message: LogMessage = {
    code: LogCode.REQUEST,
    message: 'This is a test of our public broadcasting system',
  };

  const validate = (level: LogLevel) => {
    const expected = { ...message, ...{ level } };
    expect(console[level]).toHaveBeenCalledWith(JSON.stringify(expected));
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [LoggerService],
    }).compile();
    logger = app.get<LoggerService>(LoggerService);
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'debug').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'info').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    delete message.level;
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('Should exist', () => {
    expect(logger).toBeTruthy();
  });

  describe('When logging debug messages', () => {
    it('Should call console.debug with the stringified message', () => {
      logger.debug(message);
      validate(LogLevel.DEBUG);
    });
  });

  describe('When logging error messages', () => {
    it('Should call console.error with the stringified message', () => {
      logger.error(message);
      validate(LogLevel.ERROR);
    });
  });

  describe('When logging info messages', () => {
    it('Should call console.info with the stringified message', () => {
      logger.info(message);
      validate(LogLevel.INFO);
    });
  });

  describe('When logging warning messages', () => {
    it('Should call console.warn with the stringified message', () => {
      logger.warn(message);
      validate(LogLevel.WARN);
    });
  });

  describe('When logging generic messages', () => {
    it('Should log at the provided log level', () => {
      logger.log(message, LogLevel.WARN);
      validate(LogLevel.WARN);
    });

    it('Should log at level LOG if no level is provided', () => {
      logger.log(message);
      validate(LogLevel.LOG);
    });

    it('Should log at the level provided in the log message', () => {
      const errorMessage = { ...message, ...{ level: LogLevel.ERROR } };
      logger.log(errorMessage);
      validate(LogLevel.ERROR);
    });
  });
});
