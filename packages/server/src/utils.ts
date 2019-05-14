import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { UserModel } from "./entities/user";
import { redis } from "./redis";


const getUserId = req => {
  const Authorization = req.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const res = <any>verifyToken(token);

    return res.userId;
  }

  throw new Error("Not Authenticated");
};

const verifyToken = (token: string) => {
  return jwt.verify(token, "this is my secret");
};

const createToken = user => {
  return jwt.sign(
    {
      userId: user._id
    },
    "this is my secret"
  );
};

const emailExists = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (user) return true;

  return false;
};

export const createResetPasswordUrl = async (userId: number) => {
  const token = v4();
  await redis.set(token, userId); // 1 day expiration
  await redis.expire(token, 3600)

  return `http://localhost:3000/reset/${token}`;
};

export { getUserId, createToken, verifyToken, emailExists };
