import { Role } from 'src/enums/roles.enum';

export interface IUser {
  username: string;
  role: Role[];
  avatar: string;
  id: string;
}
