import { IsMongoId } from 'class-validator';

export class FindByIdDto  {
  @IsMongoId()
  id: string;
}
