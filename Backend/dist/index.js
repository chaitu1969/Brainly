"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("./database");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, database_1.dbConnect)()
    .then((res) => console.log("Database connected"))
    .catch((err) => console.log(`Error Connecte to the Databas ${err}`));
app.post("/api/v1/signup", async (req, res) => {
    // Zod validation, Hash the password
    const username = req.body.username;
    const password = req.body.password;
    let user;
    try {
        user = await database_1.UserModel.create({ username, password });
        user
            ? res.status(200).json({ message: "User created" })
            : res.status(500).json({ message: "Something went wrong" });
    }
    catch (error) {
        if (error)
            res.status(411).json({ message: "User already exist", Error: error });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await database_1.UserModel.findOne({ username, password });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, config_1.JWT_Secret, {
            expiresIn: 6000,
        });
        res.status(200).json({ message: "User Signin", Token: token });
    }
    else {
        res.status(403).json({ messagse: "Invalid Credentials" });
    }
});
app.post("/api/v1/content", middleware_1.userMiddelware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    const contentDoc = await database_1.ContentModel.create({
        link,
        type,
        title,
        // @ts-ignore
        userId: req.userId,
        tags: [],
    });
    let clearDoc = await contentDoc.populate("userId");
    res.status(201).json({ message: "Conent is created", clearDoc });
});
app.get("/api/v1/content", middleware_1.userMiddelware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await database_1.ContentModel.find({
        userId,
    }).populate("userId", "username");
    res.json({ content });
});
app.delete("/api/v1/content", middleware_1.userMiddelware, async (req, res) => {
    const contentId = req.body.contentId;
    //@ts-ignore
    const userId = req.userId;
    await database_1.ContentModel.deleteMany({ contentId, userId });
    res.json({ message: "Content Deleted" });
});
app.post("/api/v1/brain/share", middleware_1.userMiddelware, async (req, res) => {
    const share = req.body.share;
    try {
        if (share) {
            const existinglink = await database_1.LinkModel.findOne({ userId: req.userId });
            if (existinglink) {
                res.json({ hash: existinglink.hash });
                return;
            }
            let link = await database_1.LinkModel.create({
                userId: req.userId,
                hash: (0, utils_1.random)(10),
            });
            res.json({
                message: "Updated sharable link",
                Link: link.hash,
            });
        }
        else {
            await database_1.LinkModel.deleteOne({ userId: req.userId });
            res.json({
                message: "Deleted sharable link",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            Error: error,
        });
    }
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await database_1.LinkModel.findOne({
        hash,
    });
    // console.log(link);
    if (!link) {
        res.status(411).json({ message: "Incorrect Input" });
        return;
    }
    const content = await database_1.ContentModel.find({ userId: link.userId });
    const user = await database_1.UserModel.findOne({ _id: link.userId });
    if (!user) {
        res.status(411).json({ message: "User not found " });
        return;
    }
    res.json({ username: user.username, content: content });
});
app.listen(3000);
