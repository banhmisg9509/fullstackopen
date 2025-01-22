import mongoose from "mongoose";

export interface IBlog {
  _id?: string;
  id?: string;
  title: string;
  author: string;
  url: string;
  likes?: number;
  __v?: number;
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

blogSchema.set("toJSON", {
  transform: (document, returnedOBject) => {
    returnedOBject.id = returnedOBject._id.toString();
  },
});

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
