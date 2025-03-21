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
  getAllComments(
    @MessageBody() data
    ){
      let {id} = data
      return this.service.findAllBookComment(id)
    }

}
