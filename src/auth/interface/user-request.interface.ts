import {IJwtPayload} from './jwt-payload.interface';

export interface IUserRequest extends Omit<IJwtPayload, 'sub'> {
    id: string
}