import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.auth.validateUser({
      username: username,
      password: password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
