import ensureAuthenticated from '@modules/users/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import { ContributionsController } from '../controllers/ContributionsController';

const contributionsRouter = Router();
const contributionsController = new ContributionsController();

contributionsRouter.use(ensureAuthenticated);

contributionsRouter.post('/', contributionsController.add);
contributionsRouter.get('/', contributionsController.browse);
contributionsRouter.get('/:id', contributionsController.read);
contributionsRouter.put('/:id', contributionsController.edit);
contributionsRouter.delete('/:id', contributionsController.delete);

export { contributionsRouter };
