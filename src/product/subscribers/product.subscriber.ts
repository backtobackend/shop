import {DataSource, EntitySubscriberInterface, EventSubscriber} from 'typeorm';
import {Product} from '../entities/product.entity';
import {FilePath} from '../../files/constants/file.constant';
import {join} from 'node:path';
import {BASE_UPLOAD_PATH} from '../../files/util/files.constant';
import {StorageServiceAbstract} from '../../files/storage/storage.service.abstract';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface {
    constructor(private dataSource: DataSource, private readonly storageService: StorageServiceAbstract) {
        dataSource.subscribers.push(this)
    }

    listenTo() {
        return Product
    }

    async afterLoad(entity: Product) {
        entity['images'] = await this.getProductImages(entity.id)
    }

    private async getProductImages(id: string): Promise<string[]> {
        const {BASE, IMAGE} = FilePath.PRODUCT
        const path = join(BASE_UPLOAD_PATH, BASE, id, IMAGE)
        return await this.storageService.getDirFileNames(path)
    }
}