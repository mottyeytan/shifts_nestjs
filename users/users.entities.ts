import { MinLength, IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export enum UserRole {
    SOLDIER = 'soldier',
    COMMANDER = 'commander'
}

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ nullable: false })
    @MinLength(4)
    
    password: string;
    
    @Column({ 
        type: 'enum', 
        enum: UserRole, 
        default: UserRole.SOLDIER 
    })
    role: UserRole;
}