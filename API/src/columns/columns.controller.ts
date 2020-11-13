
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { TasksService} from './../tasks/tasks.service'
@Controller('columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService
        , private readonly tasksService: TasksService) { }

    @Get()
    async getAllColumn() {
        return await this.columnsService.getAllColumn();
    }

    @Get('/:value/:board')
    async getTaskOfBoard(@Param('value') value: Number, @Param('board') boardID: string){
        return await this.tasksService.getTaskOfBoardIDAndColumnType(boardID, value);
    }
}
