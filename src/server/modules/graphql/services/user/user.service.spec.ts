import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { UserService } from './user.service';
import { User } from '../../types/user.type';

describe('UserService', () => {
  let service: UserService;
  let http: HttpService;
  const USERS: User[] = [
    {
      id: 1,
      name: 'Frank',
      phone: '111-2222',
      username: 'user1',
      website: '',
      email: 'frank1@gmail.com',
    },
    {
      id: 2,
      name: 'Sara',
      phone: '323-4568',
      username: 'user2',
      website: '',
      email: 'sara2@gmail.com',
    },
  ];
  const response: AxiosResponse = {
    headers: undefined,
    data: USERS,
    status: 200,
    statusText: 'OK',
    config: {},
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: HttpService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    service = module.get(UserService);
    http = module.get(HttpService);
    jest.spyOn(http, 'get').mockReturnValue(of(response));
  });

  it('Should exist', () => {
    expect(service).toBeTruthy();
  });

  describe('When requesting all users', () => {
    it('Should make a GET request to the Users API', async () => {
      await service.getUsers();
      expect(http.get).toHaveBeenCalledWith(service.url);
    });

    it('Should return the array of users', async () => {
      const actual = await service.getUsers();
      expect(actual).toEqual(USERS);
    });
  });

  describe('When requesting a user by id', () => {
    it('Should return the requested users', async () => {
      const actual = await service.getUser(1);
      expect(actual).toEqual(USERS[0]);
    });
  });
});
