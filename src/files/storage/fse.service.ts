import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    StreamableFile
} from '@nestjs/common';
import {StorageServiceAbstract} from './storage.service.abstract';
import {BASE_UPLOAD_PATH} from '../util/files.constant';
import {join} from 'node:path'
import {mkdirp, pathExists, readdir, remove, writeFile} from 'fs-extra'
import * as fs from 'node:fs';
import {MAX_FILES_UPLOAD} from '../constants/file.constant';
import * as path from 'node:path';

@Injectable()
export class FseService implements StorageServiceAbstract {
    async createDir(pathTo: string): Promise<void> {
        await mkdirp(pathTo)
    }

    async delete(pathTo: string): Promise<void> {
        const fullPath = join(BASE_UPLOAD_PATH, pathTo)
        try {
            await remove(fullPath)
        } catch (err) {
            throw new InternalServerErrorException(`file not deleted`)
        }
    }

    async getDirFileCount(pathTo: string): Promise<number> {
        const files = await this.getDirFileNames(pathTo)
        return files.length
    }

    // download file
    getFile(pathTo: string): StreamableFile {
        const fullPath = join(BASE_UPLOAD_PATH, pathTo)
        const stream = fs.createReadStream(fullPath);
        return new StreamableFile(stream)
    }

    async getDirFileNames(fullPath: string): Promise<string[]> {
        let files: string[] | Buffer[]
        try {
            files = await readdir(fullPath, {recursive: true})
        } catch (err) {
        }
        return <string[]>files
    }

    async saveFile(pathTo: string, files: Express.Multer.File) {
        const {originalname, buffer} = files
        const filename = this.genUniqueFilename(originalname)
        const fullPath = join(pathTo, filename)
        await writeFile(fullPath, buffer)
    }

    async validatePath(pathTo: string): Promise<void> {
        const fullPath = join(BASE_UPLOAD_PATH, pathTo);
        if (!(await pathExists(fullPath))) {
            await this.createDir(fullPath)
        }
    }

    genUniqueFilename(filename: string): string {
        const prefix = `${Date.now()}-${Math.round(Math.random() * 1000)}`;
        return `${prefix}-${filename}`
    }

    validateMaxFilesCount(count: number, folderFilesCount: number): void {
        if (!(folderFilesCount + count <= MAX_FILES_UPLOAD)) {
            throw new ConflictException('max files count exited')
        }
    }
}
