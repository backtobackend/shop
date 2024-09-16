import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';
import {IJwtPayload} from '../interface/jwt-payload.interface';
import {AuthService} from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService, private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    //TODO validate if user associated with payload still exists
    //validate return request.user
    async validate(payload: IJwtPayload) {
        return await this.authService.validateJwt(payload)
    }
}