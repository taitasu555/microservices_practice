import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@taitasudev5/common";
import { newRouter } from "./routes/new";
import { deleteRouter } from "./routes/delete";
import { showRouter } from "./routes/show";
import { indexRouter } from "./routes";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
app.use(newRouter);
app.use(deleteRouter);
app.use(showRouter);
app.use(indexRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
