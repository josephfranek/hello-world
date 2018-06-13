import { typeDefs, resolvers } from "./schema";
import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";
import { v1 as neo4j } from "neo4j-driver";
import { augmentSchema } from "neo4j-graphql-js";
import dotenv from "dotenv";

dotenv.config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// augmentSchema will add autogenerated mutations based on types in schema
const augmentedSchema = augmentSchema(schema);

const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USER || "neo4j",
    process.env.NEO4J_PASSWORD || "syscoLabs"
  )
);

const server = new ApolloServer({
  // using augmentedSchema (executable GraphQLSchemaObject) instead of typeDefs and resolvers
  //typeDefs,
  //resolvers,
  context: { driver },
  // remove schema and uncomment typeDefs and resolvers above to use original (unaugmented) schema
  schema: augmentedSchema
});

server.listen().then(({ url }) => {
  console.log(`GraphQL API read at ${url}`);
});