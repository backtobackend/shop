import {IntersectionType} from '@nestjs/swagger';
import {FilenameDto} from './filename.dto';
import {IsUUID} from 'class-validator';

export class IdFilenameDto extends IntersectionType(FilenameDto) {
    @IsUUID()
    id: string
}