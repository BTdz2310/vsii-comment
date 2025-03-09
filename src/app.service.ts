/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  findByArticle(id: string): Promise<Comment[]> {
    return this.commentModel
      .find(
        {
          articleId: id,
          parentId: {
            $exists: false,
          },
        },
        {
          sort: { createdAt: -1 },
        },
      )
      .exec();
  }

  addCommentToArticle(
    id: string,
    comment: CommentDto,
    authorId: string,
  ): Promise<Comment> {
    const createdComment = new this.commentModel({
      ...comment,
      articleId: id,
      authorId,
    });
    return createdComment.save();
  }

  async likeComment(id: string, userId: string): Promise<void> {
    await this.commentModel.findByIdAndUpdate(
      id,
      [
        {
          $set: {
            likes: {
              $cond: {
                if: { $in: [userId, '$likes'] },
                then: { $setDifference: ['$likes', [userId]] },
                else: { $concatArrays: ['$likes', [userId]] },
              },
            },
            dislikes: {
              $setDifference: ['$dislikes', [userId]],
            },
          },
        },
      ],
      { new: true },
    );
  }

  async dislikeComment(id: string, userId: string): Promise<void> {
    await this.commentModel.findByIdAndUpdate(
      id,
      [
        {
          $set: {
            dislikes: {
              $cond: {
                if: { $in: [userId, '$dislikes'] },
                then: { $setDifference: ['$dislikes', [userId]] },
                else: { $concatArrays: ['$dislikes', [userId]] },
              },
            },
            likes: {
              $setDifference: ['$likes', [userId]],
            },
          },
        },
      ],
      { new: true },
    );
  }
}
