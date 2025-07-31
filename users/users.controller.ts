import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './users.entities';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() body: UserEntity) {
       try {
        await this.usersService.createUser(body);
        return {
            message: 'User created successfully'
        }
    } catch (error) {
        return {
            message: 'User creation failed',
            error: error.message
        }
    }
}}
