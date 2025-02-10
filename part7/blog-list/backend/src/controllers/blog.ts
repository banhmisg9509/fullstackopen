import { Request, Router } from "express";
import { Document } from "mongoose";
import Blog from "../models/blog";
import Comment from "../models/comment";
import User, { IUser } from "../models/user";

export interface AuthenticationRequest extends Request {
  user?: Document<unknown, object, IUser> & IUser & { _id: string };
}

const router = Router();

router.get("/", async (_: AuthenticationRequest, response) => {
  const blogs = await Blog.find({})
    .select({ title: 1 })
    .sort({ likes: "desc" });
  response.json(blogs);
});

router.get("/:id", async (request: AuthenticationRequest, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate("user", { blogs: 0 })
    .populate("comments", { blog: 0 });

  if (!blog) {
    response
      .status(404)
      .json({ error: `Blog with id ${request.params.id} not found` });
    return;
  }

  response.status(200).json(blog);
});

router.post("/", async (request: AuthenticationRequest, response) => {
  const { likes, url, author, title } = request.body;

  const user = request.user;

  const blog = new Blog({
    title: title || "",
    author: author || "",
    url: url || "",
    likes: likes || 0,
    user: user.id,
  });

  await blog.save();
  await User.findByIdAndUpdate(user.id, { $push: { blogs: blog.id } });

  const savedBlog = await blog.populate("user", { blogs: 0 });

  response.status(201).json(savedBlog);
});

router.post(
  "/:id/comments",
  async (request: AuthenticationRequest, response) => {
    const { id } = request.params;
    const { content } = request.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      response.status(404).json({ error: "Blog not found" });
      return;
    }

    const comment = new Comment({
      content,
      blog: id,
    });

    await comment.save();

    await Blog.findByIdAndUpdate(id, { $push: { comments: comment.id } });
    response.status(201).json(comment);
  }
);

router.delete("/:id", async (request: AuthenticationRequest, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);

  if (!blog) {
    response.status(404).json({ error: `Blog with id ${id} not found` });
    return;
  }

  if (blog.user.toString() !== request.user.id) {
    response.status(403).json({ error: "You're not allowed" });
    return;
  }

  await Blog.findByIdAndDelete(id);
  await Comment.deleteMany({ blog: id });
  await User.findByIdAndUpdate(blog.user, { $pull: { blogs: id } });
  response.status(204).json(blog);
});

router.put("/:id", async (request: AuthenticationRequest, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    response
      .status(404)
      .json({ error: `Blog with id ${request.params.id} not found` });
    return;
  }

  const { title, url, author, likes } = request.body;
  let updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title: title || blog.title,
      url: url || blog.url,
      author: author || blog.author,
      likes: likes || blog.likes,
    },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  updatedBlog = await updatedBlog.populate("user", { blogs: 0 });

  response.status(200).json(updatedBlog);
});

export default router;
