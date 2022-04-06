import express from "express";
import { currentUser } from "@taitasudev5/common";
import { Request, Response } from "express";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
