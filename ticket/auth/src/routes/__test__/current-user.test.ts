import { response } from "express";
import request from "supertest";
import { app } from "../../app";

it("response of current user", async () => {
  const cookie = await global.signin();

  // this test use token when executed
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("response of current user with an empty cookie", async () => {
  const cookie = "";

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send();

  expect(response.body.currentUser).toEqual(null);
});
