import mongoose from "mongoose"

export interface IBlog {
  _id: string,
  title: string,
  author: string,
  url: string,
  likes: number,
  __v: number,
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model<IBlog>('Blog', blogSchema)

export default Blog