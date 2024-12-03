// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';  // Ensure UserModule is imported
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],  // Import UserModule to access UserService
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtAuthGuard],
})
export class AuthModule {}
