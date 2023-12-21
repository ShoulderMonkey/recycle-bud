import { Controller, Logger } from '@nestjs/common';
import { BaseController } from '../shared/base-controller';
import { User } from '../database/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends BaseController<User> {

    logger = new Logger(UserController.name);
    constructor(
        public service: UserService
    ) {
      super(service);
    }
}
