import {Module} from '@nestjs/common';
import {StorageServiceAbstract} from './storage/storage.service.abstract';
import {FseService} from './storage/fse.service';
import {FilesExeptionFilter} from './filters/files-exeption/files-exeption.filter';

@Module({
    imports: [],
    providers: [{
        provide: StorageServiceAbstract,
        useClass: FseService,
    }, {
        provide: 'APP_FILTER',
        useClass: FilesExeptionFilter
    }, FseService],
    exports: [StorageServiceAbstract, FseService],
})

export class FilesModule {
}