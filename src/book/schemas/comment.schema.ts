import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment{
    @Prop()
    public bookId:string

    @Prop()
    public comment:string
}

export const CommentSchema = SchemaFactory.createForClass(Comment)