import { Arg, Mutation, Resolver } from "type-graphql";
import { Item } from "../../entity/Item";
import { ItemUpdateInput } from "./inputs/ItemUpdateInput";

@Resolver()
export class UpdateItemResolver {
  @Mutation(() => Item)
  async updateItem(
    @Arg("item") input: ItemUpdateInput
  ): Promise<Item | null> {
    const item = await Item.findOne(input.id);

    if (!item) {
      throw new Error("Item not found.")
    }

    if(input.name !== undefined) {
      item.name = input.name
    }

    if(input.description !== undefined) {
      item.description = input.description
    }

    if(input.quantity !== undefined) {
      item.quantity = input.quantity
    }

    await item.save();

    return item;
  }
}