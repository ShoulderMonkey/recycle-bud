import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { readFileSync } from 'fs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { join } from 'path';
import { UserService } from '../../user/user.service';
import { CryptoService } from '../crypto';
import { Reflector } from '@nestjs/core';

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
    console.log("JWT STRATEGY",payload);
    
      const user = await this.usersService.repository.findOne({where: {email:payload.email}});

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const chk = `${user.email}`;
      if (!payload.hash || !this.cryptoService.hashCompare(chk, payload.hash)) {
        throw new UnauthorizedException('Invalid hash');
      }
    

    return {
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
      hash: payload.hash,
    };
  }
}

@Injectable()
export class JWTGuard extends AuthGuard('jwt'){

  constructor(private readonly reflector: Reflector){
    super()
  }

  canActivate(context: ExecutionContext) {
    let req = context.switchToHttp().getRequest();
    
    return super.canActivate(context);
  }

}

