import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookGateway } from './book.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema,Comment } from './schemas/comment.schema';

@Module({
  imports:[MongooseModule.forFeature([
    { name: Comment.name, schema: CommentSchema }
]
)],
  providers: [BookService, BookGateway]
})
export class BookModule {}
