import mongoose from "mongoose";
import { IBlog } from "./blog";

export interface IComment {
  content: string;
  blog?: IBlog;
}

const commentSchema = new mongoose.Schema<IComment>({
  content: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

commentSchema.set("toJSON", {
  transform: (_, returnedOBject) => {
    returnedOBject.id = returnedOBject._id.toString();

    delete returnedOBject._id;
    delete returnedOBject.__v;
  },
});

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
