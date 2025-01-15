import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

const connectDB = () => {
  mongoose.Promise = Promise;
  mongoose.set("strictQuery", false);
  mongoose.connect(MONGO_URL).then(async () => {
    console.log('Connceted to database');
  });
  mongoose.connection.on("error", (error) => console.log(error));
}


export default connectDB