import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Request,
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
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.taskService.create(createTaskDto, req.user._id);
  }

  @Get()
  @UseGuards(AuthGuard)
  findUserTasks(@Request() req) {
    return this.taskService.findUserTasks(req.user._id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param() params: FindByIdDto, @Request() req) {
    return this.taskService.findOne(params.id, req.user._id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param() params: FindByIdDto,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    return this.taskService.update(params.id, updateTaskDto, req.user._id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param() params: FindByIdDto, @Request() req) {
    return this.taskService.delete(params.id, req.user._id);
  }
}
