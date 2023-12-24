import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CryptoService } from '../auth/crypto';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService,CryptoService],
  exports: [UserService]
})
export class UserModule {}
