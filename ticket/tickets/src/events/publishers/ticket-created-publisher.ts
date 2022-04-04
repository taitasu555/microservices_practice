import { Publisher, Subjects, TicketCreatedEvent } from "@taitasudev5/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    
}

