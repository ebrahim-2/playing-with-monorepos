import { Resolver, Mutation, Arg, Ctx, InputType, Field } from "type-graphql";
import { AuthPayload } from "./AuthPayload";
import { MyContext } from "../../types/MyContext";
import { createToken } from "../../utils";

@InputType()
class AuthFacebookInput {
  @Field()
  name: string;

  @Field()
  facebookId: string;
}

@Resolver()
export class AuthFacebookResolver {
  @Mutation(returns => AuthPayload)
  async authFacebook(
    @Arg("data") data: AuthFacebookInput,
    @Ctx() { UserModel }: MyContext
  ) {
    const user = await UserModel.findOne({ facebookId: data.facebookId });

    if (!user) {
      const newUser = await UserModel.create({
        name: data.name,
        facebookId: data.facebookId
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
