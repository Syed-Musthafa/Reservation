import { Router } from 'express'
import { registerUserValidation } from '../validators/userValidator.js'
import { handleValidationErrors } from '../middlewares/validate.js';
import {userController} from '../controllers/userController.js';

const router = Router()

router.post('/',
  registerUserValidation,
  handleValidationErrors,
  userController.registerUser
);

export default router