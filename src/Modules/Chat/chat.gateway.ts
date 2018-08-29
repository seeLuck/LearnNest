import { WebSocketGateway, SubscribeMessage, WsResponse, WebSocketServer, WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CreateUserDTO } from '../Users/DTO/create-users.dto';

@WebSocketGateway(3001, {namespace: 'messages' })
export class ChatGateway {
    @WebSocketServer() server;

    //訂閱事件名稱
    @SubscribeMessage('pushMessage')
    hello(client, message) {
        client.emit('newMessage', message);
        client.broadcast.emit('newMessage', message);
    }
}