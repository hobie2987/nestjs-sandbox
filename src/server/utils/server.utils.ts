export class ServerUtils {

  static isLocalhost(): boolean {
    const platform = process.env.platform;
    return platform === 'win32' || platform === 'darwin';
  }
}