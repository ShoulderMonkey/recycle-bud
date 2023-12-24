/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { SeederService } from './app/seeder/seeder.service';
import { JWTGuard } from './app/auth/strategies/jwt.strategy';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
/* 
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JWTGuard(reflector)); */
  app.enableCors({
    origin: '*'
  });

  logger.log('Seeding ...');
  const seeder: SeederService = app.get(SeederService);
  await seeder.seed();
  logger.log('Seeding done');
  logger.log(readFileSync(join(__dirname, './assets/keys/public.pem')))
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
