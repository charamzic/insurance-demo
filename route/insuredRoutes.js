import { Router } from 'express';
import { insuredController } from "../controller/insuredController.js";

const router = Router();

router.get('/', insuredController.getAllInsureds);
router.get('/create', insuredController.getInsuredCreate);
router.post('/', insuredController.postInsuredCreate);
router.get('/:id', insuredController.getInsuredDetail);
router.post('/update', insuredController.postInsuredUpdate);
router.delete('/:id', insuredController.insuredDelete);

export default router;