import bcrypt from "bcryptjs";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { redis } from "../../redis";
import { MyContext } from "../../types/MyContext";
import { AuthPayload } from "./AuthPayload";
import { createToken } from "../../utils";

@Resolver()
export default class ChangePassword {
  @Mutation(returns => AuthPayload)
  async changePassword(
    @Arg("token") token: string,
    @Arg("password") password: string,
    @Ctx() { UserModel }: MyContext
  ): Promise<AuthPayload> {
    const userId = await redis.get(token);
    if (!userId) throw new Error("Reset password token is expired or invaild");
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );
    await redis.del(token);
    const jwtToken = createToken(user);

    return {
      user,
      token: jwtToken
    };
  }
}
