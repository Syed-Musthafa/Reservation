import { Router } from "express";
import { bookingController } from "../controllers/bookingController.js";
import {
  createBookingValidation,
  updateBookingValidation,
} from "../validators/bookingValidator.js";
import { handleValidationErrors } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.post(
  "/",
  [authMiddleware, createBookingValidation, handleValidationErrors],
  bookingController.createBooking
);

router.get("/", authMiddleware, bookingController.getAllBookings);

router.get("/:id", bookingController.getBookingById);

router.put(
  "/:id",
  [authMiddleware, updateBookingValidation, handleValidationErrors],
  bookingController.updateBooking
);

router.patch("/:id/cancel", bookingController.cancelBooking);

export default router;
