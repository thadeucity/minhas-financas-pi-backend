import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateContributionService } from '@modules/contributions/services/CreateContributionService';

export class ContributionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { value, isNegative, dreamId } = req.body;

    const createContribution = container.resolve(CreateContributionService);

    const contribution = await createContribution.execute({
      value,
      isNegative,
      dreamId,
    });

    return res.json(contribution);
  }
}
