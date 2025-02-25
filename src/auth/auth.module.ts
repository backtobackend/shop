import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {BcryptService} from './hash/bcrypt.service';
import {HashService} from './hash/hash.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../users/entity/user.entity';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './strategies/local.strategy';
import {LoginValidationMiddleware} from './middleware/login-validation/login-validation.middleware';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {JwtStrategy} from './strategies/jwt.strategy';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
import {THROTTLER_MODULE_OPTIONS} from './utils/auth.constants';

@Module({
    imports: [TypeOrmModule.forFeature([User]), PassportModule, JwtModule.registerAsync({
        useFactory: (config: ConfigService) => ({
            secret: config.get<string>('JWT_SECRET'),
        }),
        inject: [ConfigService],
    }), ThrottlerModule.forRoot(THROTTLER_MODULE_OPTIONS)],
    controllers: [AuthController],
    providers: [AuthService, {
        provide: HashService,
        useClass: BcryptService
    }, LocalStrategy, JwtStrategy, {
        provide: 'APP_GUARD',
        useClass: ThrottlerGuard
    }],
    exports: [HashService],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoginValidationMiddleware).forRoutes('auth/login')
    }
}
