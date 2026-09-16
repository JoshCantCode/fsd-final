import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import "dotenv/config";
import { BullModule } from "@nestjs/bullmq";
import { AuthModule } from "./auth/auth.module";
import { CustomerController } from "./customer/customer.controller";
import { ListingController } from "./listing/listing.controller";
import { CustomerService } from "./customer/customer.service";
import { ListingService } from "./listing/listing.service";
import { CustomerModule } from "./customer/customer.module";
import { ListingModule } from "./listing/listing.module";
import { LocationModule } from './location/location.module';

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
    CustomerModule,
    ListingModule,
    LocationModule,
  ],
  controllers: [AppController, CustomerController, ListingController],
  providers: [AppService, CustomerService, ListingService],
})
export class AppModule {}
