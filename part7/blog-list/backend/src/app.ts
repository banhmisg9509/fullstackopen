import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import blogController from "./controllers/blog";
import loginController from "./controllers/login";
import logoutController from "./controllers/logout";
import userController from "./controllers/user";
import testController from "./controllers/testing";
import connectDB from "./utils/connectDB";
import {
  errorHandler,
  isAuthenticated,
  requestLogger,
  unknownEndpoint,
} from "./utils/middleware";

const app = express();

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use("/api/login", loginController);
app.use("/api/logout", logoutController);
app.use("/api/blogs", isAuthenticated, blogController);
app.use("/api/users", userController);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testController);
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
