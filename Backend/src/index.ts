import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
