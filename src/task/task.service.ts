import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const task = new this.taskModel({ ...createTaskDto, user: userId });
    return task.save();
  }

  async findUserTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ user: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, user: userId });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: id, user: userId },
      updateTaskDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTask)
      throw new NotFoundException(`Task with id ${id} not found`);

    return updatedTask;
  }

  async delete(id: string, userId: string): Promise<void> {
    const result = await this.taskModel.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!result) throw new NotFoundException(`Task with id ${id} not found`);
  }
}
