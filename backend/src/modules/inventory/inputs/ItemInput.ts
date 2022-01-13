import { Length } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class ItemInput {
  @Field()
  @Length(1, 255)
  name: string

  @Field()
  @Length(1, 255)
  description: string

  @Field(() => Int)
  quantity: number
}