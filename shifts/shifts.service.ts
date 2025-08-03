import { BadRequestException, Injectable } from '@nestjs/common';

import { ShiftEntity } from './shifts.entites';


@Injectable()
export class ShiftsService {
    async createShift(body: ShiftEntity) {
    
    const shiftexists = await ShiftEntity.findOne({ where: { start_time: body.start_time, end_time: body.end_time, location: body.location } });
    if (shiftexists && shiftexists.start_time === body.start_time && shiftexists.end_time === body.end_time && shiftexists.location === body.location) {
        throw new BadRequestException('Shift already exists');
    }
        const shift = new ShiftEntity();
        shift.start_time = body.start_time;
        shift.end_time = body.end_time;
        shift.location = body.location;
        return shift.save();
        
    }
}
