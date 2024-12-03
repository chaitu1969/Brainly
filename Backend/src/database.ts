import mongoose from "mongoose";

export async function dbConnect() {
  await mongoose.connect("mongodb://localhost:27017/SecondBrain", {
    maxPoolSize: 100,
  });
}

const UserScheam = new mongoose.Schema({
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

export const UserModel = mongoose.model("Users", UserScheam);

const ContentScheama = new mongoose.Schema({
  link: { type: String },
  type: { type: String },
  title: { type: String },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tags" }],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
    validate: async (value: string) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("User not exist ");
      }
    },
  },
});

ContentScheama.pre("save", async function (next) {
  const user = await UserModel.findById(this.userId);
  if (!user) {
    throw new Error("User does not exist");
  }
  next();
});

export const ContentModel = mongoose.model("Content", ContentScheama);

const TagShcema = new mongoose.Schema({
  title: { type: String },
});

export const TagModel = mongoose.model("Tags", TagShcema);

const LinkScheama = new mongoose.Schema({
  hash: {
    type: String,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export const LinkModel = mongoose.model("Link", LinkScheama);
