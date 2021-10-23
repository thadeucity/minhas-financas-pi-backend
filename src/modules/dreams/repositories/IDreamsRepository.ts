import { Dream } from '@entities/Dream';
import { ICreateDreamDTO } from '../dtos/ICreateDreamDTO';

export interface IDreamsRepository {
  findById(id: string): Promise<Dream | undefined>;
  findByUser(userId: string): Promise<Dream | undefined>;
  create(data: ICreateDreamDTO): Promise<Dream>;
  save(user: Dream): Promise<Dream>;
}
