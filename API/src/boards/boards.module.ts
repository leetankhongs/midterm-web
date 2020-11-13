import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './board.model'
import { BoardsService } from './boards.service'
import { BoardsController } from './boards.controller';
import {TasksModule} from './../tasks/tasks.module'
@Module({
    imports: [MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]), TasksModule],
    controllers: [BoardsController],
    providers: [BoardsService],
})
export class BoardsModule { }



