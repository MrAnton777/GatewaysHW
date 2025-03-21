import { Injectable } from '@nestjs/common';
import { Model, Connection, HydratedDocument, QueryWithHelpers} from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Comment,CommentSchema,CommentDocument } from './schemas/comment.schema';
import { CommentDto } from './dto/comment.dto';


@Injectable()
export class BookService {
    constructor(
        @InjectModel(Comment.name) private CommentModel:Model<CommentDocument>
    ){}

    public  async findAllComment():Promise<CommentDocument[]>{
        return await this.CommentModel.find()
    }

    public async findAllBookComment(id:string):Promise<CommentDocument[]>{
        return await this.CommentModel.find({bookId:id})
}       


    public async findById(id:string):Promise<CommentDocument | undefined |null>{
            return await this.CommentModel.findOne({_id:id}).exec()
    }

    public async create(data:CommentDto):Promise<CommentDocument>{
        let comment = (await this.CommentModel.create(data)).save()

        return comment
    }

    public async update(id:string,data:CommentDto):Promise<CommentDocument | null>{
        let updated_comment = await this.CommentModel.findByIdAndUpdate(id,data)
        return updated_comment

    }

    public async delete(id:string):Promise<void>{
        await this.CommentModel.findByIdAndDelete(id)
    }
}
