import { ObjectType, Field } from "type-graphql";
import { User } from "../../entities/user";

@ObjectType()
export class AuthPayload {
  @Field(returns => User)
  user: User;

  @Field(returns => String)
  token: string;
}
