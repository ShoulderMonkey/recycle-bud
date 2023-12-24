import { BadRequestException, Body, Controller, Get, Logger, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
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
    private authService: AuthService
    ) { }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req, @Body() credentials: Credentials): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }
}