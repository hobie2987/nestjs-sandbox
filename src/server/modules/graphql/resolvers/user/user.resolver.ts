import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { User } from '../../types/user.type';
import { UserService } from '../../services/user/user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(@Context() context): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query(() => User)
  async user(@Args('id') id: number, @Context() context): Promise<User> {
    return this.userService.getUser(id);
  }
}
