import { Router } from 'express';
import { insuranceApiController } from '../../controller/api/insuranceApiController.js'

const router = Router();

router.get('/', insuranceApiController.getAll);
router.get('/:id', insuranceApiController.getOne);
router.post('/', insuranceApiController.create);
router.put('/:id', insuranceApiController.update);
router.delete('/:id', insuranceApiController.remove);

export default router;