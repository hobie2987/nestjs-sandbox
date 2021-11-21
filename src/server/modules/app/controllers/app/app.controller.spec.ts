import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import fs from 'fs';
jest.mock('fs');

describe('AppController', () => {
  let appController: AppController;
  const document = fs.readFileSync('src/index.html');

  beforeEach(async () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue(document);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  describe('index()', () => {
    it('should read the index.html file', () => {
      appController.index();
      expect(fs.readFileSync).toHaveBeenCalledWith('dist/index.html', {
        encoding: 'utf8',
      });
    });

    it('should return HTML', () => {
      expect(appController.index()).toEqual(document);
    });
  });
});
