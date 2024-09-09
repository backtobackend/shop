import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class ResponseProductDto {
    @Expose()
    id: string
    @Expose()
    name: string
    @Expose()
    description: string
    @Expose()
    price: number
}