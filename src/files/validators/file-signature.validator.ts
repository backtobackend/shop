import { FileValidator } from '@nestjs/common';
import magicBytes from 'magic-bytes.js';

export class FileSignatureValidator extends FileValidator {
  constructor() {
    super({});
  }

  buildErrorMessage(): string {
    return 'validation failed';
  }

  isValid(file: Express.Multer.File): boolean {
    const fileSignatures = magicBytes(file.buffer).map((file) => file.mime);
    if (!fileSignatures.length) return false;
    const isMatch = fileSignatures.includes(file.mimetype);
    if (!isMatch) return false;
    return true;
  }
}
