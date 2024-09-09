import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class ResponseCategoryDto {
    @Expose()
    id: string
    @Expose()
    name: string;
    @Expose()
    parentId: string
}