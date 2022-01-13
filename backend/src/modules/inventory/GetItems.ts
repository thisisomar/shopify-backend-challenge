import { Query, Resolver } from "type-graphql";
import { Item } from "../../entity/Item";

@Resolver()
export class GetItemsResolver {
  @Query(() => [Item])
  async items(): Promise<Item[] | undefined> {
    const items = await Item.find();

    return items;
  }
}