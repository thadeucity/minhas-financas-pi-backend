import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDreamService } from '@modules/dreams/services/CreateDreamService';
import { BrowseDreamsByUserService } from '@modules/dreams/services/BrowseDreamsByUserService';
import { ReadDreamService } from '@modules/dreams/services/ReadDreamService';

export class DreamsController {
  public async browse(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const browseDreamByUser = container.resolve(BrowseDreamsByUserService);
    const dreams = await browseDreamByUser.execute({ userId });

    return res.json(dreams);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id } = req.params;

    const readDream = container.resolve(ReadDreamService);

    const dream = await readDream.execute({ dreamId: id, userId });

    return res.json(dream);
  }

  public async edit(req: Request, res: Response): Promise<Response> {
    // TODO: Implement edit dream
    return res.json({});
  }

  public async add(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { name, deadline, value } = req.body;

    const createDream = container.resolve(CreateDreamService);

    const dream = await createDream.execute({
      name,
      deadline,
      userId,
      value,
    });

    return res.json(dream);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    // TODO: Implement delete dream
    return res.json({});
  }
}
