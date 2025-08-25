import { Router } from "express";

// Routes
import userRouter from "./userRouter.js";
import roomRouter from "./roomRouter.js";
import bookingRouter from "./bookingRouter.js";

const router = Router();

// Routes
router.use("/users", userRouter);
router.use("/rooms", roomRouter);
router.use("/bookings", bookingRouter);

export default router;
