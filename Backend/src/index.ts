declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}

import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, dbConnect, LinkModel, UserModel } from "./database";
import { JWT_Secret } from "./config";
import { userMiddelware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

dbConnect()
  .then((res) => console.log("Database connected"))
  .catch((err) => console.log(`Error Connecte to the Databas ${err}`));

app.post("/api/v1/signup", async (req, res) => {
  // Zod validation, Hash the password
  const username = req.body.username;
  const password = req.body.password;
  let user;
  try {
    user = await UserModel.create({ username, password });
    user
      ? res.status(200).json({ message: "User created" })
      : res.status(500).json({ message: "Something went wrong" });
  } catch (error) {
    if (error)
      res.status(411).json({ message: "User already exist", Error: error });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({ username, password });

  if (existingUser) {
    const token = jwt.sign({ id: existingUser._id }, JWT_Secret, {
      expiresIn: 6000,
    });

    res.status(200).json({ message: "User Signin", Token: token });
  } else {
    res.status(403).json({ messagse: "Invalid Credentials" });
  }
});

app.post("/api/v1/content", userMiddelware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  const title = req.body.title;

  const contentDoc = await ContentModel.create({
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

app.get("/api/v1/content", userMiddelware, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({
    userId,
  }).populate("userId", "username");

  res.json({ content });
});

app.delete("/api/v1/content", userMiddelware, async (req, res) => {
  const contentId = req.body.contentId;

  //@ts-ignore
  const userId = req.userId;

  await ContentModel.deleteMany({ contentId, userId });

  res.json({ message: "Content Deleted" });
});

app.post("/api/v1/brain/share", userMiddelware, async (req, res) => {
  const share = req.body.share;
  try {
    if (share) {
      const existinglink = await LinkModel.findOne({ userId: req.userId });

      if (existinglink) {
        res.json({ hash: existinglink.hash });
        return;
      }

      let link = await LinkModel.create({
        userId: req.userId,
        hash: random(10),
      });

      res.json({
        message: "Updated sharable link",
        Link: link.hash,
      });
    } else {
      await LinkModel.deleteOne({ userId: req.userId });
      res.json({
        message: "Deleted sharable link",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      Error: error,
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });

  // console.log(link);

  if (!link) {
    res.status(411).json({ message: "Incorrect Input" });
    return;
  }

  const content = await ContentModel.find({ userId: link.userId });

  const user = await UserModel.findOne({ _id: link.userId });

  if (!user) {
    res.status(411).json({ message: "User not found " });
    return;
  }

  res.json({ username: user.username, content: content });
});

app.listen(3000);
