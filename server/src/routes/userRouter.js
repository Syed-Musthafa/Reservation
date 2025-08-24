import { Router } from "express";
import {
  registerUserValidation,
  loginUserValidation,
} from "../validators/userValidator.js";
import { handleValidationErrors } from "../middlewares/validate.js";
import { userController } from "../controllers/userController.js";

const router = Router();

router.post(
  "/register",
  registerUserValidation,
  handleValidationErrors,
  userController.registerUser
);

router.post(
  "/login",
  loginUserValidation,
  handleValidationErrors,
  userController.loginuser
);

export default router;
