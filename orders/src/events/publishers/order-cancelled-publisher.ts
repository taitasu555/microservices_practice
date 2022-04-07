import { Subjects, Publisher, OrderCancelledEvent } from "@taitasudev5/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
