import { ListingType } from "src/types/listing";

export default interface CreateListingDto {
  type: ListingType;
  price: number;
  locationId: string;
  available: boolean;
}
