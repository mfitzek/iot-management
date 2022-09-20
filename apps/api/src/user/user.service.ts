import { PrismaService } from './../prisma/prisma.service';
import { IUser } from '@iot/user';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  CreatingUserError,
  EmaillreadyExists,
  UsernameAlreadyExists,
} from '@iot/user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public getUser(username: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  public async createUser(user: IUser): Promise<User | CreatingUserError[]> {
    const checkExistingData = await this.isUserAlreadyExists(user);
    if (checkExistingData.length === 0) {
      try {
        return this.prisma.user.create({
          data: user,
        });
      } catch (error) {
        checkExistingData.push(new CreatingUserError('DB error'));
      }
    }
    return checkExistingData;
  }

  private async isUserAlreadyExists(user: IUser): Promise<CreatingUserError[]> {
    const errors: CreatingUserError[] = [];
    const data = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            username: user.username,
          },
          {
            email: user.email,
          },
        ],
      },
    });

    for (const record of data) {
      if (record.username === user.username) {
        errors.push(new UsernameAlreadyExists());
      }
      if (record.email === user.email) {
        errors.push(new EmaillreadyExists());
      }
    }
    return errors;
  }
}
