import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListeners } from "../order-cancelled-listeners";
import { Ticket } from "../../../models/ticket";
import mongoose from "mongoose";
import { OrderCancelledEvent } from "@taitasudev5/common";

const setup = async () => {
  const listener = new OrderCancelledListeners(natsWrapper.client);
  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: orderId,
  });
  ticket.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket.save();

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: ticket.version,
    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, ticket, data, msg };
};

it("updates the ticket, publishes an event, and acks the message", async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.orderId).not.toBeUndefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
