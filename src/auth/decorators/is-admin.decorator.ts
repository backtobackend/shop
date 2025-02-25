import {SetMetadata} from '@nestjs/common';

const IS_ADMIN_KEY = 'ADMIN'

export const Admin = SetMetadata(IS_ADMIN_KEY, true);