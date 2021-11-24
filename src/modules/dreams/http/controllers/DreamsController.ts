import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { filterObjKeys } from 'unch';

import { CreateDreamService } from '@modules/dreams/services/CreateDreamService';
import { BrowseDreamsByUserService } from '@modules/dreams/services/BrowseDreamsByUserService';
import { ReadDreamService } from '@modules/dreams/services/ReadDreamService';
import { UpdateDreamService } from '@modules/dreams/services/UpdateDreamService';
import { DeleteDreamService } from '@modules/dreams/services/DeleteDreamService';

export class DreamsController {
  public async browse(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const browseDreamByUser = container.resolve(BrowseDreamsByUserService);
    const dreams = await browseDreamByUser.execute({ userId });

    const parsedDreams = dreams.map(dream =>
      filterObjKeys(dream, ['id', 'name', 'deadline', 'value', 'progression']),
    );

    return res.json(parsedDreams);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id } = req.params;

    const readDream = container.resolve(ReadDreamService);

    const dream = await readDream.execute({ dreamId: id, userId });

    const parsedDream = filterObjKeys(dream, [
      'id',
      'name',
      'deadline',
      'value',
      'contributions',
    ]);

    return res.json(parsedDream);
  }

  public async edit(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, deadline, value } = req.body;

    const updateDream = container.resolve(UpdateDreamService);

    const dream = await updateDream.execute({
      dreamId: id,
      userId,
      name,
      deadline,
      value,
    });

    const parsedDream = filterObjKeys(dream, [
      'id',
      'name',
      'deadline',
      'value',
      'contributions',
    ]);

    return res.json(parsedDream);
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

    const parsedDream = filterObjKeys(dream, [
      'id',
      'name',
      'deadline',
      'value',
    ]);

    return res.json(parsedDream);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id } = req.params;

    const deleteDream = container.resolve(DeleteDreamService);

    await deleteDream.execute({ dreamId: id, userId });

    return res.status(204).json();
  }
}
