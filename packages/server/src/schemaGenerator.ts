import { buildSchema } from "type-graphql";
import { TypegooseMiddleware } from "./typegoose-middleware";
import { ObjectId } from "mongodb";
import path from "path";
import { ObjectIdScalar } from "./object-id.scalar";
import Register from "./resolvers/user/Register";
import Login from "./resolvers/user/Login";
import { Me } from "./resolvers/user/Me";
import ChangePassword from "./resolvers/user/ChangePassword";
import ForgotPassword from "./resolvers/user/ForgotPassword";
import { AuthFacebookResolver } from "./resolvers/user/AuthFacebook";
import AuthGoogleResolver from "./resolvers/user/AuthGoogle";

const schemaGenerator = async () => {
  const schema = await buildSchema({
    resolvers: [
      Register,
      Login,
      Me,
      ChangePassword,
      ForgotPassword,
      AuthFacebookResolver,
      AuthGoogleResolver
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }]
  });

  return schema;
};

export default schemaGenerator;
