import { Router } from 'express';
import { insuredController } from "../controller/insuredController.js";
import { authenticate } from "../config/authMiddleware.js";

const router = Router();

router.get('/', authenticate, insuredController.getAllInsureds);
router.get('/create', authenticate, insuredController.getInsuredCreate);
router.post('/', authenticate, insuredController.postInsuredCreate);
router.get('/:id', authenticate, insuredController.getInsuredDetail);
router.post('/update', authenticate, insuredController.postInsuredUpdate);
router.delete('/:id', authenticate, insuredController.insuredDelete);

export default router;