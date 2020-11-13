import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument, Task } from './task.model'

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) { }

    async getAllTask() {
        const result = await this.taskModel.find().exec();
        return result;
    }

    async insertTask(type: Number, description: String, board: String) {
        const allTaskOfBoard = await this.getTaskOfBoardIDAndColumnType(board, type);
        const index = allTaskOfBoard.length;
        const newTask = new this.taskModel({
            type,
            description,
            board,
            index
        });
        const result = await newTask.save();
        return result._id;
    }

    async deleteTask(taskID: String) {
        try {
            const task = await this.taskModel.findOne({ _id: taskID });
            const sameTask = await this.taskModel.find({ board: task.board, type: task.type }).sort({ index: 1 });
            for (let i = Number(task.index + 1); i < sameTask.length; i++) {
                sameTask[i].index = sameTask[i].index - 1;
                await sameTask[i].save();
            }
            await this.taskModel.deleteOne({ _id: taskID }).exec();
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllTaskOfBoard(boardID: String) {
        const docs = await this.taskModel.find({ board: boardID });

        const arrays = docs.map(doc => doc._id);

        await this.taskModel.deleteMany({ _id: { $in: arrays } }).exec()
    }

    async getTaskOfBoardID(boardID: String) {
        const result = await this.taskModel.find({ board: boardID }).exec();
        return result;
    }

    async getTaskOfBoardIDAndColumnType(boardID: String, columnType: Number) {
        const result = await this.taskModel.find({ board: boardID, type: columnType }).sort({ index: 1 });
        return result;
    }

    async editOldTask(taskID: String, newProperties: object): Promise<boolean> {
        try {
            const doc = await this.taskModel.findOne({ _id: taskID });
            const keyNames = Object.keys(newProperties);
            for (let i = 0; i < keyNames.length; i++) {
                doc[keyNames[i]] = newProperties[keyNames[i]];
            }

            await doc.save();
            return true;
        } catch (err) {
            return false;
        }
    }

    async moveTask(boardID: String, columnSource: Number, columnDestination: Number, indexSource: Number, indexDestination: Number) {
        const tasksSource = await this.taskModel.find({ board: boardID, type: columnSource }).sort({ index: 1 });
        const tasksDestination = await this.taskModel.find({ board: boardID, type: columnDestination }).sort({ index: 1 });

        const [removed] = tasksSource.splice(indexSource, 1);

        for (let i = Number(indexSource); i < tasksSource.length; i++) {
            tasksSource[i].index = i;
            await tasksSource[i].save();
        }

        tasksDestination.splice(indexDestination, 0, removed);
        removed.type = columnDestination;

        for (let i = Number(indexDestination); i < tasksDestination.length; i++) {
            tasksDestination[i].index = i;
            await tasksDestination[i].save();
        }
    }

    async reorderTask(boardID: String, column: Number, indexSource: Number, indexDestination: Number) {
        const tasks = await this.taskModel.find({ board: boardID, type: column }).sort({ index: 1 });
        const [moved] = tasks.splice(indexSource, 1);
        tasks.splice(indexDestination, 0, moved);


        const start = indexSource > indexDestination ? indexDestination : indexSource;

        for (let i = Number(start); i < tasks.length ; i++) {
            tasks[i].index = i;
            tasks[i].save();
        }

    }
}
