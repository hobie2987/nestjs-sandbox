import { ServerUtils } from './server.utils';

describe('ServerUtils', () => {
  describe('isLocalhost', () => {
    const _env = process.env;

    beforeEach(() => {
      process.env = { ..._env };
    });

    afterAll(() => {
      process.env = _env;
    });

    it('should return true when then platform is win32', () => {
      process.env.platform = 'win32';
      expect(ServerUtils.isLocalhost()).toEqual(true);
    });

    it('should return true when the platform is darwin', () => {
      process.env.platform = 'darwin';
      expect(ServerUtils.isLocalhost()).toEqual(true);
    });

    it('should return false when the platform is not win32 or darwin', () => {
      process.env.platform = 'android';
      expect(ServerUtils.isLocalhost()).toEqual(false);
    });
  });
});
