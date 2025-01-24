import mongoose from "mongoose";
import { IUser } from "./user";

export interface IBlog {
  _id?: string;
  id?: string;
  title: string;
  author: string;
  url: string;
  likes?: number;
  __v?: number;
  user?: IUser;
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
});

blogSchema.set("toJSON", {
  transform: (document, returnedOBject) => {
    returnedOBject.id = returnedOBject._id.toString();

    delete returnedOBject._id;
    delete returnedOBject.__v;
  },
});

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
