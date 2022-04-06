import { queueGroupName } from "./queue-group-name";
import { Listener, OrderCreatedEvent, Subjects } from "@taitasudev5/common";
import { Message } from "node-nats-streaming";
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {}
}
