import { IUser } from '@iot/user';
import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  public getUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  public createUser(user: IUser): Promise<User> {
    return prisma.user.create({
      data: user,
    });
  }
}
