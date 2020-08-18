import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Test {
  @Field(type => String)
  id: string;

  @Field({ nullable: true })
  text: string;
}