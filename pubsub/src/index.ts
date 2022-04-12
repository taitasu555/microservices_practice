import { app } from "./app";
import { listenForMessages } from "./events/sub";
import { publishMessage } from "./events/pub";

listenForMessages();
app.get("/pubsub", (req, res) => {
  const value = JSON.stringify({ foo: "Taishin" });
  publishMessage(value);
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
