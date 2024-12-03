import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    // handleRequest(err, user, info) {
    //     console.log("infoi: " + info);
    //     console.log("err: " + err);
    //     console.log("user: " + user);
    //     // Custom error handling or user processing can be added here
    //     if (err || !user) {
    //       throw err || new Error('Authentication failed');
    //     }
    //     return user; // Return the user object if successful
    //   }
}
