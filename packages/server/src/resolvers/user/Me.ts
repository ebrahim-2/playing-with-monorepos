import { Query, Ctx, Resolver } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { getUserId } from "../../utils";
import { User } from "../../entities/user";

@Resolver()
export class Me {
  @Query(returns => User)
  async me(@Ctx() { req, UserModel }: MyContext): Promise<User | null> {
    const userId = getUserId(req);
    const user = await UserModel.findById(userId);;
    return user;
  }
}
