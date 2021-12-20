import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import graphqlFields from 'graphql-fields';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlFields = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    return info ? graphqlFields(info) : {};
  },
);
