import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import "dotenv/config";
import { BullModule } from "@nestjs/bullmq";
import { UserModule } from "./user/user.module";
import { ListingModule } from "./listing/listing.module";
import { LocationModule } from "./location/location.module";
import { BillingModule } from "./billing/billing.module";
import { NotificationModule } from "./notification/notification.module";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "./lib/auth";
import { dbOptions } from "./datasource.config";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [
    AuthModule.forRoot({
      auth,
      bodyParser: {
        json: { limit: "2mb" },
        urlencoded: { limit: "2mb", extended: true },
        rawBody: true,
      },
    }),
    TypeOrmModule.forRoot({
      ...dbOptions,
      migrations: undefined,
      autoLoadEntities: true,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? "localhost",
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: "notification",
    }),
    UserModule,
    ListingModule,
    LocationModule,
    BillingModule,
    NotificationModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
