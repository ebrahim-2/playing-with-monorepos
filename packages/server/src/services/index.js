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
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey("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");
function sendMail(email, link) {
    return __awaiter(this, void 0, void 0, function* () {
        var message = {
            to: email,
            from: "passwordReset@demo.com",
            subject: "Confrim Email",
            html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.
    Please click on the following link, or paste this into your browser to complete the process:
      ${link}
      If you did not request this, please ignore this email and your password will remain unchanged<p>`
        };
        yield mail_1.default.send(message);
    });
}
exports.sendMail = sendMail;
