import { Query, Ctx, Resolver } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { getUserId } from "../../utils";
import { User } from "../../entities/user";

@Resolver()
export class Me {
  @Query(returns => User)
  me(@Ctx() { req, UserModel }: MyContext) {
    const userId = getUserId(req);

    return UserModel.findById(userId);
  }
}
