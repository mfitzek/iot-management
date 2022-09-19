import { AuthService } from './auth.service';
import { ILoginPost, IRegisterPost, IUser } from '@iot/user';
import { Body, Controller, Post } from '@nestjs/common';
import CreatingUserError from 'libs/user/src/errors/CreatingUser';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  async login(@Body() credentials: ILoginPost) {
    console.log(credentials);
  }

  @Post('register')
  async register(@Body() credentials: IRegisterPost) {
    // const result = await this.users.createUser({
    //   username: credentials.username,
    //   email: credentials.email,
    //   password: credentials.password,
    // });

    // const user = result as User;
    // if (user.username) {
    //   return { username: user.username };
    // } else {
    //   console.log('test');
    //   return {
    //     errors: (result as CreatingUserError[]).map((err) => err.message),
    //   };
    // }
    return this.auth.register(credentials);
  }
}
