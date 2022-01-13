import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Item } from "../../entity/Item";
import { ItemService } from "../../services/ItemService";
import { ItemInput } from "./inputs/ItemInput";

@Service()
@Resolver()
export class CreateItemResolver {
  constructor(
    private readonly itemsService: ItemService,
  ) {}

  @Mutation(() => Item)
  async createItem(
    @Arg("item") input: ItemInput
  ): Promise<Item> {
    const item = await this.itemsService.create(input);
    
    return item;
  }
}