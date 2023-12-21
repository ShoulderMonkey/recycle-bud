import { Injectable, Logger } from '@nestjs/common';
import { BaseService } from '../shared/base-service';
import { User } from '../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<User>{
    
    logger = new Logger(UserService.name);
    constructor(
        @InjectRepository(User)
        public repository: Repository<User>
    ){
        super(repository)
    }

    async findByEmail(email: string) : Promise<User> {

        let user: User = await this.repository.findOne({
          where: {
            email: email,
            isActive: true
          }
        });
  
        return user;
      }

}
