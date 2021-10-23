import { Router } from 'express';

import usersRouter from '@modules/users/http/routes/users.routes';
import sessionsRouter from '@modules/users/http/routes/sessions.routes';
import { dreamsRouter } from '@modules/dreams/http/routes/dreams.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/dreams', dreamsRouter);

export { routes };
