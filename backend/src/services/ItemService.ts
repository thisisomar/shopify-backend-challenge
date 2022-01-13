import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Item } from "../entity/Item";
import { ItemInput } from "../modules/inventory/inputs/ItemInput";
import { ItemUpdateInput } from "../modules/inventory/inputs/ItemUpdateInput";

@Service()
export class ItemService {
  
  @InjectRepository(Item)
  private readonly itemsRepository: Repository<Item>;

  async getAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  async findById(id: number) {
    const item = await this.itemsRepository.findOne(id);

    if(!item) {
      throw new Error('Item not found');
    }

    return item;
  }

  async create(input: ItemInput): Promise<Item> {
    const item = new Item()

    item.name = input.name
    item.description = input.description
    item.quantity = input.quantity

    return await this.itemsRepository.save(item)
  }

  async update(item: Item, input: ItemUpdateInput): Promise<Item> {
    if(input.name !== undefined) {
      item.name = input.name
    }

    if(input.description !== undefined) {
      item.description = input.description
    }

    if(input.quantity !== undefined) {
      item.quantity = input.quantity
    }

    await this.itemsRepository.save(item)

    return item;
  }

  async delete(id: number) {
    const item = await this.findById(id);

    return await this.itemsRepository.delete(item.id)
  }
}