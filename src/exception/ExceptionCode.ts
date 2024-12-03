import { HttpStatus } from "@nestjs/common";

export const ErrorCodes = {
    USER_NOT_FOUND: {
        code: 1000,
        message: 'The user does not exist.',
        httpStatusCode: HttpStatus.CONFLICT,
    },
    LOGIN_FAIL: {
        code: 1001,
        message: "Login fail!",
        httpStatusCode: HttpStatus.BAD_REQUEST
    }
}

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];
  