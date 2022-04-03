import { response } from "express";
import { app } from "../../app";
import request from "supertest";
it("has a route handler listening to api/tickets for post requires", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});
it("can only be accessed if the user sign in", async () => {
  const response = await request(app).post("/api/tickets").send({}).expect(401);
});

it("return a status other than 401 if the user singin", async () => {
  await global.signin();
  await request(app).post("/api/tickets").send({}).expect(201);
});

it("returns an error if an invalid title is provided", async () => {});
it("return an error if a invalid prices provided", async () => {});
it("create an valid ticket", async () => {});
