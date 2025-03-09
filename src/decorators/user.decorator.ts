import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';

export const User = createParamDecorator(
  (data: keyof IUser | undefined, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = request.user as IUser;
    return data ? user[data] : user;
  },
);
