import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    
    console.log("validateLocalStrategy");
    const user = await this.authService.validateUser(email, password);
    console.log(user);
    
    if (!user) {
      console.log("auth fallita per use")
      throw new UnauthorizedException();
    }
    return user;
  }
}

