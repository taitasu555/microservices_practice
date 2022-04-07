import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@taitasudev5/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
