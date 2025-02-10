import { Router } from "express";
import Blog from "../models/blog";
import User, { IUser } from "../models/user";

const router = Router();

router.post("/reset", async (_, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

router.post("/createUser", async (request, response) => {
  const { users } = request.body;

  const result = await User.bulkSave(users.map((user: IUser) => new User(user)));

  response.status(201).json(result);
});

export default router;
