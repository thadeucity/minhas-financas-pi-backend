import { Router } from 'express';

import { ContributionsController } from '../controllers/ContributionsController';

const contributionsRouter = Router();
const contributionsController = new ContributionsController();

contributionsRouter.post('/', contributionsController.create);

export { contributionsRouter };
