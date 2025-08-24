import { Router } from "express";
import { createRoomValidation } from "../validators/roomValidator.js";
import { handleValidationErrors } from "../middlewares/validate.js";
import { roomController } from "../controllers/roomController.js";

const router = Router();

router.post(
  "/",
  createRoomValidation,
  handleValidationErrors,
  roomController.createRoom
);

router.get("/", roomController.getAllRooms);

export default router;
