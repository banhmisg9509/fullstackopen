import cors from "cors";
import express, { ErrorRequestHandler } from "express";
import morgan from "morgan";
import connectDB from "../db/mongo";
import {
  countTotalPhonebook,
  createPhoneBook,
  deletePhonebookById,
  findPhonebookById,
  findPhonebookByName,
  getAllPhonebooks,
  updatePhonebook,
} from "../db/phonebook";

const port = process.env.PORT || 3001;
const app = express();

connectDB();

app.use(express.json());
app.use(express.static("public"));

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

app.use(cors());

app.get("/api/persons", async (request, response) => {
  const phonebooks = await getAllPhonebooks();
  response.status(200).json(phonebooks).end();
});

app.get("/api/persons/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const foundPhonebook = await findPhonebookById(id);

    if (!foundPhonebook) {
      response
        .status(404)
        .json({ message: "Not founded person with id: " + id })
        .end();
      return;
    }

    response.status(200).json(foundPhonebook).end();
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:id/", async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, number } = request.body;

    const foundPhonebook = findPhonebookById(id);

    if (!foundPhonebook) {
      response
        .status(404)
        .json({ message: "Not founded person with id: " + id })
        .end();
      return;
    }

    const updatedPhonebook = await updatePhonebook(id, { name, number });
    response.status(200).json(updatedPhonebook).end();
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (request, response, next) => {
  try {
    const { name, number } = request.body;

    if (!name || !number) {
      response.status(400).json({ error: "name or number is required" });
      return;
    }

    const foundPhonebook = await findPhonebookByName(name);

    if (foundPhonebook) {
      response.status(400).json({ error: "name must be unique" });
      return;
    }

    const newPhoneBook = await createPhoneBook({ name, number });

    response.status(200).json(newPhoneBook);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const foundPhonebook = await findPhonebookById(id);

    if (!foundPhonebook) {
      response
        .status(404)
        .json({ message: "Not founded person with id: " + id })
        .end();
      return;
    }

    await deletePhonebookById(id);

    response.status(200).json(foundPhonebook);
  } catch (error) {
    next(error);
  }
});

app.get("/info", async (request, response) => {
  const totalPhonebooks = await countTotalPhonebook();
  response.send(`
    <p>Phonebook has info for ${totalPhonebooks} people<br/>${new Date().toString()}
    </p>
    `);
});

app.use((request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
});

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    res.status(400).json({ error: "malformatted id" });
    return;
  } else if (error.name === "ValidationError") {
    res.status(400).json({ error: error.message });
    return;
  }

  next(error);
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Service listening on port http://localhost:${port}`);
});
