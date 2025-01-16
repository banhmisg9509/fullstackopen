import cors from "cors";
import express from "express";
import connectDB from "./utils/connectDB";
import {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} from "./utils/middleware";
import blogController from "./controllers/blog";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", blogController);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
