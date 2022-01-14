import { cacheExchange } from "@urql/exchange-graphcache";
import { NextUrqlClientConfig } from "next-urql";
import { dedupExchange, fetchExchange, gql } from "urql";
import { DeleteItemMutationVariables, GetItemDocument, Item, UpdateItemDocument, UpdateItemMutation, UpdateItemMutationVariables } from "../generated/graphql";

const urqlConfig: NextUrqlClientConfig = (ssrExchange) => {
  const exchanges = [
    dedupExchange,
    cacheExchange({
      keys: {
        Item: data => data.id as string,
        ExportInfo: () => null
      },
      resolvers: {
        Query: {
          item: (_, args) => ({ __typename: 'Item', id: args.id }),
        }
      },
      updates: {
        Mutation: {
          createItem: (result, args, cache) => {
            const key = 'Query';
            const fields = cache
              .inspectFields(key)
              .filter(field => field.fieldName === 'items')
              .forEach(field => {
                cache.invalidate(key, field.fieldKey);
              });
          },
          deleteItem: (result, args, cache, info) => {
            cache.invalidate({
              __typename: "Item",
              id: (args as DeleteItemMutationVariables).itemId
            });
          },
          updateItem: (result, args, cache, info) => {
            const key = 'Query';
            const fields = cache
              .inspectFields(key)
              .filter(field => field.fieldName === 'items')
              .forEach(field => {
                cache.invalidate(key, field.fieldKey);
              });
          }
        }
      }
    }),
    ssrExchange,
    fetchExchange
  ];

  return {
    url: "http://localhost:4000/graphql",
    exchanges
  }
}

export default urqlConfig;
