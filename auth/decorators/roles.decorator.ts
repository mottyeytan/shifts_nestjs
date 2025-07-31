import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/users.entities';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles); 