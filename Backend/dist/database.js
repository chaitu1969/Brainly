"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.TagModel = exports.ContentModel = exports.UserModel = void 0;
exports.dbConnect = dbConnect;
const mongoose_1 = __importDefault(require("mongoose"));
async function dbConnect() {
    await mongoose_1.default.connect("mongodb://localhost:27017/SecondBrain", {
        maxPoolSize: 100,
    });
}
const UserScheam = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "UserName is Required"],
        unique: [true, "A User alreay exist"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
});
exports.UserModel = mongoose_1.default.model("Users", UserScheam);
const ContentScheama = new mongoose_1.default.Schema({
    link: { type: String },
    type: { type: String },
    title: { type: String },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "Tags" }],
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Users",
        required: true,
        validate: async (value) => {
            const user = await exports.UserModel.findById(value);
            if (!user) {
                throw new Error("User not exist ");
            }
        },
    },
});
ContentScheama.pre("save", async function (next) {
    const user = await exports.UserModel.findById(this.userId);
    if (!user) {
        throw new Error("User does not exist");
    }
    next();
});
exports.ContentModel = mongoose_1.default.model("Content", ContentScheama);
const TagShcema = new mongoose_1.default.Schema({
    title: { type: String },
});
exports.TagModel = mongoose_1.default.model("Tags", TagShcema);
const LinkScheama = new mongoose_1.default.Schema({
    hash: {
        type: String,
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Users",
        required: true,
    },
});
exports.LinkModel = mongoose_1.default.model("Link", LinkScheama);
