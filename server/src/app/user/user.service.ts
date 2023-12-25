import { Injectable, Logger } from '@nestjs/common';
import { BaseService } from '../shared/base-service';
import { User } from '../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CryptoService } from '../auth/crypto';

@Injectable()
export class UserService extends BaseService<User>{

  logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>,
    private cryptoService: CryptoService
  ) {
    super(repository)
  }

  async findByEmail(email: string): Promise<User> {

    let user: User = await this.repository.findOne({
      where: {
        email: email,
        isActive: true
      }
    });

    return user;
  }

   async createOne(req: User): Promise<User> {
    let pw = this.cryptoService.encrypt(req.password);
    req.password = pw;
    return super.createOne(req)
  }
  
  async updateOne(criteria: FindOptionsWhere<User>, entity: any): Promise<any> {
    let pw = this.cryptoService.encrypt(entity.password);
    entity.password = pw;
    return super.updateOne(criteria, entity)
  }

}
