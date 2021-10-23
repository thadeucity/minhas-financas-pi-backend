import { Router } from 'express';

import ensureAuthenticated from '@modules/users/http/middlewares/ensureAuthenticated';
import { DreamsController } from '../controllers/DreamsController';

const dreamsController = new DreamsController();

const dreamsRouter = Router();

dreamsRouter.use(ensureAuthenticated);

dreamsRouter.post('/', dreamsController.add);

export { dreamsRouter };
