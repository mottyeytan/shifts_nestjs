import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssigmentEntity } from './assigment.entity';
import { UserEntity, UserRole } from '../users/users.entities';

@Injectable()
export class AssigmentService {
    constructor(
        @InjectRepository(AssigmentEntity)
        private assigmentRepository: Repository<AssigmentEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    // חייל יכול לראות רק את המשימות שלו
    async getMyAssignments(userId: number) {
        return this.assigmentRepository.find({
            where: { assigned_to_id: userId },
            relations: ['assignedTo', 'assignedBy', 'shift']
        });
    }

    // מפקד יכול לראות את כל המשימות
    async getAllAssignments() {
        return this.assigmentRepository.find({
            relations: ['assignedTo', 'assignedBy', 'shift']
        });
    }

    // רק מפקד יכול ליצור משימות
    async createAssignment(createDto: {
        title: string;
        description: string;
        assigned_to_id: number;
        shift_id?: number;
    }, assignedByUserId: number) {
        // בדיקה שהמשתמש שמוקצה קיים
        const assignedUser = await this.userRepository.findOne({
            where: { id: createDto.assigned_to_id }
        });
        
        if (!assignedUser) {
            throw new ForbiddenException('Assigned user not found');
        }

        const assignment = this.assigmentRepository.create({
            ...createDto,
            assigned_by_id: assignedByUserId,
            status: 'pending'
        });

        return this.assigmentRepository.save(assignment);
    }

    // רק מפקד יכול לעדכן משימות
    async updateAssignment(assignmentId: number, updateDto: {
        title?: string;
        description?: string;
        status?: string;
        assigned_to_id?: number;
        shift_id?: number;
    }, userId: number, userRole: UserRole) {
        const assignment = await this.assigmentRepository.findOne({
            where: { id: assignmentId }
        });

        if (!assignment) {
            throw new ForbiddenException('Assignment not found');
        }

        // חייל יכול לעדכן רק את הסטטוס של המשימות שלו
        if (userRole === UserRole.SOLDIER) {
            if (assignment.assigned_to_id !== userId) {
                throw new ForbiddenException('You can only update your own assignments');
            }
            
            // חייל יכול לעדכן רק סטטוס
            if (updateDto.status) {
                assignment.status = updateDto.status;
                if (updateDto.status === 'completed') {
                    assignment.completed_at = new Date();
                }
            }
        } else {
            // מפקד יכול לעדכן הכל
            Object.assign(assignment, updateDto);
        }

        return this.assigmentRepository.save(assignment);
    }

    // רק מפקד יכול למחוק משימות
    async deleteAssignment(assignmentId: number, userRole: UserRole) {
        if (userRole !== UserRole.COMMANDER) {
            throw new ForbiddenException('Only commanders can delete assignments');
        }

        const assignment = await this.assigmentRepository.findOne({
            where: { id: assignmentId }
        });

        if (!assignment) {
            throw new ForbiddenException('Assignment not found');
        }

        return this.assigmentRepository.remove(assignment);
    }
}
