import {buildMessage, matches, Matches, ValidateBy, ValidationOptions} from 'class-validator';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/

export const Is_PASSWORD = 'isPassword';

/**
 * Checks if value is a valid password.
 */
function isPassword(value: string): boolean {
    return matches(value, PASSWORD_REGEX)
}

/**
 * Checks if value is an valid password.
 */
export function IsPassword(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: Is_PASSWORD,
            validator: {
                validate: (value): boolean => isPassword(value),
                defaultMessage: buildMessage(
                    eachPrefix => eachPrefix + '$property must be a valid password',
                    validationOptions
                ),
            },
        },
        validationOptions
    );
}