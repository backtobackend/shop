import {IsEnum} from 'class-validator';
import {Role} from '../roles/role.enum';

export class GrantRoleDto {
    @IsEnum(Role)
    role: Role
}