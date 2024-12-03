"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddelware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
// export interface RequsetCustom extends Request {
//   userId: string;
// }
const userMiddelware = (req, res, next) => {
    const header = req.headers["authorization"];
    const decode = jsonwebtoken_1.default.verify(header, config_1.JWT_Secret);
    if (decode) {
        // @ts-ignore
        req.userId = decode.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not logged in ",
        });
    }
};
exports.userMiddelware = userMiddelware;
// Ovverride the type of express object
