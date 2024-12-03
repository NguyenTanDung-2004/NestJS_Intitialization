import { Controller, Request, Post, UseGuards, HttpCode, HttpStatus, Body, Get, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { SignInDto } from 'src/user/dto/sign-in.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from 'src/constant/role.decorator';
import { Role } from 'src/constant/role.enum';
import { Permission } from 'src/constant/permission.enum';
import { Permissions } from 'src/constant/permission.decorator';

@Controller("auth")
export class AuthController {
  @UseGuards(LocalAuthGuard) // this is the strategy to authenticate user. We can use jwt, ...
  // value is used to authenticate by using email (or another field) and password.
  @Post('/login')   
  async login(@Request() req) {
    return req.user; // the value after dot is must same the name of 1 table in the database.
  }


  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/loginJWT')
  async loginJWT(@Request() req) {
    return this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login1')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(JwtAuthGuard) // we use this line to navigate to jwt-auth.guard.ts to verify token
  @Roles(Role.User)
  @Permissions(Permission.Create)
  @Get('profile')
  getProfile(@Request() req, @Query() name: string) {
    console.log(name);
    return req.user; // this code line will be return 1 user, we can read in the function canActive in jwt-auth.guard.ts
  }



}

