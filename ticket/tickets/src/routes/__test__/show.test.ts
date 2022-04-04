import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

jest.mock("../../__mock__/nats-wrapper.ts");
it("returns a 404 if the ticket not found", async () => {
  // if we use console.log delete expect
  const id = new mongoose.Types.ObjectId().toHexString();
  // id must be a format as a mongodb
  const response = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});

it("return the ticket if the ticket found", async () => {
  // create a ticket
  const title = "concert";
  const price = 20;
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
