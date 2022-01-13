import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { Item } from "../../entity/Item";

@Resolver()
export class DeleteItemResolver {
  @Mutation(() => Boolean)
  async deleteItem(
    @Arg("itemId", () => Int) id: number,
  ): Promise<boolean> {
    const item = await Item.findOne(id);

    if (!item) {
      throw new Error("Item not found.")
    }

    await Item.delete(item.id);
    
    return true;
  }
}