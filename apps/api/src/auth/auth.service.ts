import { Injectable } from '@nestjs/common';
import { IRegisterPost, ILoginPost } from '@iot/user';

import { randomBytes, pbkdf2 } from 'crypto';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private users: UserService) {}

  async register(data: IRegisterPost) {
    return await this.createPasswordHash(data.password);
  }

  async validateUser(data: ILoginPost): Promise<User | null> {
    const user = await this.users.getUser(data.username);

    if (
      user &&
      this.comparePasswords(data.password, user.password, user.salt)
    ) {
      return user;
    }

    return null;
  }

  private createPasswordHash(
    password: string
  ): Promise<{ hash: string; salt: string }> {
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

        resolve(hashed_password === hash);
      });
    });
  }
}
