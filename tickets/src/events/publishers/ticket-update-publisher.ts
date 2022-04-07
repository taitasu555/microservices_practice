import { Publisher, Subjects, TicketUpdatedEvent } from "@taitasudev5/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
