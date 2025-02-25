import {Injectable} from '@nestjs/common';

@Injectable()
export abstract class StorageServiceAbstract {
    abstract saveFile(path: string, file: Express.Multer.File): Promise<void>;

    abstract createDir(path: string): Promise<void>;

    abstract getDirFileNames(path: string): Promise<string[]>;

    abstract getDirFileCount(path: string): Promise<number>;

    abstract delete(path: string): Promise<void>;

    abstract validatePath(path: string): Promise<void>;

    abstract validateMaxFilesCount(count: number, max: number): void

    abstract genUniqueFilename(filename: string): string;
}