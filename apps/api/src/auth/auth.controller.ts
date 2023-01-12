import { IRegisterPost } from '@iot/user';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.auth.login(req.user);
  }

  @Post('register')
  async register(@Body() credentials: IRegisterPost) {
    return this.auth.register(credentials);
  }
}
