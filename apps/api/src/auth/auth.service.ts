import { CreatingUserError, ILoginResponse, UserRole, IUser } from '@iot/user';

import { Injectable } from '@nestjs/common';
import { IRegisterPost, ILoginPost } from '@iot/user';

import { randomBytes, pbkdf2 } from 'crypto';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private users: UserService, private jwtService: JwtService) {}

  async register(data: IRegisterPost) {
    const { hash, salt } = await this.createPasswordHash(data.password);
    const result = await this.users.createUser({
      username: data.username,
      email: data.email,
      password: hash,
      salt: salt,
    });

    const user = result as User;
    const errors = result as CreatingUserError[];

    if (user.username) {
      return { id: user.id, username: user.username, email: user.email };
    }

    return {
      errors: errors.map((err) => err.message),
    };
  }

  async login(user: IUser): Promise<ILoginResponse> {
    const payload = { id: user.id, username: user.username, email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      expiration: this.getExpirationDateInMillisFromToken(token),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async validateUser(data: ILoginPost): Promise<IUser | null> {
    const user = await this.users.getUser(data.username);

    if (user && (await this.comparePasswords(data.password, user.password, user.salt))) {
      return user;
    }

    return null;
  }

  private createPasswordHash(password: string): Promise<{ hash: string; salt: string }> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(16).toString('hex');
      pbkdf2(password, salt, 1000, 64, 'sha512', (err, result) => {
        if (err) {
          reject(err);
        }
        const hash = result.toString('hex');
        resolve({ hash, salt });
      });
    });
  }

  private comparePasswords(password, hash, salt): Promise<boolean> {
    return new Promise((resolve, reject) => {
      pbkdf2(password, salt, 1000, 64, 'sha512', (err, result) => {
        if (err) {
          reject(err);
        }
        const hashed_password = result.toString('hex');
        const password_equals = hashed_password === hash;

        resolve(password_equals);
      });
    });
  }

  private getExpirationDateInMillisFromToken(token: string): number {
    let expiration: number;

    try {
      const decoded = this.jwtService.decode(token);
      const exp: string = decoded['exp'];

      expiration = Number(exp) * 1000;
    } catch (error) {
      const hour = 1000 * 60 * 15;
      expiration = new Date().getTime() + hour;
    }

    return expiration;
  }
}
