import express, { Request, Response, NextFunction } from "express";
import { Order, OrderStatus } from "../models/order";
import {
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@taitasudev5/common";

const router = express.Router();

router.delete(
  "/api/delete/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (req.currentUser!.id !== order.userId) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    res.send(order);
  }
);

export { router as deleteRouter };
