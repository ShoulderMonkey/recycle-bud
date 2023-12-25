import { Controller, Delete, Logger, Param } from '@nestjs/common';
import { BaseController } from '../shared/base-controller';
import { User } from '../database/entities/user.entity';
import { UserService } from './user.service';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController extends BaseController<User> {

    logger = new Logger(UserController.name);
    constructor(
        public service: UserService
    ) {
      super(service);
    }
    @Delete(':id')
    async deleteOneById(@Param('id')id: any): Promise<DeleteResult> {
      let criteria = {
        email: id
      }
        return this.service.deleteOne(criteria)
    }
}
