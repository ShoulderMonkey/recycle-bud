import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { configuration } from '../assets/configuration/configuration';
import { DEFAULT_ENTITIES } from './database/default-entities';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        './environments/.env',
        '../environments/.env',
        'src/environments/.env',
      ],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('db'),
        entities: DEFAULT_ENTITIES,
        extra: {
          max: 50,
          options: '-c statement_timeout=20000ms',
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
