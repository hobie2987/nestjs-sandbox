import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlContext } from './context/graphql.context';
import { PlaygroundController } from './controllers/playground.controller';
import { UserService } from './services/user/user.service';
import { UserResolver } from './resolvers/user/user.resolver';
import { HttpWrapperModule } from '@http';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'dist/schema.gql',
      context: GraphqlContext,
    }),
    HttpWrapperModule,
  ],
  controllers: [PlaygroundController],
  providers: [UserService, UserResolver],
})
export class GqlModule {}
