import { Message, Stan } from "node-nats-streaming";

export abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: string, msg: Message): void;
  private client: Stan;
  private ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setDeliverAllAvailable()
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`received message: ${msg.getSequence()}`, msg.getData());

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}

class TicketCreatedListener extends Listener {
  subject = "ticket:created";
  queueGroupName = "payment-service";
  onMessage(data: any, msg: Message) {
    console.log("Event data", data);
    // acknowledge the message if error happen
    msg.ack();
  }
}
