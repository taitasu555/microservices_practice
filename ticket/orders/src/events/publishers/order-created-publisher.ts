import { Publisher, OrderCreatedEvent, Subjects } from "@taitasudev5/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
