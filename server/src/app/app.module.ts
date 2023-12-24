import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigModule, ConfigService } from "@nestjs/config";

import { configuration } from "../assets/configuration/configuration";
import { DEFAULT_ENTITIES } from "./database/default-entities";
import { UserModule } from "./user/user.module";
import { RecycledItemModule } from "./recycled-item/recycled-item.module";
import { AuthModule } from "./auth/auth.module";
import { SeederModule } from "./seeder/seeder.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        
        "./environments/.env",
        "../environments/.env",
        "server/src/app/environments/.env",
      ],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get("db"),
        entities: DEFAULT_ENTITIES,
        extra: {
          max: 50,
          options: "-c statement_timeout=20000ms",
        },
      }),
    }),SeederModule,
    AuthModule,
    UserModule,
    RecycledItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private config: ConfigService){
    console.log('env check', config.get("db"))
    console.log('env check2', process.env.DATABASE_TYPE)
  }
}
