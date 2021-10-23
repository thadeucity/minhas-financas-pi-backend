import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateContributionService } from '@modules/contributions/services/CreateContributionService';
import { ListContributionService } from '@modules/contributions/services/ListContributionsService';
import { ReadContributionService } from '@modules/contributions/services/ReadContributionService';
import { UpdateContributionService } from '@modules/contributions/services/UpdateContributionService';
import { DeleteContributionService } from '@modules/contributions/services/DeleteContributionService';

export class ContributionsController {
  public async browse(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { dreamId } = req.query;

    const listContributions = await container.resolve(ListContributionService);

    const singleDreamId = Array.isArray(dreamId) ? dreamId[0] : dreamId;
    const safeDreamId = singleDreamId ? String(singleDreamId) : undefined;

    const contributions = await listContributions.execute({
      dreamId: safeDreamId,
      userId,
    });

    return res.json(contributions);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id } = req.params;

    const readContribution = container.resolve(ReadContributionService);

    const contribution = await readContribution.execute({
      contributionId: id,
      userId,
    });

    return res.json(contribution);
  }

  public async edit(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id } = req.params;
    const { value, isNegative } = req.body;

    const editContribution = container.resolve(UpdateContributionService);

    const contribution = await editContribution.execute({
      contributionId: id,
      userId,
      value,
      isNegative,
    });

    return res.json(contribution);
  }

  public async add(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { value, isNegative, dreamId } = req.body;

    const createContribution = container.resolve(CreateContributionService);

    const contribution = await createContribution.execute({
      value,
      isNegative,
      dreamId,
      userId,
    });

    return res.json(contribution);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { id } = req.params;

    const deleteContribution = container.resolve(DeleteContributionService);

    await deleteContribution.execute({
      contributionId: id,
      userId,
    });

    return res.status(204).json();
  }
}
