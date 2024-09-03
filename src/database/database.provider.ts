import {DataSource} from 'typeorm';
import {ConfigService} from '@nestjs/config';
import {DATA_SOURCE} from './constants/database-constants.constants';
import {Injectable} from '@nestjs/common';

@Injectable()
export class DataSourceProvider {
    constructor(private config: ConfigService) {
    }

    async getDataSource() {
        const datasource = new DataSource(this.config.get('database'))
        return await datasource.initialize()
    }
}

export const
    DatabaseProvider = {
        provide: DATA_SOURCE,
        inject: [DataSourceProvider],
        useFactory: async (dataSourceProvider: DataSourceProvider) => {
            return await dataSourceProvider.getDataSource()
        }
    }