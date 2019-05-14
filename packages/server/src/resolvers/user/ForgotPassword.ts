import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { sendMail } from "../../services";
import { createResetPasswordUrl } from "../../utils";

@Resolver()
export default class ForgotPassword {
  @Mutation(returns => String)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { UserModel }: MyContext
  ) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("There is no user with this account");

    await sendMail(email, await createResetPasswordUrl(user._id));

    return "Reset Password Link Sended Successfully";
  }
}
