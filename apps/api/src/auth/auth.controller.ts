import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import { IRegisterPost } from '@iot/user';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
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

  // TODO: Delete this method
  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Request() req) {
    return {
      message: 'Very secret information about the user.',
      user: req.user,
    };
  }
}
