import express, { Request, Response, NextFunction } from "express";
import { requireAuth } from "@taitasudev5/common";

import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  // get ref data using populate
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");

  res.send(orders);
});

export { router as indexRouter };
