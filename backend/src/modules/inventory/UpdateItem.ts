import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Item } from "../../entity/Item";
import { ItemService } from "../../services/ItemService";
import { ItemUpdateInput } from "./inputs/ItemUpdateInput";

@Service()
@Resolver()
export class UpdateItemResolver {
  constructor(
    private readonly itemsService: ItemService,
  ) {}

  @Mutation(() => Item)
  async updateItem(
    @Arg("item") input: ItemUpdateInput
  ): Promise<Item> {
    const item = await this.itemsService.findById(input.id);
    
    await this.itemsService.update(item, input);
    
    return item;
  }
}