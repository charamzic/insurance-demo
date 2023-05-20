import { Router } from 'express';
import { insuredApiController } from '../../controller/api/insuredApiController.js'

const router = Router();

router.get('/', insuredApiController.getAll);
router.get('/:id', insuredApiController.getOne);
router.post('/', insuredApiController.create);
router.put('/:id', insuredApiController.update);
router.delete('/:id', insuredApiController.remove);

export default router;