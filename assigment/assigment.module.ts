import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssigmentController } from './assigment.controller';
import { AssigmentService } from './assigment.service';
import { AssigmentEntity } from './assigment.entity';
import { UserEntity } from '../users/users.entities';

@Module({
  imports: [TypeOrmModule.forFeature([AssigmentEntity, UserEntity])],
  controllers: [AssigmentController],
  providers: [AssigmentService],
  exports: [AssigmentService]
})
export class AssigmentModule {}
