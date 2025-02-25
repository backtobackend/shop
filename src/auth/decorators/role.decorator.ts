import {SetMetadata} from '@nestjs/common';
import {Role} from '../roles/role.enum';
import {NonEmptyArray} from '../../common/utils/array.util';

export const ROLE_KEY = 'ROLES'

export const RequireRole = (roles: NonEmptyArray<Role>) => SetMetadata(ROLE_KEY, roles);