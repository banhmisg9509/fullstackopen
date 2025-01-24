import { Router } from "express";
import User from "../models/user";

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  const passwordCorrect = await user?.comparePassword(password);

  if (!(user && passwordCorrect)) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const token = user.getJWTToken();

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + Number(process.env.JWT_EXPIRES_TIME) * 1000
      ),
      httpOnly: true,
    })
    .json({ token, username: user.username, name: user.name });
});

export default router;
