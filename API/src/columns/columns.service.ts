import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ColumnDocument } from './column.model'

@Injectable()
export class ColumnsService {
    constructor(@InjectModel('Column') private readonly columnModel: Model<ColumnDocument>) {}

    async getAllColumn(){
        const result = await this.columnModel.find().exec();
        return result;
    }

}
