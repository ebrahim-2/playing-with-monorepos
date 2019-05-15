"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("./entities/user");
const redis_1 = require("./redis");
const getUserId = req => {
    const Authorization = req.get("Authorization");
    if (Authorization) {
        const token = Authorization.replace("Bearer ", "");
        const res = verifyToken(token);
        return res.userId;
    }
    throw new Error("Not Authenticated");
};
exports.getUserId = getUserId;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, "this is my secret");
};
exports.verifyToken = verifyToken;
const createToken = user => {
    return jsonwebtoken_1.default.sign({
        userId: user._id
    }, "this is my secret");
};
exports.createToken = createToken;
const emailExists = (email) => __awaiter(this, void 0, void 0, function* () {
    const user = yield user_1.UserModel.findOne({ email });
    if (user)
        return true;
    return false;
});
exports.emailExists = emailExists;
exports.createResetPasswordUrl = (userId) => __awaiter(this, void 0, void 0, function* () {
    const token = uuid_1.v4();
    yield redis_1.redis.set(token, userId); // 1 day expiration
    yield redis_1.redis.expire(token, 3600);
    return `http://localhost:3000/reset/${token}`;
});
