import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { UserModule } from "src/user/user.module";
import { ListingModule } from "src/listing/listing.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import Notification from "src/entities/notification.entity";
import { BullModule } from "@nestjs/bullmq";
import NotificationProcessor from "./notification.processor";

@Module({
  imports: [
    UserModule,
    ListingModule,
    TypeOrmModule.forFeature([Notification]),
    BullModule.registerQueue({
      name: "notification",
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationProcessor],
  exports: [NotificationService],
})
export class NotificationModule {}
