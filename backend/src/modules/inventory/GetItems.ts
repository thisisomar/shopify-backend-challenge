import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Item } from "../../entity/Item";
import { ItemService } from "../../services/ItemService";

@Service()
@Resolver()
export class GetItemsResolver {
  constructor(
    private readonly itemsService: ItemService,
  ) {}

  @Query(() => [Item])
  async items(): Promise<Item[] | undefined> {
    const items = await this.itemsService.getAll();

    return items;
  }
}