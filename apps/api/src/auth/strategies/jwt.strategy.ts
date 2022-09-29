import { UserService } from './../../user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_DEV_SECRET } from '@iot/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private users: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || JWT_DEV_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.users.getUser(payload.username);

    if (user !== null) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    }

    throw new UnauthorizedException();
  }
}
