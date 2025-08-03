import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserRole } from '../users/users.entities';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

        async register(registerDto: {
        name: string;
        password: string;
        role?: UserRole;
    }) {
        const { name, password, role = UserRole.SOLDIER } = registerDto;

        
        const existingUser = await this.userRepository.findOne({ where: { name } });
        if (existingUser) {
            throw new UnauthorizedException('User already exists');
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = this.userRepository.create({
            name,
            password: hashedPassword,
            role
        });

        const savedUser = await this.userRepository.save(user);

        
        const payload = { 
            sub: savedUser.id, 
            name: savedUser.name,  
            role: savedUser.role 
        };
        const token = this.jwtService.sign(payload);

        return {
            user: {
                id: savedUser.id,
                name: savedUser.name,
                role: savedUser.role
            },
            token
        };
    }

    async login(loginDto: { name: string; password: string }) {
        const { name, password } = loginDto;

        
        const user = await this.userRepository.findOne({ where: { name } });
        if (!user) {
            throw new UnauthorizedException('Invalid name or password');
        }

        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid name or password');
        }

        
        const payload = { 
            sub: user.id, 
            name: user.name, 
            role: user.role 
        };
        const token = this.jwtService.sign(payload);

        return {
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            },
            token
        };
    }
}
