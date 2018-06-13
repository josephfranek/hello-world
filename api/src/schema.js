import { neo4jgraphql } from "neo4j-graphql-js";

export const typeDefs = `
type Restaurant {
  _id: ID!
  name: String!
  cuisines: String
  website: String
  categories: [Category] @cypher(statement: "match (:Restaurant)<-[:Belongs_To]-(c:Category) return c")
  
}

type Category {
  _id: ID!
  name: String!
  items: [Item]
}

type Item {
  _id: ID!
  name: String!
  desription: String
  price: Float
}

type Query {
    restaurants(id: ID, name: String, first: Int = 10, offset: Int = 0): [Restaurant]
  
}
`;

export const resolvers = {
  Query: {
    restaurants: neo4jgraphql
  }
};
