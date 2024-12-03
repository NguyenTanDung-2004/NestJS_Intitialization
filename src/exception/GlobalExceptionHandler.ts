import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { UserException } from "./UserException";
import { Response } from 'express'; 

@Catch(UserException) // Catch UserException specifically
export class UserExceptionFilter implements ExceptionFilter {
  catch(exception: UserException, host: ArgumentsHost) {
    // Format the response with custom fields
    const errorResponse = {
        code: exception.errorCode?.code, // Optional chaining in case errorCode is undefined
        message: exception.errorCode?.message,
      };
  
      // Send the response to the client
      const response = host.switchToHttp().getResponse<Response>();
      response.status(exception.errorCode.httpStatusCode).json(errorResponse);
  }
}