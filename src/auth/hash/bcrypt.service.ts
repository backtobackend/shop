import {Injectable} from '@nestjs/common';
import {HashService} from './hash.service';
import {compare, hash} from 'bcrypt';

@Injectable()
export class BcryptService implements HashService {
    async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
        return await compare(data, encrypted)
    }

    hash(data: string | Buffer): Promise<string> {
        return hash(data, 10)
    }
}