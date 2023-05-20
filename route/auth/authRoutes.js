import { Router } from "express";
import { authController } from "../../controller/auth/authController.js";

const router = Router();

router.get('/login', authController.getLogin);
// router.post('/login', authController.login);
// router.get('/logout', authController.login);

export default router;