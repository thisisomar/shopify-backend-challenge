import { Arg, Int, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Item } from "../../entity/Item";
import { ItemService } from "../../services/ItemService";

@Service()
@Resolver()
export class GetItemResolver {
  constructor(
    private readonly itemsService: ItemService,
  ) {}

  @Query(() => Item)
  async getItem(
    @Arg("itemId", () => Int) id: number,
  ): Promise<Item | undefined> {
    const item = await this.itemsService.findById(id)

    return item;
  }
}