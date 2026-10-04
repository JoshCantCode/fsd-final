import { ListingType } from "src/types/listing";

export default interface UpdateListingDto {
  type?: ListingType;
  price?: number;
  locationId?: string;
  available?: boolean;
}
