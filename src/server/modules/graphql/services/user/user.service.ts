import { Injectable } from '@nestjs/common';
import { User } from '../../types/user.type';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { API } from '../../../utils';

@Injectable()
export class UserService {
  @API('USERS')
  readonly url: string;

  constructor(private http: HttpService) {}

  async getUsers(): Promise<User[]> {
    return this.fetchUsers();
  }

  async getUser(id: number): Promise<User> {
    const users = await this.getUsers();
    return users.find((user) => user.id === id);
  }

  private async fetchUsers(): Promise<User[]> {
    const request = this.http.get(this.url).pipe(map((res) => res.data));
    return await firstValueFrom(request);
  }
}
