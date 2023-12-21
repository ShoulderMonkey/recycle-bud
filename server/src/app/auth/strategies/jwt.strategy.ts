import { ExtractJwt, /* Strategy */ } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CryptoService } from '../crypto';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  private logger = new Logger(JwtStrategy.name);

  constructor(
    private usersService: UserService,
    private cryptoService: CryptoService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: readFileSync(join(__dirname, './assets/keys/public.pem')),
      algorithms: ['RS256']
      
    });
  }

  async validate(payload: any) {
    if (!payload.sso) {
      const user = await this.usersService.repository.findOne(payload.id);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const chk = `${user.email}`;
      if (!payload.hash || !this.cryptoService.hashCompare(chk, payload.hash)) {
        throw new UnauthorizedException('Invalid hash');
      }
    }

    return {
      id: payload.id,
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
      hash: payload.hash,
    };
  }
}

