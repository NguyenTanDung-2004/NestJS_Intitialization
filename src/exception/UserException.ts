import { HttpException } from "@nestjs/common";
import { ErrorCode } from "./ExceptionCode";

export class UserException extends HttpException{
    errorCode: ErrorCode;

    constructor(errorCode: ErrorCode){
        super(
            {
              code: errorCode.code,
              message: errorCode.message,
              
            },
            errorCode.httpStatusCode,
        );
        this.errorCode = errorCode;
    }
}