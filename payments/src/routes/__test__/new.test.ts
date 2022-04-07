import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import mongoose from "mongoose";

it("returns order not exists", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "asdasdasd",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("return a 401 when order does not belong to user ", async () => {});

it("return a 400 when order was cancelled", async () => {});
