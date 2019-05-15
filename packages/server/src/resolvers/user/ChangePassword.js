"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const type_graphql_1 = require("type-graphql");
const redis_1 = require("../../redis");
const AuthPayload_1 = require("./AuthPayload");
const utils_1 = require("../../utils");
let ChangePassword = class ChangePassword {
    changePassword(token, password, { UserModel }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis_1.redis.get(token);
            if (!userId)
                throw new Error("Reset password token is expired or invaild");
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            const user = yield UserModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
            yield redis_1.redis.del(token);
            const jwtToken = utils_1.createToken(user);
            return {
                user,
                token: jwtToken
            };
        });
    }
};
__decorate([
    type_graphql_1.Mutation(returns => AuthPayload_1.AuthPayload),
    __param(0, type_graphql_1.Arg("token")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ChangePassword.prototype, "changePassword", null);
ChangePassword = __decorate([
    type_graphql_1.Resolver()
], ChangePassword);
exports.default = ChangePassword;
