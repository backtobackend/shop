import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { HashService } from './hash/hash.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { LoginDto } from './dto/login.dto';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interface/jwt-payload.interface';
import { IUserRequest } from './interface/user-request.interface';
import { Role } from './roles/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocal(loginDto: LoginDto): Promise<ResponseUserDto> {
    const { email, password } = loginDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    if (!user || !(await this.hashService.compare(password, user.password)))
      throw new UnauthorizedException('Invalid email or password');
    return plainToInstance(ResponseUserDto, user);
  }

  login(user: IUserRequest): string {
    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
    };
    return this.jwtService.sign(payload, {
      expiresIn: '100000m',
    });
  }

  async validateJwt(payload: IJwtPayload): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    if (!user) throw new UnauthorizedException('Invalid token');
    return plainToInstance(ResponseUserDto, user);
  }

  async getProfile(id: string): Promise<ResponseUserDto> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async grantRole(id: string, role: Role): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.role = role;
    await this.userRepository.save(user);
    return true;
  }
}
