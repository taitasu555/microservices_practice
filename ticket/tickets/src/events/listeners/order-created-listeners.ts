import { queueGroupName } from "./queue-group-name";
import { Listener, OrderCreatedEvent, Subjects } from "@taitasudev5/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-update-publisher";

export class OrderCreatedListeners extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //   Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: data.id });
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    await ticket.save();
    msg.ack();
  }
}
