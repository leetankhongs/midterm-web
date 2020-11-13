import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service'
import { User } from './user.model'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(":id")
    async getUser(@Param("id") idUser: String): Promise<User> {
        return await this.usersService.getUser(idUser);
    }

    @Post()
    async createNewUser(
        @Body('firstName') prodFirstName: String,
        @Body('lastName') prodLastName: String,
        @Body('email') prodEmail: String,
        @Body('password') prodPassword: String,
        @Body('phone') prodPhone: String) {

        return { id: await this.usersService.createNewUser(prodFirstName, prodLastName, prodEmail, prodPassword, prodPhone) };
    }

    @Post('/edit/:id')
    async editOldTask(@Param('id') userID: String, @Body() newProperties: object): Promise<boolean> {
        return this.usersService.editOldUser(userID, newProperties);
    }

    @Post('/change-password/:id')
    async changePassword(@Param('id') userID: String, @Body('oldPassword') oldPassword: String, @Body('newPassword') newPassword: String): Promise<boolean> {
        return this.usersService.changePassword(userID, oldPassword, newPassword)
    }

}
