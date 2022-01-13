import { Arg, Mutation, Resolver } from "type-graphql";
import { Item } from "../../entity/Item";
import { ItemInput } from "./inputs/ItemInput";

@Resolver()
export class CreateItemResolver {
  @Mutation(() => Item)
  async createItem(
    @Arg("item") input: ItemInput
  ): Promise<Item> {
    const item = await Item.create(input).save();
    
    return item;
  }
}