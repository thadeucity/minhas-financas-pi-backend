import { Router } from 'express';

import ensureAuthenticated from '@modules/users/http/middlewares/ensureAuthenticated';
import { DreamsController } from '../controllers/DreamsController';

const dreamsController = new DreamsController();

const dreamsRouter = Router();

dreamsRouter.use(ensureAuthenticated);

dreamsRouter.post('/', dreamsController.add);
dreamsRouter.get('/', dreamsController.browse);
dreamsRouter.get('/:id', dreamsController.read);
dreamsRouter.put('/:id', dreamsController.edit);
dreamsRouter.delete('/:id', dreamsController.delete);

export { dreamsRouter };
