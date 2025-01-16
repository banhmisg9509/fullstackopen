import mongoose from "mongoose";
import config from "./config";
import logger from "./logger";

export default function connectDB() {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info("connected to mongodb");
    })
    .catch((error) => {
      logger.error("error connecting to mongodb", error.message);
    });
}
