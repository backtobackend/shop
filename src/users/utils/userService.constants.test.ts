export const userCreateDto = {
    name: 'ivan',
    email: 'retouch226@gmail.com',
    password: '1234',
    phone: '1234567890'
}

export const userResponseDto = {
    'id': 'b3ea1560-6ecc-46eb-b1d9-12f21f25b8a0',
    'name': 'ivan',
    'email': 'retouch226@gmail.com',
    'password': '1234',
    'phone': '1234567890',
    identifiers: [{
        id: 'b3ea1560-6ecc-46eb-b1d9-12f21f25b8a0'
    }]
}

export const userResponseDtoErr = {
    'id': 'b3ea1560-6ecc-46eb-b1d9-12f21f25b8a0',
    'name': 'ivan',
    'email': 'retouch226@gmail.com',
    'password': '1234',
    'phone': '1234567890',
    identifiers: []
}

export const createQueryBuilder = jest.fn().mockReturnValue({
    insert: jest.fn().mockReturnValue({
        into: jest.fn().mockReturnValue({
            values: jest.fn().mockReturnValue({
                execute: jest.fn().mockResolvedValue(userResponseDtoErr)
            })
        }),
    }),
})