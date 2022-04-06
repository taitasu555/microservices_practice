import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  return request(app).post("/api/users/signout").expect(200);
});
