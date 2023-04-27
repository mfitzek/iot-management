import { UserRole } from '@iot/user';
import { PrismaService } from './../prisma/prisma.service';
import { IUser } from '@iot/user';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

export type CreateUser = {
  username: string;
  email: string;
  password: string;
  salt: string;
  role?: UserRole;
};

export type CreateUserResult = {
  success: boolean;
  user?: IUser;
  errors?: {
    username: boolean;
    email: boolean;
  };
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
  

  public async createUser(user: CreateUser): Promise<CreateUserResult> {
    const role = user.role === UserRole.ADMIN ? 1 : 0;

    const usernameCheck = await this.isUsernameExists(user.username);
    const emailCheck = await this.isEmailExists(user.email);

    if (emailCheck || usernameCheck) {
      return {
        success: false,
        errors: {
          username: usernameCheck,
          email: emailCheck,
        },
      };
    }

    const data = await this.prisma.user.create({
      data: {
        ...user,
        role: role,
      },
    });

    return {
      success: true,
      user: this.parseUser(data),
    };
  }

  private async isUsernameExists(username: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    return !!user;
  }

  private async isEmailExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return !!user;
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
