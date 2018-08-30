import { WebSocketGateway, SubscribeMessage, WsResponse, WebSocketServer,
    WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { CreateUserDTO } from '../Users/DTO/create-users.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../../Shared/Decorators/roles.decorator';
import { WebSocketRolesGuard } from '../../Shared/Guards/websocket.roles.guard';

@WebSocketGateway(3001, {namespace: 'messages' })
@UseGuards(WebSocketRolesGuard)
export class ChatGateway {
    @WebSocketServer() server;

    //訂閱事件名稱
    @SubscribeMessage('pushMessage')
    @Roles('general')
    hello(client, message) {
        client.emit('newMessage', message);
        client.broadcast.emit('newMessage', message);
    }
}