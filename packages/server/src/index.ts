import "reflect-metadata";
import { UserModel } from "./entities/user";
import { ObjectId } from "mongodb";
import { TypegooseMiddleware } from "./typegoose-middleware";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import path from "path";
import { ObjectIdScalar } from "./object-id.scalar";
import mongoose from "mongoose";

async function main() {
  mongoose.set("debug", "true");
  mongoose.Promise = global.Promise;
  mongoose.set("useCreateIndex", true);
  mongoose.connect("mongodb://localhost:27017/auth", {
    useNewUrlParser: true
  });

  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.ts"],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }]
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req, UserModel })
  });
  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("server is ready on port http://localhost:4000/graphql ")
  );
}

main();
