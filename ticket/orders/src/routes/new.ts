import express, { Request, Response, NextFunction } from "express";
import { requireAuth, validationRequest } from "@taitasudev5/common";
import { body } from "express-validator";
import mongoose from "mongoose";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    res.send("Orders");
  }
);

export { router as newRouter };
