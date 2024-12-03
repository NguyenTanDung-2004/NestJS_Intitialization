import { Module } from '@nestjs/common';
// connect database 
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule
  ],
})
export class AppModule {}
