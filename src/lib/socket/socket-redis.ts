import * as io from "socket.io";
import * as socketRedis from "socket.io-redis";
import { WebSocketAdapter } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

export class SocketRedis implements WebSocketAdapter {
    create(port: number) {
        let IO = io(port);
        IO.adapter(socketRedis({ host: 'localhost', port: 6379 }));
        return IO;
    }

    bindClientConnect(server, callback: (...args: any[]) => void) {
        server.on('connection', callback);
    }

    bindMessageHandlers(client: WebSocket, handlers: MessageMappingProperties[], process: (data) => Observable<any>) {
        Observable.fromEvent(client, 'message')
            .switchMap((buffer) => this.bindMessageHandler(buffer, handlers, process))
            .filter((result) => !!result)
            .subscribe((response) => client.send(JSON.stringify(response)));
    }

    bindMessageHandler(buffer, handlers: MessageMappingProperties[], process: (data) => Observable<any>): Observable<any> {
        const data = JSON.parse(buffer.data);
        const messageHandler = handlers.find((handler) => handler.message === data.type);
        if (!messageHandler) {
            return Observable.empty();
        }
        const { callback } = messageHandler;
        return process(callback(data));
    }
}