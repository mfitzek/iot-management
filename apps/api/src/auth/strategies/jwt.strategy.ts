import { UserService } from './../../user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

const secret = process.env.JWT_SECRET || 'notSoSecretJwtToken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private users: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
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
