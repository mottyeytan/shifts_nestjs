import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShiftEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    start_time: string;

    @Column({nullable: false})
    end_time: string;

    @Column({nullable: false})
    location: string;

}