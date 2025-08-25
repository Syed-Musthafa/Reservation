import { Router } from "express";
import { createRoomValidation } from "../validators/roomValidator.js";
import { handleValidationErrors } from "../middlewares/validate.js";
import { roomController } from "../controllers/roomController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/",
  createRoomValidation,
  handleValidationErrors,
  roomController.createRoom
);

router.get("/", roomController.getAllRooms);
router.get("/:id", roomController.getRoomById);

export default router;
