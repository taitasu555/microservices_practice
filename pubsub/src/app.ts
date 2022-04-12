// Express アプリとサーバーの分離
import express from "express";
import rc from "rc";

const app = express();

const setting = rc("pubsub", {
  port: 3000,
  host: "localhost",
});

export { app };
