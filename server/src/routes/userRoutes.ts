import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserValidator from '../validations/UserValidator';
import { validate } from '../middlewares/validate';

const router = Router();

router.post('/register',validate(UserValidator.register), UserController.register);
router.post('/login', validate(UserValidator.login), UserController.login);
router.post('/refresh-token', UserController.refreshToken);

export default router;
