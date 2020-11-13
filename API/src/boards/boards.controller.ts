
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { TasksService } from './../tasks/tasks.service'

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService,
                private readonly tasksService: TasksService) { }

    @Post()
    async addBoard(
        @Body('name') prodName: string, @Body('user') prodUser: string) {
        const generatedId = await this.boardsService.insertBoard(prodName, prodUser);
        
        return { id: generatedId };
    }

    @Delete(':id')
    deleteBoard(@Param('id') boardID: string) {
        this.boardsService.deleteBoard(boardID)
        this.tasksService.deleteAllTaskOfBoard(boardID);
    }

    @Get()
    async getAllBoards() {
        return await this.boardsService.getAllBoard();
    }

    @Get(':id')
    async getBoard(@Param('id') boardID: String) {
        return await this.boardsService.getBoard(boardID);
    }

    @Get('/user/:id')
    async getBoardsOfUser(@Param('id') userID: String) {
        return await this.boardsService.getBoardsOfUser(userID);
    }

    @Post('/edit/:id')
    async editOldBoard(@Param('id') taskID: String, @Body() newProperties: object): Promise<boolean> {
        return this.boardsService.editOldBoard(taskID, newProperties);
    }
}
