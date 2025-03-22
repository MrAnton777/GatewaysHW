import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { BookService } from './book.service';
import { CommentDocument } from './schemas/comment.schema';

@WebSocketGateway({ cors: {
  origin: '*',
}, })
export class BookGateway {

  @WebSocketServer()
  server: Server;

  constructor(private readonly service:BookService){}

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }
  
  @SubscribeMessage('getAllComments')
  async getAllComments(
    @MessageBody() data
    ){
      let {id} = data
      let comments = await this.service.findAllBookComment(id)
      let result:string[] = []
      comments.forEach((el)=>{
        result.push(el.comment)
      })

      this.server.emit('getAllCommentsResponse',result)
    }

    @SubscribeMessage('addComment')
    async addComment(
      @MessageBody() data
    ){
      let{bookId,comment} = data
      await this.service.create({bookId,comment}).then(()=>{
        this.server.emit('New comment created')}
      )
    }

}
