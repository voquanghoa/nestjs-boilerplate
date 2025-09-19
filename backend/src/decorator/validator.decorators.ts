import type { ValidationOptions } from 'class-validator';
import { IsPhoneNumber as isPhoneNumber, registerDecorator, ValidateIf, } from 'class-validator';
import dayjs from 'dayjs';
import { isString } from 'lodash';

export function IsPassword(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isPassword',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return /^[\d!#$%&*@A-Z^a-z]*$/.test(value);
        },
      },
    });
  };
}

export function IsPhoneNumber(
  validationOptions?: ValidationOptions & {
    region?: Parameters<typeof isPhoneNumber>[0];
  },
): PropertyDecorator {
  return isPhoneNumber(validationOptions?.region, {
    message: 'error.phoneNumber',
    ...validationOptions,
  });
}

export function IsTmpKey(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'tmpKey',
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: string): boolean {
          return isString(value) && /^tmp\//.test(value);
        },
        defaultMessage(): string {
          return 'error.invalidTmpKey';
        },
      },
    });
  };
}

export function IsUndefinable(options?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_, value) => value !== undefined, options);
}

export function IsNullable(options?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_, value) => value !== null, options);
}

export function IsFutureTime(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isFeatureTime',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: Date) {
          return value >= new Date();
        },
        defaultMessage(): string {
          return `${propertyName} must be future time`;
        },
      },
    });
  };
}

export function IsFutureDate(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isFeatureDate',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: Date) {
          return (
            value >=
            new Date(
              dayjs()
                .set('hour', 0)
                .set('minute', 0)
                .set('second', 0)
                .toString(),
            )
          );
        },
        defaultMessage(): string {
          return `${propertyName} must be future date`;
        },
      },
    });
  };
}
