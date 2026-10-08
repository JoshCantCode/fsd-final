import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import Order from "src/entities/order.entity";
import { UserModule } from "src/user/user.module";
import { ListingModule } from "src/listing/listing.module";

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UserModule, ListingModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
