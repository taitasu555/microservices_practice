import { Publisher, Subjects, TicketCreatedEvent } from "@taitasudev5/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
