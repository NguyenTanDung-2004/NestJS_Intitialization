// import { Injectable } from '@nestjs/common';
// import { UserService } from 'src/user/user.service';



// @Injectable()
// export class AuthService {
//   constructor(private readonly userService: UserService) {}

//   async validateUser(email: string, password: string): Promise<any> {
//     const user = await this.userService.findOneByEmail(email);
//     if (user && user.password === password) {
//       const { password, ...result } = user; // the result contains all field of user 
//       return result;
//     }
//     return null;
//   }


// }


import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(email);
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string, refresh_token: string }> {
    const user = await this.userService.findOneByEmail(email);
    console.log(email + " " + password);
    if (user === null || password !== user.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.firstName, role: 'user', permission: 'permission1' };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, { // this code line is used to create refresh token
        expiresIn: '24h',
      })
    };
  }
}
