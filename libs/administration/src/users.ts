import { UserRole } from '@iot/user';

export type UserStats = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  devices: number;
  records: number;
};
