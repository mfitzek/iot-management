import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthGuard } from './guards/local.guard';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import JwtModule from './jwt.module';


@Module({
  controllers: [AuthController],
  imports: [UserModule, PassportModule, JwtModule ],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy],
})
export class AuthModule {}
