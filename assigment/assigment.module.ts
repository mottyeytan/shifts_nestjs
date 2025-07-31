import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AssigmentController } from './assigment.controller';
import { AssigmentService } from './assigment.service';
import { AssigmentEntity } from './assigment.entity';
import { UserEntity } from '../users/users.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssigmentEntity, UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AssigmentController],
  providers: [AssigmentService, JwtService],
  exports: [AssigmentService]
})
export class AssigmentModule {}
