import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { ItemService } from "../../services/ItemService";

@Service()
@Resolver()
export class DeleteItemResolver {
  constructor(
    private readonly itemsService: ItemService,
  ) {}

  @Mutation(() => Boolean)
  async deleteItem(
    @Arg("itemId", () => Int) id: number,
  ): Promise<boolean> {
    await this.itemsService.delete(id);
    
    return true;
  }
}