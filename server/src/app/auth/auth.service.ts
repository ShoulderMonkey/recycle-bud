import { ForbiddenException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import { CryptoService } from "./crypto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private crypto: CryptoService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.debug("VALIDATE USER")
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`User ${email} not found`);
    }
    let pwDecr = this.crypto.decrypt(user.password);

    console.log("result hash compare --> ", this.crypto.hashCompare(pass, user.password));
    // if (!this.crypto.hashCompare(pass, user.password)) {
    if (pass !== pwDecr) {
      throw new UnauthorizedException(`Wrong password`);
    }

    const result = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      hash: this.crypto.hash(`${user.email}`),
    };
    return result;
  }

  async login(validatedUser: any) {
    const payload = {
      id: validatedUser.id,
      email: validatedUser.email,
      firstname: validatedUser.firstname,
      lastname: validatedUser.lastname,
      hash: validatedUser.hash,
    };
    console.log('ValidatedUsers', validatedUser);
      const access_token = this.jwtService.sign(payload)
      return {
        access_token: access_token
      };
  }
}
