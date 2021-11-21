import { Test } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from '../../services/user/user.service';
import { User } from '../../types/user.type';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;
  const context: any = { req: {}, res: {} };
  const USER: User = {
    id: 1,
    username: 'user1',
    email: 'user1@gmail.com',
    name: 'Frank Rizzo',
    phone: '234-555-6666',
    website: 'http://user1-is-awesome.com',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: { getUser: jest.fn(), getUsers: jest.fn() },
        },
      ],
    }).compile();

    resolver = module.get(UserResolver);
    service = module.get(UserService);

    jest.spyOn(service, 'getUser').mockResolvedValue(USER);
    jest.spyOn(service, 'getUsers').mockResolvedValue([USER]);
  });

  describe('When requesting a single user', () => {
    it('Should request the user by id', async () => {
      await resolver.user(1, context);
      expect(service.getUser).toHaveBeenCalledWith(1);
    });

    it('Should resolve with the requested user', async () => {
      const actual = await resolver.user(1, context);
      expect(actual).toEqual(USER);
    });
  });

  describe('When requesting a all users', () => {
    it('Should request all users', async () => {
      await resolver.users(context);
      expect(service.getUsers).toHaveBeenCalled();
    });

    it('Should resolve with the requested user', async () => {
      const actual = await resolver.users(context);
      expect(actual).toEqual([USER]);
    });
  });
});
