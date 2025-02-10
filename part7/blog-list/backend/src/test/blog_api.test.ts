import { IBlog } from "models/blog";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import Blog from "../models/blog";
import User from "../models/user";
import helper from "./test_helper";

const api = supertest(app);
let COOKIE: string[] = [];

beforeAll(async () => {
  await User.deleteMany({});

  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArrayUsers = userObjects.map((userObject) => userObject.save());
  const newUsers = await Promise.all(promiseArrayUsers);

  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => {
    blog.user = newUsers[0].id;
    return new Blog(blog);
  });
  const promiseArrayBlogs = blogObjects.map((blogObject) => blogObject.save());

  await Promise.all(promiseArrayBlogs);
});

beforeEach(async () => {
  const { username, password } = helper.initialUsers[0];
  const header = await helper.authHeader(username, password, api);
  COOKIE = [...header["set-cookie"]];
});

test("fetch all blogs successful", async () => {
  const response = await api.get("/api/blogs").set("Cookie", COOKIE);

  const blogs = response.body;

  expect(blogs.length).toBe(helper.initialBlogs.length);
});

test("unique identifier is id", async () => {
  const response = await api.get("/api/blogs").set("Cookie", COOKIE);

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
  const response = await api
    .post("/api/blogs")
    .set("Cookie", COOKIE)
    .send(newBlog)
    .expect(201);

  const blogs = (await api.get("/api/blogs").set("Cookie", COOKIE)).body;

  expect(blogs.length).toBe(helper.initialBlogs.length + 1);

  expect(response.body).toMatchObject(newBlog);
});

test("default value for likes is zero", async () => {
  const newBlog: IBlog = {
    title: "My Blog 2",
    author: "ndhung",
    url: "http://myblog.com/my-blog-2",
  };
  const response = await api
    .post("/api/blogs")
    .set("Cookie", COOKIE)
    .send(newBlog)
    .expect(201);

  expect(response.body.likes).toBe(0);
});

test("title and url are required", async () => {
  const blogWithoutTitle = {
    author: "ndhung",
    url: "http://myblog.com/my-blog-2",
  };
  await api
    .post("/api/blogs")
    .set("Cookie", COOKIE)
    .send(blogWithoutTitle)
    .expect(400);

  const blogWithoutUrl = {
    title: "My Blog",
    author: "ndhung",
  };

  await api
    .post("/api/blogs")
    .set("Cookie", COOKIE)
    .send(blogWithoutUrl)
    .expect(400);
});

test("delete single blog", async () => {
  let response = await api.get("/api/blogs").set("Cookie", COOKIE);
  let blogs = response.body;
  const oldLength = blogs.length;

  await api.delete(`/api/blogs/${blogs[0].id}`).set("Cookie", COOKIE);

  response = await api.get("/api/blogs").set("Cookie", COOKIE);
  blogs = response.body;

  expect(blogs.length).toBe(oldLength - 1);
});

test("delete a non existing blog", async () => {
  const id = await helper.nonExistingId();
  await api.delete(`/api/blogs/${id}`).set("Cookie", COOKIE).expect(404);
});

test("update a blog", async () => {
  let response = await api.get("/api/blogs").set("Cookie", COOKIE);
  const firstBlog = response.body[0];

  const updatedInfo = {
    title: "updated title",
    author: "updated author",
    url: "http://updated.url.com",
  };
  await api
    .put(`/api/blogs/${firstBlog.id}`)
    .set("Cookie", COOKIE)
    .send(updatedInfo);

  response = await api.get("/api/blogs").set("Cookie", COOKIE);
  const updatedBlog: IBlog = response.body[0];

  expect(updatedBlog.title).toBe(updatedInfo.title);
});

test("update a non existing blog", async () => {
  const id = await helper.nonExistingId();
  await api.put(`/api/blogs/${id}`).set("Cookie", COOKIE).expect(404);
});

afterAll(async () => {
  await mongoose.connection.close();
});
