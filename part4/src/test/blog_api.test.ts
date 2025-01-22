import { IBlog } from "models/blog";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import Blog from "../models/blog";
import helper from "./test_helper";
import test_helper from "./test_helper";

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blogObject) => blogObject.save());
  await Promise.all(promiseArray);
});

test("fetch all blogs successful", async () => {
  const response = await api.get("/api/blogs");

  const blogs = response.body;

  expect(blogs.length).toBe(helper.initialBlogs.length);
});

test("unique identifier is id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  expect(blogs[0].id).toBeDefined();
});

test("create new blog", async () => {
  const newBlog: IBlog = {
    title: "My Blog",
    author: "ndhung",
    url: "http://myblog.com/my-blog",
    likes: 0,
  };
  const response = await api.post("/api/blogs").send(newBlog).expect(201);

  const blogs = (await api.get("/api/blogs")).body;

  expect(blogs.length).toBe(helper.initialBlogs.length + 1);

  expect(response.body).toMatchObject(newBlog);
});

test("default value for likes is zero", async () => {
  const newBlog: IBlog = {
    title: "My Blog 2",
    author: "ndhung",
    url: "http://myblog.com/my-blog-2",
  };
  const response = await api.post("/api/blogs").send(newBlog).expect(201);

  expect(response.body.likes).toBe(0);
});

test("title and url are required", async () => {
  const blogWithoutTitle = {
    author: "ndhung",
    url: "http://myblog.com/my-blog-2",
  };
  await api.post("/api/blogs").send(blogWithoutTitle).expect(400);

  const blogWithoutUrl = {
    title: "My Blog",
    author: "ndhung",
  };

  await api.post("/api/blogs").send(blogWithoutUrl).expect(400);
});

test("delete single blog", async () => {
  let response = await api.get("/api/blogs");
  let blogs = response.body;
  let oldLength = blogs.length;

  await api.delete(`/api/blogs/${blogs[0].id}`);

  response = await api.get("/api/blogs");
  blogs = response.body;

  expect(blogs.length).toBe(oldLength - 1);
});

test("delete a non existing blog", async () => {
  const id = await test_helper.nonExistingId();
  await api.delete(`/api/blogs/${id}`).expect(404);
});

test("update a blog", async () => {
  let response = await api.get("/api/blogs");
  const firstBlog = response.body[0];

  const updatedInfo = {
    title: "updated title",
    author: "updated author",
    url: "http://updated.url.com",
  };
  await api.put(`/api/blogs/${firstBlog.id}`).send(updatedInfo);

  response = await api.get("/api/blogs");
  const updatedBlog: IBlog = response.body[0];

  expect(updatedBlog.title).toBe(updatedInfo.title);
});

test('update a non existing blog', async () => {
  const id = await test_helper.nonExistingId();
  await api.put(`/api/blogs/${id}`).expect(404);
})

afterAll(async () => {
  await mongoose.connection.close();
});
