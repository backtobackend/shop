import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {IsPassword} from '../../common/decorators/validators/is-password.decorator';

export class LoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    @IsPassword()
    password: string
}