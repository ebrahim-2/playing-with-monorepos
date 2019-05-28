import "reflect-metadata";
import { UserModel } from "./entities/user";
import Express from "express";
import { ApolloServer } from "apollo-server-express";

import mongoose from "mongoose";
import schemaGenerator from "./schemaGenerator";

async function main() {
  mongoose.set("debug", "true");
  mongoose.Promise = global.Promise;
  mongoose.set("useCreateIndex", true);
  mongoose.connect("mongodb://localhost:27017/auth", {
    useNewUrlParser: true
  });

  const apolloServer = new ApolloServer({
    schema: await schemaGenerator(),
    context: ({ req }) => ({ req, UserModel })
  });
  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("server is ready on port http://localhost:4000/graphql ")
  );
}

main();
