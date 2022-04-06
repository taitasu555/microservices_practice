import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Listener, TicketCreatedEvent, Subjects } from "@taitasudev5/common";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // same as publisher
  readonly subject = Subjects.TicketCreated;

  // １つのコンテイナのみにアクセスが行くようにするために、queueGroupNameを定義　378
  queueGroupName = queueGroupName;
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });

    await ticket.save();

    //   ack is check the method is success or not
    msg.ack();
  }
}
