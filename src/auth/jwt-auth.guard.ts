
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constant';
  import { Request } from 'express';
  import { Reflector } from '@nestjs/core';
import { Role } from 'src/constant/role.enum';
import { ROLES_KEY } from 'src/constant/role.decorator';
import { Permission } from 'src/constant/permission.enum';
import { PERMISSIONS_KEY } from 'src/constant/permission.decorator';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private reflector: Reflector
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> { // this function is used to verify token
        // get role
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
        console.log(requiredRoles);

        // get permission
        const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);

        console.log(requiredPermissions);

    
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      //console.log(token);
      if (token == null) {
        //console.log("nguyentandung");
        throw new UnauthorizedException();
      }
      try {
        //console.log("nguyentandung");
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        console.log(payload);
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;

        for (let i = 0; i < requiredRoles.length; i++){
            if (payload.role === requiredRoles[i]){
                return true;
            }
        }
        throw new ForbiddenException();
        
      } catch {
        //console.log("nguyentandung");
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  