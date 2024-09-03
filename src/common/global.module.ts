import {Module, ValidationPipe} from '@nestjs/common';

@Module({
    providers: [{provide: 'APP_PIPE', useValue: new ValidationPipe({transform: true, whitelist: true})}],
})
export class GlobalModule {
}