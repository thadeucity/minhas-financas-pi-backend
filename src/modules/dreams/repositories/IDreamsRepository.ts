import { Dream } from '@entities/Dream';
import { ICreateDreamDTO } from '../dtos/ICreateDreamDTO';

export interface IDreamsRepository {
  findById(id: string): Promise<Dream | undefined>;
  findAllByUser(userId: string): Promise<Dream[]>;
  create(data: ICreateDreamDTO): Promise<Dream>;
  save(user: Dream): Promise<Dream>;
  delete(id: string): Promise<void>;
}
