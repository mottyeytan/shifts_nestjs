import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftEntity } from './shifts.entites';
import { ShiftsController } from './shifts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftEntity])],
  providers: [ShiftsService],
  controllers: [ShiftsController]
})
export class ShiftsModule {}
