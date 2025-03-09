/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsUUID } from 'class-validator';

export class CommentDto {
  content: string;
  parentId?: string;

  @IsUUID()
  mention?: string;
}
