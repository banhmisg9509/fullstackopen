import express from "express";
import http from "node:http";
import { calculateBmi, extractQuery, validateQuery } from "./bmiCalculator";
import { calculateExercises, extractBody, validateBody } from "./exerciseCalculator";

const port = 3000;
const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = extractQuery(req);

  if (!validateQuery({ height, weight }, res)) return;

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = extractBody(req);

  if (!validateBody({ daily_exercises, target }, res)) return;
  
  res.status(200).json(calculateExercises(daily_exercises, target));
});

httpServer.listen(port, () => {
  console.log(`[Server]: http://localhost:${port}`);
});
