import path from "path";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { ItemService } from "../../services/ItemService";
import { ExportInfo } from "./responses/ExportInfo";
import { v4 as uuidv4 } from 'uuid';

@Service()
@Resolver()
export class ExportDataResolver {
  constructor(
    private readonly itemsService: ItemService,
  ) {}

  @Mutation(() => ExportInfo)
  async exportData(
    @Arg("fields", () => [String]) fields: string[]
  ): Promise<ExportInfo> {
    const items = await this.itemsService.getAll();
    let records: any = []

    console.log("Which fields are being used?")
    console.log(fields)

    // if fields is empty, grab fields from first item
    if (fields.length === 0) {
      console.log("Fields is empty, grabbing fields from first item")
      fields = Object.getOwnPropertyNames(items[0]);
    }

    const headers: any = []
    fields.map((field) => {
      headers.push({
        id: field,
        title: field
      })
    })

    const fileName = `export_${uuidv4()}.csv`;
    console.log(fileName)

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = await createCsvWriter({
      path: path.join(__dirname, "../../../csv", fileName),
      header: headers
    });

    items.forEach((item) => {
      let newRecord: any = {};

      fields.forEach((field) => {
        // Check if the field exists in the item
        if(!(field in item)) {
          throw new Error(`${field} is not a valid field`)
        }
        newRecord[field] = item[field as keyof typeof item]
      })
      records.push(newRecord);
    })

    csvWriter.writeRecords(records)

    const url = `http://localhost:4000/csv/${fileName}`;
  
    return {
      success: true,
      url: url
    }
  }
}