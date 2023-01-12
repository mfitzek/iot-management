import { UserRole } from '@iot/user';
import { PrismaService } from './../prisma/prisma.service';
import { IUser } from '@iot/user';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreatingUserError, EmaillreadyExists, UsernameAlreadyExists } from '@iot/user';

export type CreateUser = {
  username: string;
  email: string;
  password: string;
  salt: string;
  role?: UserRole;
};
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async getUser(username: string): Promise<IUser | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) return null;

    return this.parseUser(user);
  }

  public async createUser(user: CreateUser): Promise<User | CreatingUserError[]> {
    const role = user.role === UserRole.ADMIN ? 1 : 0;

    const checkExistingData = await this.isUserAlreadyExists(user);
    if (checkExistingData.length === 0) {
      try {
        return this.prisma.user.create({
          data: {
            ...user,
            role: role,
          },
        });
      } catch (error) {
        checkExistingData.push(new CreatingUserError('DB error'));
      }
    }
    return checkExistingData;
  }

  private async isUserAlreadyExists(user: CreateUser): Promise<CreatingUserError[]> {
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

  private parseUser(user: User): IUser {
    const roles = {
      1: UserRole.ADMIN,
      0: UserRole.USER,
    };

    const role = roles[user.role];

    return {
      ...user,
      role: role,
    };
  }
}
