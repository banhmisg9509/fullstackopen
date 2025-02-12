import mongoose from "mongoose";

export default function connectDB() {
  mongoose
    .connect(String(process.env.MONGODB_URI))
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((error) => {
      console.log("error connecting to mongodb", error.message);
    });
}
