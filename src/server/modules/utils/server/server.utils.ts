export class ServerUtils {
  static isLocalhost(): boolean {
    return ['win32', 'darwin'].includes(process.env.platform);
  }
}
