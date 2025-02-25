import {FileTypeValidator, FileValidator, HttpStatus, MaxFileSizeValidator, ParseFilePipe} from '@nestjs/common';
import * as bytes from 'bytes';

type FileTypes = 'image/jpeg' | 'image/png' | 'application/pdf'
type FileSize = `${number}${'mb' | 'kb'}`

export const fileValidator = (size: FileSize, fileTypes: FileTypes[]): FileValidator[] => {
    const regexFileTypes = new RegExp(fileTypes.join('|'))
    return [
        new MaxFileSizeValidator({maxSize: bytes(size)}),
        new FileTypeValidator({fileType: regexFileTypes})
    ]
}

export const FileParsePipe = (size: FileSize, ...fileTypes: FileTypes[]) => {
    return new ParseFilePipe({
        validators: fileValidator(size, fileTypes),
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    })
}