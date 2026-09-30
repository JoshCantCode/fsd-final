import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CreateNotificationDto from "src/dtos/create-notification.dto";
import Notification from "src/entities/notification.entity";
import { ADMIN_NOTIFICATIONS } from "src/types/notification";
import { Repository } from "typeorm";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async getNotification(id: string) {
    try {
      const user = await this.notificationRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new HttpException(
          `Could not find user ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (cause) {
      throw new HttpException(
        `Error finding user ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause,
        },
      );
    }
  }

  async createNotification(data: CreateNotificationDto & { isAdmin: boolean }) {
    const { type, message, metadata, isAdmin } = data;

    if (ADMIN_NOTIFICATIONS.includes(type) && !isAdmin) {
      throw new HttpException(
        "User is not an admin, cancelling notification",
        HttpStatus.FORBIDDEN,
      );
    }

    const notification = new Notification();
    notification.type = type;
    notification.message = message;
    notification.metadata = metadata;

    await this.notificationRepository.manager.save(notification);
    // send an event
  }
}
