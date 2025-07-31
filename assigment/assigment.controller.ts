import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AssigmentService } from './assigment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/users.entities';
import { JwtService } from '@nestjs/jwt';

@Controller('assigment')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssigmentController {
    constructor(
        private readonly assigmentService: AssigmentService,
        private readonly jwtService: JwtService
    ) {}

    // חייל יכול לראות רק את המשימות שלו
    @Get('my-assignments')
    @Roles(UserRole.SOLDIER)
    async getMyAssignments(@Request() req) {
        return this.assigmentService.getMyAssignments(req.user.userId);
    }

    // מפקד יכול לראות את כל המשימות
    @Get('all')
    @Roles(UserRole.COMMANDER)
    async getAllAssignments() {
        return this.assigmentService.getAllAssignments();
    }

    // רק מפקד יכול ליצור משימות
    @Post()
    @Roles(UserRole.COMMANDER)
    async createAssignment(@Body() createDto: {
        title: string;
        description: string;
        assigned_to_id: number;
        shift_id?: number;
    }, @Request() req) {
        return this.assigmentService.createAssignment(createDto, req.user.userId);
    }

    // חייל יכול לעדכן רק סטטוס, מפקד יכול לעדכן הכל
    @Put(':id')
    async updateAssignment(
        @Param('id') id: number,
        @Body() updateDto: {
            title?: string;
            description?: string;
            status?: string;
            assigned_to_id?: number;
            shift_id?: number;
        },
        @Request() req
    ) {
        return this.assigmentService.updateAssignment(
            id, 
            updateDto, 
            req.user.userId, 
            req.user.role
        );
    }

    // רק מפקד יכול למחוק משימות
    @Delete(':id')
    @Roles(UserRole.COMMANDER)
    async deleteAssignment(@Param('id') id: number, @Request() req) {
        return this.assigmentService.deleteAssignment(id, req.user.role);
    }
}
