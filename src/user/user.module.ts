import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategies';
import { Goal } from './entities/goal.entity';
import { Identity } from './entities/identity.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Goal, Identity]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(conigService: ConfigService) {
        return {
          secret: conigService.get("JWT_SECRET"),
          signOptions: {
            expiresIn: "5h"
          }
        }
      },
    })
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]

})
export class UserModule { }
