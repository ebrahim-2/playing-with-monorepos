import bcrypt from "bcryptjs";
import { Resolver, Mutation, Field, Arg, InputType, Ctx } from "type-graphql";
import { IsEmail } from "class-validator";
import { createToken, emailExists } from "../../utils";
import { AuthPayload } from "./AuthPayload";
import { MyContext } from "../../types/MyContext";

@InputType()
class LoginInputType {
  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export default class Login {
  @Mutation(returns => AuthPayload)
  async login(
    @Arg("data") data: LoginInputType,
    @Ctx() { UserModel }: MyContext
  ): Promise<AuthPayload> {
    const userExists = await emailExists(data.email);
    if (!userExists) throw new Error("There is no user with this email");

    const user = await UserModel.findOne({ email: data.email });
    const vaildPassword = await bcrypt.compare(data.password, user.password);
    if (!vaildPassword) throw new Error("Wrong Password");

    const token = createToken(user);

    return {
      user,
      token
    };
  }
}
