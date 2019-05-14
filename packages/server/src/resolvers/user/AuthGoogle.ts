import { Resolver, Mutation, Arg, Ctx, InputType, Field } from "type-graphql";
import { AuthPayload } from "./AuthPayload";
import { MyContext } from "../../types/MyContext";
import { createToken } from "../../utils";

@InputType()
class AuthGoogleInput {
  @Field()
  name: string;

  @Field()
  googleId: string;
}

@Resolver()
export default class AuthGoogleResolver {
  @Mutation(returns => AuthPayload)
  async authGoogle(
    @Arg("data") data: AuthGoogleInput,
    @Ctx() { UserModel }: MyContext
  ) {
    const user = await UserModel.findOne({ googleId: data.googleId });

    if (!user) {
      const newUser = await UserModel.create({
        name: data.name,
        googleId: data.googleId
      });
      const token = createToken(newUser);

      return {
        token,
        user: newUser
      };
    }
    const token = createToken(user);

    return {
      token,
      user
    };
  }
}
