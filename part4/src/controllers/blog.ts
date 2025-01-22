import { Router } from "express";
import Blog from "../models/blog";

const router = Router();

router.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

router.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    response
      .status(404)
      .json({ error: `Blog with id ${request.params.id} not found` });
    return;
  }

  await blog.deleteOne();
  response.status(200).json(blog);
});

router.put("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    response
      .status(404)
      .json({ error: `Blog with id ${request.params.id} not found` });
    return;
  }

  const { title, url, author, likes } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title,
      url,
      author,
      likes,
    },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  response.status(200).json(updatedBlog);
});

export default router;
