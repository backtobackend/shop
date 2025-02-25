export const FilePath = {
    PRODUCT: {
        BASE: 'product',
        IMAGE: 'image'
    }
} as const satisfies Record<string, Record<string, string>>

export const MULTIPART_FORM_DATA = 'multipart/form-data'

export const MAX_FILES_UPLOAD = 5