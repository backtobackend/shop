import {IsEmail, IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';
import {Type} from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'name should be minimum 3 characters long'})
    name: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsString()
    @MinLength(4, {message: 'password should be minimum 4 characters long'})
    password: string
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    phone: string
}