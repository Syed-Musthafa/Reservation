import { body } from "express-validator";

const createRoomValidation = [
  body("name")
    .notEmpty()
    .withMessage("Room name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Room name must be between 2 and 100 characters")
    .trim()
    .escape(),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters")
    .trim()
    .escape(),

  body("room_type")
    .notEmpty()
    .withMessage("Room type is required")
    .isIn(["MEETING_HALL", "ROOM"])
    .withMessage("Room type must be either 'MEETING_HALL' or 'ROOM'"),
];

export { createRoomValidation };
