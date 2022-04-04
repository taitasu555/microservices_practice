import express, { Request, Response, NextFunction } from "express";
import {
  requireAuth,
  validationRequest,
  NotFoundError,
  OrderStatus,
  BadRequestError,
} from "@taitasudev5/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router();

// const isReserved = await ticket.isReserved();

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
    const { ticketId } = req.body;
    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }
    //  Make sure the ticket not already reserved
    // run query to look at all orders. Find an order where the ticket
    // is the ticket we just found *and* the order status is *not* cancelled
    // if we find an order from that means the ticket *is* reserved

    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }
    // Calculate an expiration date for the order

    // Build the order and save it to the database

    // publish an event saying that an order was created
  }
);

export { router as newRouter };
