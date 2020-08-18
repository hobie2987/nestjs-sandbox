import { Args, Query, Resolver } from '@nestjs/graphql';
import { Test } from '../models/test.model';

@Resolver(() => Test)
export class TestResolver {

  // constructor() {
  // }

  @Query(returns => Test)
  async test(@Args('id', { type: () => String }) id: string) {
    return {
      id: id,
      text: `The passed ID is ${id}`
    } as Test;
  }

}