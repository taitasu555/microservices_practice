import { Publisher, OrderCancelledEvent, Subjects } from "@taitasudev5/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
