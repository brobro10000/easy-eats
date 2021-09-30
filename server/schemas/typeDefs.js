const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    stock: Int
    unit: String
    categories: [Category]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    categories: [Category]
    category(_id: ID): Category
    products(category: ID, name: String): [Product]
    product(_id: ID): Product
    user: User
    order(_id: ID): Order
    checkout(products: [ID]!, quantity: [Int]!): Checkout
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(products: [ID]!, stock: [Int]!): [Product]
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
