import { Router } from 'express';
import { insuranceController } from "../controller/insuranceController.js";

const router = Router();

router.get('/', insuranceController.getAllInsurances);
router.get('/create', insuranceController.getInsuranceCreate);
router.post('/', insuranceController.postInsuranceCreate);
router.get('/:id', insuranceController.getInsuranceDetail);
router.post('/update', insuranceController.postInsuranceUpdate);
router.delete('/:id', insuranceController.insuranceDelete);

export default router;