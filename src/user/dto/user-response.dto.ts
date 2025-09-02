import { Exclude, Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class UserResponseDto {
  // /* Convert _id to id and ensure it's a string */
  @Expose({ name: 'id' })
  @Transform(({ obj }) => obj._id.toString()) // Converts ObjectId → string
  _id: Types.ObjectId;

  /* Convert _id to string */
  // @Transform(({ value }) => value.toString())
  // _id: Types.ObjectId;

  name: string;
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
