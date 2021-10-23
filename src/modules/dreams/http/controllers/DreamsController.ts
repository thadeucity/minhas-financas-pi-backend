import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDreamService } from '@modules/dreams/services/CreateDreamService';

export class DreamsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, deadline, userId, value } = req.body;

    const createDream = container.resolve(CreateDreamService);

    const dream = await createDream.execute({
      name,
      deadline,
      userId,
      value,
    });

    return res.json(dream);
  }
}
