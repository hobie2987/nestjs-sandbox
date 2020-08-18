import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TestResolver } from './test'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: '/dist/server/graphql/schemas/schema.gql',
      debug: true,
      playground: true
    }),
  ],
  providers: [TestResolver]
})
export class DataModule {}