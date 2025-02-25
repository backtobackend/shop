import {
    Body,
    ConflictException,
    Controller,
    Get,
    HttpCode,
    HttpStatus, Param, Patch,
    Post,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {User} from './decorators/user.decorator';
import {IUserRequest} from './interface/user-request.interface';
import {Request, Response} from 'express';
import {plainToInstance} from 'class-transformer';
import {ResponseUserDto} from '../users/dto/response-user.dto';
import {Public} from './decorators/is-public.decorator';
import {GrantRoleDto} from './dto/grant-role.dto';
import {RequireRole} from './decorators/role.decorator';
import {Role} from './roles/role.enum';
import {IdDTO} from '../common/dto/id.dto';
import {ApiBody, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {LoginDto} from './dto/login.dto';


@ApiTags('Payment')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Public()
    @ApiBody({type: LoginDto})
    @ApiOkResponse({
        headers: {
            'Set-Cookie': {
                description: 'JWT cookie', schema: {type: 'string'}
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@User() user: IUserRequest, @Res({passthrough: true}) res: Response) {
        console.log('=>(auth.controller.ts:38) user', user);
        const token = this.authService.login(user)
        res.cookie('token', token, {httpOnly: true, sameSite: 'strict', secure: true});
    }

    //TODO JwtAuthGuard extract token from bearer token in jwt.strategy return request.user and we extract it using @User()
    // @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@User() {id}: IUserRequest) {
        const user = this.authService.getProfile(id)
        return plainToInstance(ResponseUserDto, user)
    }

    @RequireRole([Role.ADMIN])
    // @UseGuards(AuthRoleGuard)
    @Patch('grant/:id')
    grantRole(@Param() {id}: IdDTO, @Body() {role}: GrantRoleDto, @Req() req: Request): Promise<boolean> {
        if (req.user['id'] === id) throw new ConflictException('user can`t grant role to himself')
        return this.authService.grantRole(id, role);
    }
}
