import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'Comments', timestamps: true })
export class Comment extends Document {
  @Prop({ type: String, required: true })
  articleId: string;

  @Prop({ type: String, required: true })
  authorId: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Types.ObjectId, required: false })
  parentId?: string;

  @Prop({ type: [String], default: [] })
  likes: string[];

  @Prop({ type: [String], default: [] })
  dislikes: string[];

  @Prop({ type: String, required: false })
  mention?: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
