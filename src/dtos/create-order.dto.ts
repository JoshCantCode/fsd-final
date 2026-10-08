export interface CreateOrderDto {
  userId: string;
  listingId: string;
  // unix timestamp
  arrival: string;
  departure: string;
}
