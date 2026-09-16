import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import "dotenv/config";
import { BullModule } from "@nestjs/bullmq";
import { AuthModule } from "./auth/auth.module";
import { UserController } from "./user/user.controller";
import { ListingController } from "./listing/listing.controller";
import { UserService } from "./user/user.service";
import { ListingService } from "./listing/listing.service";
import { UserModule } from "./user/user.module";
import { ListingModule } from "./listing/listing.module";
import { LocationModule } from "./location/location.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_DATABASE as string,
      entities: [],
      synchronize: true,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST as string,
        port: process.env.REDIS_PORT as string,
      },
    }),
    AuthModule,
    UserModule,
    ListingModule,
    LocationModule,
  ],
  controllers: [AppController, UserController, ListingController],
  providers: [AppService, UserService, ListingService],
})
export class AppModule {}
