import "dotenv/config";
import connectDB from "./utils/connectDB";
import start from "./server";

connectDB();
start();
