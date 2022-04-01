import express from "express";
import { currentUser } from "../../../common/src/middlewares/current-user";
import { Request, Response } from "express";
import { requireAuth } from "../../../common/src/middlewares/require-auth";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
