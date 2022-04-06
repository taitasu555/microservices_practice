import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedEvent } from "@taitasudev5/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  //create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);
  // create a fake data event
  // @ts-ignore
  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  // @ts-ignore
  // create a fake message function with the data object + message object
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg };
};

it("creates and save a ticket", async () => {
  // write assertions to make sure a ticket was created
  const { listener, data, msg } = await setup();
  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assertions to make sure a ticket was created
  const ticket = await Ticket.findById(data.id);
  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
});

it("ack the message", async () => {
  // call the onMessage function with the data object + message object
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  // write assertions to make sure ack function was called
  expect(msg.ack).toHaveBeenCalled();
});
