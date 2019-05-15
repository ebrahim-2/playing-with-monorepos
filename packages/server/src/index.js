"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const user_1 = require("./entities/user");
const mongodb_1 = require("mongodb");
const typegoose_middleware_1 = require("./typegoose-middleware");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const path_1 = __importDefault(require("path"));
const object_id_scalar_1 = require("./object-id.scalar");
const mongoose_1 = __importDefault(require("mongoose"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.set("debug", "true");
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.set("useCreateIndex", true);
        mongoose_1.default.connect("mongodb://localhost:27017/auth", {
            useNewUrlParser: true
        });
        const schema = yield type_graphql_1.buildSchema({
            resolvers: [__dirname + "/resolvers/**/*.ts"],
            emitSchemaFile: path_1.default.resolve(__dirname, "schema.gql"),
            globalMiddlewares: [typegoose_middleware_1.TypegooseMiddleware],
            scalarsMap: [{ type: mongodb_1.ObjectId, scalar: object_id_scalar_1.ObjectIdScalar }]
        });
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req }) => ({ req, UserModel: user_1.UserModel })
        });
        const app = express_1.default();
        apolloServer.applyMiddleware({ app });
        app.listen(4000, () => console.log("server is ready on port http://localhost:4000/graphql "));
    });
}
main();
