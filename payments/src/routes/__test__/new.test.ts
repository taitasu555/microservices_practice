import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import mongoose from "mongoose";
import { OrderStatus } from "@taitasudev5/common";
import { stripe } from "../../stripe";
import { Payment } from "../../models/payments";

jest.mock("../../stripe");

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

it("return a 401 when order does not belong to user ", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "asdasdasd",
      orderId: order.id,
    })
    .expect(401);
});

it("return a 400 when order was cancelled", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "asdasdasd",
      orderId: order.id,
    })
    .expect(400);
});

it("returns a 204 with valid input", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);

  const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  const chargeResult = await (stripe.charges.create as jest.Mock).mock
    .results[0].value;
  expect(chargeOptions.source).toEqual("tok_visa");
  expect(chargeOptions.amount).toEqual(20 * 100);
  expect(chargeOptions.currency).toEqual("usd");

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: chargeResult.id,
  });

  expect(payment).toBeDefined();
  expect(payment!.orderId).toEqual(order.id);
  expect(payment!.stripeId).toEqual(chargeResult.id);
});
