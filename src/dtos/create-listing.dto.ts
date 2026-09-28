import { ListingType } from "src/types/listing";

export default interface CreateListingDto {
  type: ListingType;
  price: number; // price per night
  locationId: string;
  available: boolean;
}
