import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExerciseRequestBody {
  daily_exercises: number[];
  target: number;
}

export function extractBody(
  req: Request<ParamsDictionary, unknown, ExerciseRequestBody>
) {
  const { daily_exercises, target } = req.body;
  return { daily_exercises, target };
}

export function validateBody(
  { daily_exercises, target }: ExerciseRequestBody,
  res: Response
) {
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return false;
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((item) => isNaN(Number(item))) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return false;
  }

  return true;
}

export function calculateExercises(
  daily_exercises: number[],
  target: number
): Result {
  const average =
    daily_exercises.reduce((acc, period) => acc + period, 0) /
    daily_exercises.length;

  let rating = 1;
  let ratingDescription = "you should try harder";

  if (average >= target) {
    rating = 3;
    ratingDescription = "good job, keep going";
  } else if (Math.abs(average - target) <= 0.1) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength: daily_exercises.length,
    trainingDays: daily_exercises.filter((hourPerDay) => hourPerDay !== 0)
      .length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
}

function main(argv: string[]) {
  const [target, ...trainingPeriod] = argv
    .slice(2)
    .map((param) => Number(param));

  if (isNaN(target) || trainingPeriod.some((num) => isNaN(num))) {
    throw new Error("target and trainingPeriod must be numbers");
  }

  console.log(calculateExercises(trainingPeriod, target));
}

if (require.main?.filename === module.filename) {
  try {
    main(process.argv);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
