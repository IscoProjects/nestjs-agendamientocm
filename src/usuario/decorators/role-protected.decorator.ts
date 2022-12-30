import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../interfaces/user-roles.interface';

export const USER_ROLES = 'roles';

export const RoleProtected = (...args: UserRoles[]) => {
  return SetMetadata(USER_ROLES, args);
};
