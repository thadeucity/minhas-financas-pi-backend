import { Router } from 'express';

import { DreamsController } from '../controllers/DreamsController';

const dreamsRouter = Router();
const dreamsController = new DreamsController();

dreamsRouter.post('/', dreamsController.create);

export { dreamsRouter };
