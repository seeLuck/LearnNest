import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDTO } from '../DTO/create-users.dto';

//別忘記Component裝飾器
@Injectable()
export class UsersService {
    //假資料
    private users = [
        { "_id": 1, "_name": "Michael", "_age": 25 },
        { "_id": 2, "_name": "Mary", "_age": 27 }
    ];

    //使用Promise，盡可能避免使用callback方式。
    async getAllUsers() {
        return this.users;
    }

    async getUser(id: number) {
        const user = this.users.find((user) => {
            return user._id === id;
        });
        if (!user) {
            //nestjs對於http exception有API可以調用，建議使用。
            throw new HttpException("user not found", 404);
        }
        return user;
    }

    async addUser(user: CreateUserDTO): Promise<CreateUserDTO[]> {
        this.users.push(user);
        return this.users;
    }
}