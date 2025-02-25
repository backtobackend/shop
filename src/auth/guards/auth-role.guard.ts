import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ROLE_KEY} from '../decorators/role.decorator';
import {Role} from '../roles/role.enum';

@Injectable()
export class AuthRoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) return true;
        const user = context.switchToHttp().getRequest()?.user
        if (user.role === Role.ADMIN) return true
        if (!user.id) throw new UnauthorizedException('not authorized(role)')
        const hasRole = requiredRoles.includes(user.role)
        if (!hasRole) throw new UnauthorizedException(`user has not required role`)
        return true
    }
}