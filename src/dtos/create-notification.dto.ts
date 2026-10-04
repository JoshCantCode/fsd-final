import { NotificationMetadata, NotificationType } from "src/types/notification";

export default interface CreateNotificationDto {
  type: NotificationType;
  message: string;
  metadata: NotificationMetadata;
}
