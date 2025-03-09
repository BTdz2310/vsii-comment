import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { EventsService } from './events/events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Comment, CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventsModule,
    MongooseModule.forRoot(process.env.DATABASE_URL || ''),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, EventsService],
})
export class AppModule {}
