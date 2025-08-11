import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(3)
  title: string;

  @IsString()
  @Length(3)
  description: string;

  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsString()
  user: string;
}
