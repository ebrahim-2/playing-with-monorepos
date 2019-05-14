import { Model } from "mongoose";
import { Request } from "express";
import { User } from "../entities/user";

export interface MyContext {
  req: Request;
  UserModel: Model<InstanceType<any>, {}> & User & typeof User;
}
