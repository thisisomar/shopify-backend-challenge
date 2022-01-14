import { cacheExchange } from "@urql/exchange-graphcache";
import { NextUrqlClientConfig } from "next-urql";
import { dedupExchange, fetchExchange, gql } from "urql";

const urqlConfig: NextUrqlClientConfig = (ssrExchange) => {
  const exchanges = [
    dedupExchange,
    cacheExchange(),
    ssrExchange,
    fetchExchange
  ];

  return {
    url: "http://localhost:4000/graphql",
    exchanges
  }
}

export default urqlConfig;
