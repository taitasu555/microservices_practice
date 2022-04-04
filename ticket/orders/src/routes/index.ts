import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/api/orders", async (req: Request, res: Response) => {
  res.send("Orders");
});

export { router as indexRouter };
