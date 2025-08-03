import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShiftsController } from './shifts/shifts.controller';
import { ShiftsModule } from './shifts/shifts.module';
import { AssigmentService } from './assigment/assigment.service';
import { AssigmentModule } from './assigment/assigment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/users.entities';
import { ShiftEntity } from './shifts/shifts.entites';
import { AssigmentEntity } from './assigment/assigment.entity';
import { ShiftsService } from './shifts/shifts.service';



@Module({
  imports: [AuthModule, UsersModule, ShiftsModule, AssigmentModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'shifts',
    synchronize: true,
    entities: [UserEntity, ShiftEntity, AssigmentEntity],
    
  })],
  controllers: [AppController],
  providers: [AppService, AssigmentService, ShiftsService],
})
export class AppModule {}
