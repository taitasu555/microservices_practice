/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const topicNameOrId = "my-topic";
const data = JSON.stringify({ foo: "zer" });

// Imports the Google Cloud client library
const { PubSub } = require("@google-cloud/pubsub");

// Creates a client; cache this for further use
const pubSubClient = new PubSub({
  projectId: "ticketing-dev-345606",
});

const publishMessage = async (value: string) => {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(value);

  try {
    const messageId = await pubSubClient
      .topic(topicNameOrId)
      .publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
  } catch (error: any) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
};

export { publishMessage };
