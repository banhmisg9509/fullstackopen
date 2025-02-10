import { Router } from "express";
import User from "../models/user";

const router = Router();

router.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const user = new User({
    username,
    name,
    password,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

router.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { user: 0 });
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const users = await User.findById(id).populate("blogs", { user: 0 });
  res.status(200).json(users);
});

export default router;
