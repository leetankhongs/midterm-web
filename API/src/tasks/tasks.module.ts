import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.model'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller';
import {AppGateway} from './task.gateway'
@Module({
    imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
    controllers: [TasksController],
    providers: [TasksService, AppGateway],
    exports: [TasksService]
})
export class TasksModule { }



