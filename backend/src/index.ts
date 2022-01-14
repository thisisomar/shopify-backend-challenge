import "reflect-metadata";
import express from "express";
import cors from "cors";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection, useContainer } from "typeorm";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { Container } from "typeorm-typedi-extensions";

const main = async () => {
  useContainer(Container);
  await createConnection();

  // build schema
  const schema = await buildSchema({
    resolvers: [__dirname + '/modules/**/*.ts'],
    container: Container,
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: (error: GraphQLError): GraphQLFormattedError => {
      if (error && error.extensions) {
        error.extensions.code = 'GRAPHQL_VALIDATION_FAILED';
      }
      return error;
    },
    context: ({ req, res }: any) => ({ req, res }),
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });
  await apolloServer.start();

  const app = express();
  
  app.use(cors());

  // Static files here to save CSVs
  app.use('/csv', express.static(path.join(__dirname, '..', 'csv')));

  apolloServer.applyMiddleware({ app , cors: false });

  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000/graphql");
  });
};

main();