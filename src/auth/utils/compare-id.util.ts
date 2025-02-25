import {UnauthorizedException} from '@nestjs/common';

export const compareId = (id: string, compareId: string): void => {
    const isOwner = id === compareId;
    if (!isOwner) throw new UnauthorizedException('user is not owner')
}