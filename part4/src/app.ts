import cookieParser from 'cookie-parser';
import cors from "cors";
import express from "express";
import "express-async-errors";
import blogController from "./controllers/blog";
import loginController from "./controllers/login";
import logoutController from "./controllers/logout";
import userController from "./controllers/user";
import connectDB from "./utils/connectDB";
import {
  errorHandler,
  isAuthenticated,
  requestLogger,
  unknownEndpoint,
} from "./utils/middleware";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use("/api/login", loginController);
app.use('/api/logout', isAuthenticated, logoutController);
app.use("/api/blogs", isAuthenticated, blogController);
app.use("/api/users", isAuthenticated, userController);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
