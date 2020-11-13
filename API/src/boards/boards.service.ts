import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BoardDocument, Board } from './board.model'

@Injectable()
export class BoardsService {
    constructor(@InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,) {}

    async getAllBoard(){
        const result = await this.boardModel.find().exec();
        return result;
    }

    async insertBoard(name: string, user: String){
        const newBoard = new this.boardModel({
            name,
            date: new Date(),
            url: null,
            user: user
        });
        
        const result = await newBoard.save();
        newBoard.url = "https://leetankhongs.github.io/retro-spective-final/#/final/retro-spective-final/boards?id=" + result._id;
        await newBoard.save();
        return result._id;
    }

    async deleteBoard(boardID: string){
        try {
            const result = await this.boardModel.deleteOne({_id: boardID}).exec();
        } catch (error) {
            console.log(error)
        }
    }

    async getBoard(boardID: String){
        try{
            return await this.boardModel.findOne({_id: boardID}).exec();
        }
        catch(err){
            return null;
        }
    }

    async getBoardsOfUser(userID: String){
        return await this.boardModel.find({user: userID}).exec();
    }
    
    async editOldBoard(boardID: String, newProperties: object): Promise<boolean> {
        try {
            const doc = await this.boardModel.findOne({ _id: boardID });
            const keyNames = Object.keys(newProperties);
            for(let i = 0; i < keyNames.length; i++){
                doc[keyNames[i]] = newProperties[keyNames[i]];
            }
            
            await doc.save();
            return true;
        } catch (err) {
            return false;
        }
    }
}
