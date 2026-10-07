import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { NotificationType } from "src/types/notification";
import { NotificationService } from "./notification.service";
import { UserService } from "src/user/user.service";
import { ListingService } from "src/listing/listing.service";

@Processor("notification")
export default class NotificationProcessor extends WorkerHost {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly listingService: ListingService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const type: NotificationType = NotificationType[job.name];

    const notification =
      (await this.notificationService.getLastNotification(type))!;

    // afaik this is the only way
    // todo: when frontend, add to notifications inbox
    // todo: when email, send email to user email
    const admins = await this.userService.getAdmins();
    for (const a of admins) {
      a.notifications.push(notification);
      await this.userService.saveUser(a);
    }

    switch (type) {
      case NotificationType.LISTING_CREATED: {
        const location = (await this.listingService.getListing(
          notification.metadata.listingId as string,
        ))!;
        const users = await this.userService.getUsersWhoAreWatching(
          location.id,
        );
        for (const user of users) {
          user.notifications.push(notification);
          await this.userService.saveUser(user);
        }

        break;
      }

      case NotificationType.ORDER_CREATED: {
        const { orderId } = notification.metadata;
        // fetch order
        console.log(orderId);
        break;
      }
    }

    // send to websocket
  }
}
