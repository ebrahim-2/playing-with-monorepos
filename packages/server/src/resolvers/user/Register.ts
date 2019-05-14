import { Resolver, Mutation, Field, Arg, InputType, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { IsEmail } from "class-validator";
import { createToken, emailExists } from "../../utils";
import { AuthPayload } from "./AuthPayload";
import { MyContext } from "../../types/MyContext";

@InputType()
export class RegisterInputType {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export default class Register {
  @Mutation(returns => AuthPayload)
  async register(
    @Arg("data") data: RegisterInputType,
    @Ctx() { UserModel }: MyContext
  ): Promise<AuthPayload> {
    const userExists = await emailExists(data.email);
    if (userExists) throw new Error("Email is in use please try another one");

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await UserModel.create({ ...data, password: hashedPassword });
    const token = createToken(user);

    return {
      user,
      token
    };
  }
}
