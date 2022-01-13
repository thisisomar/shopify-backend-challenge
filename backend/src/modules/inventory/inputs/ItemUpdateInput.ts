import { Length } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class ItemUpdateInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @Length(3, 255)
  name: string

  @Field({ nullable: true })
  @Length(3, 255)
  description: string

  @Field(() => Int, { nullable: true })
  quantity: number
}