import express from "express";
import morgan from "morgan";
import cors from "cors";

const port = process.env.PORT || 3001;
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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

app.get("/api/persons", (request, response) => {
  response.status(200).json(persons).end();
});

app.get("/api/persons/:id", (request, response) => {
  const { id } = request.params;

  const foundPerson = persons.find((p) => p.id === id);

  if (!foundPerson) {
    response
      .status(404)
      .json({ message: "Not founded person with id: " + id })
      .end();
  }

  response.status(200).json(foundPerson).end();
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    response.status(400).json({ error: "name or number is required" });
  }

  const foundPerson = persons.find((p) => p.name === name);

  if (foundPerson) {
    response.status(400).json({ error: "name must be unique" });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name,
    number,
  };

  persons = persons.concat([newPerson]);

  response.status(200).json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
  const { id } = request.params;

  const foundPerson = persons.find((p) => p.id === id);

  if (!foundPerson) {
    response
      .status(404)
      .json({ message: "Not founded person with id: " + id })
      .end();
  }

  persons = persons.filter((p) => p.id !== id);

  response.status(200).json(foundPerson).end();
});

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for 2 people<br/>${new Date().toString()}
    </p>
    `);
});

app.use((request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
});

app.listen(port, () => {
  console.log(`Service listening on port http://localhost:${port}`);
});
