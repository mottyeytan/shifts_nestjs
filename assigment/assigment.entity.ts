import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../users/users.entities';
import { ShiftEntity } from '../shifts/shifts.entites';

@Entity()
export class AssigmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    status: string; // 'pending', 'in_progress', 'completed'

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: 'assigned_to_id' })
    assignedTo: UserEntity;

    @Column({ nullable: false })
    assigned_to_id: number;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: 'assigned_by_id' })
    assignedBy: UserEntity;

    @Column({ nullable: false })
    assigned_by_id: number;

    @ManyToOne(() => ShiftEntity, { nullable: true })
    @JoinColumn({ name: 'shift_id' })
    shift: ShiftEntity;

    @Column({ nullable: true })
    shift_id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    completed_at: Date;
}