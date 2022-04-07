import { queueGroupName } from "./queue-group-name";
import {
  Listener,
  Subjects,
  ExpirationCompleteEvent,
  OrderStatus,
} from "@taitasudev5/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    order.set({ status: OrderStatus.Cancelled, ticket: null });
    await order.save();
    msg.ack();
  }
}