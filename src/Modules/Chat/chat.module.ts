import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

@Module({
    //傳入ChatController
    controllers: [ChatController],
    providers: [ChatGateway]
})
export class ChatModule { }