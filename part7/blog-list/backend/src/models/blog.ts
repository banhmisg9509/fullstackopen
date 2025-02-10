import mongoose from "mongoose";
import { IComment } from "./comment";
import { IUser } from "./user";

export interface IBlog {
  id?: string;
  title: string;
  author: string;
  url: string;
  likes?: number;
  user?: IUser;
  comments: IComment[]
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

blogSchema.set("toJSON", {
  transform: (_, returnedOBject) => {
    returnedOBject.id = returnedOBject._id.toString();

    delete returnedOBject._id;
    delete returnedOBject.__v;
  },
});

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
