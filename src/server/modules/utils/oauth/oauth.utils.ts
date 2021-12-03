import { AsyncSubject, firstValueFrom, interval } from 'rxjs';
import crypto from 'crypto';
import { wait } from '../promises';

class OAuthUtils {
  readonly token: AsyncSubject<string>;

  constructor() {
    this.token = new AsyncSubject<string>();
    this.generateToken();
    this.renewToken();
  }

  public async getToken(): Promise<string> {
    return firstValueFrom(this.token);
  }

  private generateToken(): void {
    wait(500).then(() => {
      const token = crypto.randomBytes(305).toString('base64');
      this.token.next(token);
      this.token.complete();
    });
  }

  private renewToken(): void {
    interval(10000).subscribe(() => {
      this.generateToken();
    });
  }
}

const instance = new OAuthUtils();
export { instance as OAuthUtils };
