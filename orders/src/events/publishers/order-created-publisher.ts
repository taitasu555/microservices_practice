import { Publisher, OrderCreatedEvent, Subjects } from "@taitasudev5/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
