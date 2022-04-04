import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

const stan = nats.connect("ticketing", "123", {
  url: "http://localhost:4222",
});

// @ts-ignore
stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = {
    id: "123",
    title: "concert",
    price: 20,
  };

  // this is chanel name ticket:created
  stan.publish("ticket:created", JSON.stringify(data), () => {
    console.log("Event published");
  });
});
