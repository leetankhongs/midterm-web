import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { };

    async findOne(email: String): Promise<User> {
        return await this.userModel.findOne({ email: email }).exec();
    }

    async createNewUser(firstName: String, lastName: String, email: String, password: String, phone: String): Promise<String> {
        
        const doc = await this.userModel.findOne({ email: email });
        if(doc)
            return null;

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = new this.userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            phone: phone
        });

        const result = await newUser.save();
        return result._id;
    }

    async editOldUser(userID: String, newProperties: object): Promise<boolean> {
        try {
            const doc = await this.userModel.findOne({ _id: userID });
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

    async getUser(userID: String): Promise<User> {
        return await this.userModel.findOne({ _id: userID });
    }

    async changePassword(userID: String, oldPassword: String, newPassword: String): Promise<boolean> {
        const doc = await this.userModel.findOne({ _id: userID });
        if (doc === null) {
            return false;
        }

        if (bcrypt.compareSync(oldPassword, doc.password)) {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            doc.password = bcrypt.hashSync(newPassword, salt);
            await doc.save();
            return true;
        }
        else {
            return false;
        }
    }
}
