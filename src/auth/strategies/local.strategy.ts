import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {AuthService} from '../auth.service';
import {ResponseUserDto} from '../../users/dto/response-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
        });
    }

    validate(email: string, password: string): Promise<ResponseUserDto> {
        return this.authService.validateLocal({email, password});
    }
}