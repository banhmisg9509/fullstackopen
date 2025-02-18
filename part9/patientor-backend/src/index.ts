import express from "express";
import cors from "cors";
import router from "./controllers";
import { errorMiddleware } from "./middleware/error";

const app = express();
app.use(express.json());

const PORT = 3001;

app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
