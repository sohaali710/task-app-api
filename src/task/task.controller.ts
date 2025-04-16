import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { FindByIdDto } from './dto/find-by-id.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param() params: FindByIdDto) {
    return this.taskService.findOne(params.id);
  }

  @Put(':id') 
  @UseGuards(AuthGuard)
  update(@Param() params: FindByIdDto, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(params.id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param() params: FindByIdDto) {
    return this.taskService.delete(params.id);
  }
}