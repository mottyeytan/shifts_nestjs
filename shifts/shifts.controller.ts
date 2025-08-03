import { Body, Controller, Post } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftEntity } from './shifts.entites';

@Controller('shifts')
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) {}

    @Post()
    async createShift(@Body() body: ShiftEntity) {
       
        try {
            return await this.shiftsService.createShift(body);
        } catch (error) {
            return {
                message: 'Shift creation failed',
                error: error.message
            }
        }
    }


}
