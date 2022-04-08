import { Subjects, Publisher, PaymentCreatedEvent } from "@taitasudev5/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
