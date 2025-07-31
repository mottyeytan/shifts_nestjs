import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../users/users.entities';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: {
        name: string;
        email: string;
        password: string;
        role?: UserRole;
    }) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: {
        name: string;
        password: string;
    }) {
        return this.authService.login(loginDto);
    }
}
