import { Request, Router } from "express";
import { Document } from "mongoose";
import Blog from "../models/blog";
import { IUser } from "../models/user";

interface AuthenticationRequest extends Request {
  user?: Document<unknown, any, IUser> & IUser & { _id: string };
}

const router = Router();

router.get("/", async (_: Request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
  response.json(blogs);
});

router.post("/", async (request: AuthenticationRequest, response) => {
  const { likes, url, author, title } = request.body;

  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id,
  });

  let savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  savedBlog = await savedBlog.populate("user", { blogs: 0 });

  response.status(201).json(savedBlog);
});

router.delete("/:id", async (request: AuthenticationRequest, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    response
      .status(404)
      .json({ error: `Blog with id ${request.params.id} not found` });
    return;
  }

  if (blog.user.toString() !== request.user.id) {
    response.status(403).json({ error: "You're not allowed" });
    return;
  }

  await blog.deleteOne();
  response.status(200).json(blog);
});

router.put("/:id", async (request: Request, response) => {
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
