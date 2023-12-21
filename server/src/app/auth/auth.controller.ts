import { BadRequestException, Body, Controller, Get, Logger, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CryptoService } from './crypto';



class Credentials {
  email: string;
  password: string
}

class LoginResponse {
  access_token: string;
}



@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private crypto: CryptoService,
    private config: ConfigService) { }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req, @Body() credentials: Credentials): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }

  @Post('generate-token')
  @UseGuards(AuthGuard('jwt'))
  generateToken(@Body() data: GenerateTokenDto) {
    if (!data.email) {
      throw new BadRequestException('Email is mandatory');
    }
    const token = this.authService.generateToken({
      ...data,
      hash: this.crypto.hash(`${data.email}`)
    });
    return { token };
  }
}

export interface GenerateTokenDto {
  id: string
  email: string
  name: string
}
