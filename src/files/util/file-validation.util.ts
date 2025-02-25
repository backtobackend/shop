import {NonEmptyArray} from '../../common/utils/array.util';
import {FileTypeValidator, FileValidator, MaxFileSizeValidator} from '@nestjs/common';
import * as bytes from 'bytes';
import {lookup} from 'mime-types';
import {FileSignatureValidator} from '../validators/file-signature.validator';

type fileType = 'jpeg' | 'pdf' | 'png';
type fileSize = `${number}${'kb' | 'mb'}`

const createFileTypeRegex = (fileTypes: fileType[]) => {
    const mediaTypes = fileTypes.map((type) => {
        lookup(type)
    })
    return new RegExp(mediaTypes.join('|'));
}

export const createFileValidator = (maxSize: fileSize, ...fileTypes: NonEmptyArray<fileType>): FileValidator[] => {
    const fileTypeRegex = createFileTypeRegex(fileTypes);
    console.log("=>(file-validation.util.ts:19) fileTypeRegex", fileTypeRegex);
    return [
        new MaxFileSizeValidator({maxSize: bytes(maxSize)}),
        new FileTypeValidator({fileType: fileTypeRegex}),
        new FileSignatureValidator()
    ]
}