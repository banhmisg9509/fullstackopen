import { IUser } from "models/user";
import Blog, { IBlog } from "../models/blog";
import TestAgent from "supertest/lib/agent";

const initialBlogs: IBlog[] = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

const initialUsers: IUser[] = [
  { name: "Hung Nguyen", username: "ndhung", password: "123456" },
  { name: "A Nguyen", username: "nva", password: "123456" },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "empty", author: "empty", url: "empty" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const authHeader = async (
  username: string,
  password: string,
  api: TestAgent
) => {
  const credentials = {
    username,
    password,
  };
  const response = await api.post("/api/login").send(credentials);
  return response.header;
};

export default {
  initialBlogs,
  initialUsers,
  authHeader,
  nonExistingId,
};
