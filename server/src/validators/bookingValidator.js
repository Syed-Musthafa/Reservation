import { body } from "express-validator";

const createBookingValidation = [
  body("room_id")
    .notEmpty()
    .withMessage("Room ID is required")
    .isInt({ min: 1 })
    .withMessage("Room ID must be a valid integer"),

  body("from_time")
    .notEmpty()
    .withMessage("From time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("From time must be in HH:MM:SS format"),

  body("to_time")
    .notEmpty()
    .withMessage("To time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("To time must be in HH:MM:SS format"),

  body("booking_date")
    .notEmpty()
    .withMessage("Booking date is required")
    .isDate()
    .withMessage("Booking date must be a valid date in YYYY-MM-DD format"),
];

const updateBookingValidation = [
  body("from_time")
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("From time must be in HH:MM:SS format"),

  body("to_time")
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("To time must be in HH:MM:SS format"),

  body("booking_date")
    .optional()
    .isDate()
    .withMessage("Booking date must be a valid date in YYYY-MM-DD format"),
];

export { createBookingValidation, updateBookingValidation };
