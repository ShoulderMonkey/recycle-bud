import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { CryptoService } from './crypto';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
        return {
          privateKey: AuthModule.readFile('./assets/keys/private.pem'),
          publicKey: AuthModule.readFile('./assets/keys/public.pem'),
          signOptions: { algorithm: 'RS256' }
        };
      }
    })
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    CryptoService
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    CryptoService,
  ]

})
export class AuthModule {
  static readFile(path: string): String | Buffer | any {
    const fs = require('fs');
    return fs.readFileSync(path);
  }
}
