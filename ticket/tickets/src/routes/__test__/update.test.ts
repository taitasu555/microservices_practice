import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

jest.mock("../../__mock__/nats-wrapper.ts");
it("return 404 if target update ticket not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "new concert",
      price: 20,
    })
    .expect(404);
});
it("return 401 if user not authorized", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "new concert",
      price: 20,
    })
    .expect(401);
});
it("return 401 if user does not have a ticket", async () => {
  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", global.signin())
    .send({
      title: "concert",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "new concert",
      price: 30,
    })
    .expect(401);
});

it("return 404 if the user provide empty tile and price", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", cookie)
    .send({
      title: "concert",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);
});
it("return 400 if the user provide valid params", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", cookie)
    .send({
      title: "concert",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "super concert",
      price: 40,
    })
    .expect(200);

  const UpdateTicket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(UpdateTicket.body.title).toEqual("super concert");
  expect(UpdateTicket.body.price).toEqual(40);
});
