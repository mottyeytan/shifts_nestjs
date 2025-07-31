import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './users.entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    
    async createUser(body) {

        const userExists = await UserEntity.findOne({ where: { email: body.email,  } });
        if (userExists) {
            throw new BadRequestException('User already exists');
        }
        const user = new UserEntity();
        user.name = body.name;
        user.email = body.email;
        user.password = await bcrypt.hash(body.password, 10);
        user.role = body.role;
         user.save();
        return;
    }   
}
