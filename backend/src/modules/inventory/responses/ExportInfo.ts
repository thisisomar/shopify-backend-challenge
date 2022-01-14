import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ExportInfo {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  url: string;
}