import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import graphqlFields from 'graphql-fields';

export const GqlFields = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const info = ctx.getArgs().find((arg) => arg?.parentType?.name === 'Query');
    return info ? graphqlFields(info) : {};
  },
);
