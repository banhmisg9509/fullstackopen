import { Request, Response } from "express";

export function calculateBmi(height: number, weight: number): string {
  const bmi = weight / (height / 100) ** 2;
  if (bmi >= 40) return "Obese (Class III)";

  if (bmi >= 35) return "Obese (Class II)";

  if (bmi >= 30) return "Obese (Class I)";

  if (bmi >= 25) return "Overweight (Pre-obese)";

  if (bmi >= 18.5) return "Normal range";

  if (bmi >= 17) return "Underweight (Mild thiness)";
  if (bmi >= 16) return "Underweight (Moderate thiness)";

  return "Underweight (Severe thiness)";
}

export function extractQuery(req: Request) {
  const { height, weight } = req.query;

  return {
    height: Number(height),
    weight: Number(weight),
  };
}

export function validateQuery(
  { height, weight }: { height: number; weight: number },
  res: Response
) {
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: "height and weight query must be a number" });
    return false;
  }

  if (Number(height) <= 0 || Number(weight) <= 0) {
    res
      .status(400)
      .json({ error: "height and weight must be a positive number" });
    return false;
  }

  return true;
}

function main(argv: string[]) {
  const [height, weight] = argv.slice(2).map((param) => Number(param));

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Height and weight must be a number");
  }

  if (height <= 0 || weight <= 0) {
    throw new Error("Height and weight must be a positive number");
  }

  console.log(calculateBmi(height, weight));
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
