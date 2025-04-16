import { Type } from "class-transformer";
import { IsDate,  IsString, Length } from "class-validator";

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

  completed: boolean;
}
