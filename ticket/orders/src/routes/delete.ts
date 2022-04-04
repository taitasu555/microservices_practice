import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.delete("/api/delete/:orderId", async (req: Request, res: Response) => {
  res.send("Orders");
});

export { router as deleteRouter };
