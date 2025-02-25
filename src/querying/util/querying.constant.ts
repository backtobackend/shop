export const MAX_PAGE_SIZE = 100

export const MAX_PAGE_NUMBER = 25

export const DEFAULT_PAGE_SIZE = {
    USER: 1,
    CATEGORY: 10,
    ORDER: 10,
    PRODUCT: 10
} as const satisfies Record<string, number>

export type OrderByType = 'DESC' | 'ASC'