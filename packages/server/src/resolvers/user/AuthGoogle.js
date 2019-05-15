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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const AuthPayload_1 = require("./AuthPayload");
const utils_1 = require("../../utils");
let AuthGoogleInput = class AuthGoogleInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AuthGoogleInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AuthGoogleInput.prototype, "googleId", void 0);
AuthGoogleInput = __decorate([
    type_graphql_1.InputType()
], AuthGoogleInput);
let AuthGoogleResolver = class AuthGoogleResolver {
    authGoogle(data, { UserModel }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel.findOne({ googleId: data.googleId });
            if (!user) {
                const newUser = yield UserModel.create({
                    name: data.name,
                    googleId: data.googleId
                });
                const token = utils_1.createToken(newUser);
                return {
                    token,
                    user: newUser
                };
            }
            const token = utils_1.createToken(user);
            return {
                token,
                user
            };
        });
    }
};
__decorate([
    type_graphql_1.Mutation(returns => AuthPayload_1.AuthPayload),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthGoogleInput, Object]),
    __metadata("design:returntype", Promise)
], AuthGoogleResolver.prototype, "authGoogle", null);
AuthGoogleResolver = __decorate([
    type_graphql_1.Resolver()
], AuthGoogleResolver);
exports.default = AuthGoogleResolver;