import { AuthService } from './auth.service';
import { ILoginPost, IRegisterPost, IUser } from '@iot/user';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreatingUserError } from '@iot/user';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() credentials: ILoginPost) {
    console.log(credentials);
  }

  @Post('register')
  async register(@Body() credentials: IRegisterPost) {
    return this.auth.register(credentials);
  }

  // TODO: Delete this method
  @UseGuards(LocalAuthGuard)
  @Get('test')
  test() {
    return 'Very secret information about the user.';
  }
}
