
import { Controller, Get, Post, Body, Delete, Param, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model'

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    async addTask(
        @Body('type') prodName: Number,
        @Body('description') prodDesc: string,
        @Body('board') prodBoard: string) {
        const generatedId = await this.tasksService.insertTask(
            prodName,
            prodDesc,
            prodBoard
        );
        return { id: generatedId };
    }

    @Delete(':id')
    async deleteTask(@Param('id') taskID: String) {
        await this.tasksService.deleteTask(taskID)
    }

    @Get()
    async getAllTasks() {
        return await this.tasksService.getAllTask();
    }

    @Get('/board')
    async getTaskOfBoardID(@Query('id') boardID: string) {
        return await this.tasksService.getTaskOfBoardID(boardID);
    }

    @Post('/edit/:id')
    async editOldTask(@Param('id') taskID: String, @Body() newProperties: object): Promise<boolean> {
        return this.tasksService.editOldTask(taskID, newProperties);
    }

    @Post('/move')
    async moveTask(@Body('boardID') boardID: String,
        @Body('columnSource') columnSource: Number,
        @Body('columnDestination') columnDestination: Number,
        @Body('indexSource') indexSource: Number,
        @Body('indexDestination') indexDestination: Number) {
        await this.tasksService.moveTask(boardID, columnSource, columnDestination, indexSource, indexDestination);
    }

    @Post('/reorder')
    async reorderTask(@Body('boardID') boardID: String,
        @Body('column') column: Number,
        @Body('indexSource') indexSource: Number,
        @Body('indexDestination') indexDestination: Number) {
        await this.tasksService.reorderTask(boardID, column, indexSource, indexDestination);
    }
}
