import {Module, ValidationPipe} from '@nestjs/common';
import {GLOBAL_PIPE_OPTION} from './utils/global.constants';
import {ConfigModule} from '@nestjs/config';
import configurationConfig from '../config/configuration.config';

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true, load: [configurationConfig], envFilePath: 'shop/.env.dev'})],
    providers: [{provide: 'APP_PIPE', useValue: new ValidationPipe(GLOBAL_PIPE_OPTION)}],
})
export class GlobalModule {
}