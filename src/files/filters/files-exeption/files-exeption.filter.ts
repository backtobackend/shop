import {ArgumentsHost, Catch, ExceptionFilter, UnprocessableEntityException} from '@nestjs/common';
import {extractFromText} from '../../../common/utils/regex.util';
import * as bytes from 'bytes';
import {HTTP_ERROR, HttpError} from '../../../common/utils/http-exeptions.constant';

@Catch(UnprocessableEntityException)
export class FilesExeptionFilter implements ExceptionFilter {
    catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse()
        const {message} = exception

        const {httpError, ...meta} = this.createErrorData(message)
        res.status(httpError.status).json({
            statusCode: httpError.status,
            error: httpError.error,
            message,
            meta
        })
    }

    private readonly MAX_FILE_SIZE_REGEX = /less than (\d+)/
    private readonly FILE_TYPES_REGEX = /\/(.*)\//

    private extractMaxSize(message: string) {
        const maxSizeStr = extractFromText(message, this.MAX_FILE_SIZE_REGEX)
        return bytes(+maxSizeStr)
    }

    private extractFileTypes(message: string) {
        const mediaTypes = extractFromText(message, this.FILE_TYPES_REGEX)
        const mediaTypesWithSlash = mediaTypes.split('|')
        return mediaTypesWithSlash.map(type => type.replace('\\', ''))
    }

    private createErrorData(message: string) {
        let httpError: HttpError
        let description: string

        let maxSize: string
        let expectedFileType: (string | undefined)[]

        if (message.includes(this.messageSnippets.MAX_SIZE)) {
            httpError = HTTP_ERROR.PAYLOAD_TOO_LARGE
            maxSize = this.extractMaxSize(message)
        } else if (message.includes(this.messageSnippets.FILE_TYPE)) {
            httpError = HTTP_ERROR.UNSUPPORTED_MEDIA_TYPE
            description = this.Descriptions.FILE_TYPE
            expectedFileType = this.extractFileTypes(message)
        } else {
            httpError = HTTP_ERROR.BAD_REQUEST
        }
        return {httpError, description, maxSize, expectedFileType}
    }

    private readonly messageSnippets = {
        MAX_SIZE: 'expected size',
        FILE_TYPE: 'expected type',
        FILE_SIGNATURE: 'does not match',
    } as const satisfies Record<string, string>

    private readonly Descriptions = {
        FILE_TYPE: 'invalid file type',
        FILE_SIGNATURE: 'file type tampered',
    } as const satisfies Record<string, string>


}
