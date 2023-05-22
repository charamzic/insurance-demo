import { Router } from "express";
import { authController } from "../../controller/auth/authController.js";
import { checkUser } from "../../config/authMiddleware.js";

const router = Router();

router.get('*', checkUser);
router.get('/login/:name', authController.getLogin);
router.get('/logout', authController.getLogout);

export default router;