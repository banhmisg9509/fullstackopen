import User from "../models/user";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import helper from "./test_helper";

const api = supertest(app);
let COOKIE: string[] = [];

beforeAll(async () => {
  await User.deleteMany({});
  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((userObject) => userObject.save());
  await Promise.all(promiseArray);
});

beforeEach(async () => {
  const { username, password } = helper.initialUsers[0];
  const header = await helper.authHeader(username, password, api);
  COOKIE = [...header["set-cookie"]];
});

test("create new user", async () => {
  const userPayload = {
    username: "bbb",
    name: "b nguyen",
    password: "123456",
  };

  await api
    .post("/api/users")
    .set("Cookie", COOKIE)
    .send(userPayload)
    .expect(201);

  const response = await api.get("/api/users").set("Cookie", COOKIE);
  const users = response.body;

  expect(users.length).toBe(helper.initialUsers.length + 1);
});

test("create duplicate user", async () => {
  const response = await api
    .post("/api/users")
    .set("Cookie", COOKIE)
    .send(helper.initialUsers[0])
    .expect(400);

  expect(response.body).toStrictEqual({ error: "Duplicate username entered" });
});

test("invalid username and password cannot be created", async () => {
  let userPayload = {
    username: "a",
    name: "a nguyen",
    password: "123456",
  };

  let response = await api
    .post("/api/users")
    .set("Cookie", COOKIE)
    .send(userPayload)
    .expect(400);

  expect(response.body).toStrictEqual({
    error:
      "User validation failed: username: Username must be at least 3 character",
  });

  userPayload = {
    username: "aaa",
    name: "a nguyen",
    password: "1",
  };

  response = await api
    .post("/api/users")
    .set("Cookie", COOKIE)
    .send(userPayload)
    .expect(400);

  expect(response.body).toStrictEqual({
    error:
      "User validation failed: password: Password must be at least 3 characters",
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
