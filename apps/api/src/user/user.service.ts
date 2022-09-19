import { IUser } from '@iot/user';
import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import CreatingUserError, {
  EmaillreadyExists,
  UsernameAlreadyExists,
} from 'libs/user/src/errors/CreatingUser';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  public getUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  public async createUser(user: IUser): Promise<User | CreatingUserError[]> {
    const checkExistingData = await this.isUserAlreadyExists(user);
    if (checkExistingData.length === 0) {
      try {
        return prisma.user.create({
          data: user,
        });
      } catch (error) {
        // TODO: Return db error
      }
    }
    return checkExistingData;
  }

  private async isUserAlreadyExists(user: IUser): Promise<CreatingUserError[]> {
    let errors: CreatingUserError[] = [];
    const data = await prisma.user.findMany({
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
        errors.push(new UsernameAlreadyExists(user.username));
      }
      if (record.email === user.email) {
        errors.push(new EmaillreadyExists(user.email));
      }
    }
    return errors;
  }
}
