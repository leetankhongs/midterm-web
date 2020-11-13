import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Column, ColumnSchema } from './column.model'
import { ColumnsService } from './columns.service'
import { ColumnsController } from './columns.controller';
import {TasksModule} from './../tasks/tasks.module'
@Module({
    imports: [MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),TasksModule],
    controllers: [ColumnsController],
    providers: [ColumnsService],
})
export class ColumnsModule { }



