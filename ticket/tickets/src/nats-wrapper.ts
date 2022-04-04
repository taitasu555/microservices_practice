import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  // _ is a private method
  private _client?: Stan;

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });
    return new Promise<void>((resolve, reject) => {
      this._client!.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });
      this._client!.on("error", (err) => {
        console.log("Error connecting to NATS");
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
