import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.loginUser);
router.post('/verify-email', AuthController.verifyEmail);

export const AuthRoutes = router;
