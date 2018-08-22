import {Module} from '@nestjs/common';
import { UsersModule } from './modules/Users/users.module';

@Module({
    imports: [UsersModule]
})

export class ApplicationModule {
}
