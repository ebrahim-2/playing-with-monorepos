import { prop, Typegoose } from "typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User extends Typegoose {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @prop({ unique: true })
  email?: string;

  @Field()
  @prop()
  name: string;

  @prop()
  password?: string;

  @prop()
  facebookId?: string;

  @prop()
  googleId: string;
}

export const UserModel = new User().getModelForClass(User);
