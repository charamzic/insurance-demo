import { Router } from 'express';
import { insuranceController } from "../controller/insuranceController.js";
import { authenticate } from "../config/authMiddleware.js";

const router = Router();

router.get('/', authenticate, insuranceController.getAllInsurances);
router.get('/create', authenticate, insuranceController.getInsuranceCreate);
router.post('/', authenticate, insuranceController.postInsuranceCreate);
router.get('/:id', authenticate, insuranceController.getInsuranceDetail);
router.post('/update', authenticate, insuranceController.postInsuranceUpdate);
router.delete('/:id', authenticate, insuranceController.insuranceDelete);

export default router;