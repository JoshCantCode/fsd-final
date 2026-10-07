export enum NotificationType {
  USER_CREATED,
  USER_DELETED,
  LOCATION_CREATED,
  LOCATION_DELETED,
  ORDER_CREATED,

  // user
  ORDER_PAID,
  ORDER_FAILED,
  LISTING_CREATED,
}

// if any of these is accessed by a non-admin it doesnt send the notification
export const ADMIN_NOTIFICATIONS = [
  NotificationType.USER_CREATED,
  NotificationType.ORDER_CREATED,
  NotificationType.USER_DELETED,
  NotificationType.LOCATION_CREATED,
  NotificationType.LOCATION_DELETED,
];

type UserCreatedMetadata = {
  userId: string;
};

type UserDeletedMetadata = {
  userId: string;
};

type LocationCreatedMetadata = {
  locationId: string;
};

type LocationDeletedMetadata = {
  locationId: string;
};

type OrderCreatedMetadata = {
  orderId: string;
};

type OrderPaidMetadata = {
  orderId: string;
};

type OrderFailedMetadata = {
  orderId: string;
  reason: string;
};

type ListingCreatedMetadata = {
  listingId: string;
};

export type NotificationMetadata =
  | UserCreatedMetadata
  | UserDeletedMetadata
  | LocationCreatedMetadata
  | LocationDeletedMetadata
  | OrderCreatedMetadata
  | OrderPaidMetadata
  | OrderFailedMetadata
  | ListingCreatedMetadata;
