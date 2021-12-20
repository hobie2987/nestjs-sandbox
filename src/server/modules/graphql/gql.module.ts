import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlContext } from './context/graphql.context';
import { PlaygroundController } from './controllers/playground.controller';
import { UserService } from './services/user/user.service';
import { UserResolver } from './resolvers/user/user.resolver';
import { HttpWrapperModule } from '@http';
import { GraphqlPlugins } from './plugins/graphql.plugins';
import { LoggerModule } from '@logger';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'dist/schema.gql',
      context: GraphqlContext,
    }),
    HttpWrapperModule,
    LoggerModule,
  ],
  controllers: [PlaygroundController],
  providers: [GraphqlPlugins, UserService, UserResolver],
})
export class GqlModule {}
