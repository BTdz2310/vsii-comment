import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Comment } from './schemas/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { User } from './decorators/user.decorator';
import { IUser } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  findByArticle(@Param('id') id: string): Promise<Comment[]> {
    return this.appService.findByArticle(id);
  }

  @Post(':id')
  addCommentToArticle(
    @Param('id') id: string,
    @Body() comment: CommentDto,
    @User() user: IUser,
  ): Promise<Comment> {
    return this.appService.addCommentToArticle(id, comment, user.id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  likeComment(@Param('id') id: string, @User() user: IUser) {
    return this.appService.likeComment(id, user.id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  dislikeComment(@Param('id') id: string, @User() user: IUser) {
    return this.appService.dislikeComment(id, user.id);
  }
}
