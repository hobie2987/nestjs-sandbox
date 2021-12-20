import { Plugin } from '@nestjs/graphql';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { Inject } from '@nestjs/common';
import { LogCode, LoggerService, LogMessage } from '@logger';

@Plugin()
export class GraphqlPlugins implements ApolloServerPlugin {
  constructor(@Inject(LoggerService) private logger: LoggerService) {}

  requestDidStart = async (ctx: any) => ({
    didEncounterErrors: this.didEncounterErrors,
  });

  private didEncounterErrors = async (ctx: any) => {
    const { source, data, errors } = ctx;

    this.logger.error({
      feature: 'graphql.plugins',
      message: 'GraphQL errors have occurred',
      query: source.replace(/(\s+)/g, ' '),
      data,
      error: errors.map(({ message, path }) => ({
        message,
        path: `[${path.toString()}]`,
      })),
      code: LogCode.GRAPHQL_ERROR,
    } as LogMessage);
  };
}
