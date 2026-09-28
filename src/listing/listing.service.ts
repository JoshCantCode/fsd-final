import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CreateListingDto from "src/dtos/create-listing.dto";
import Listing from "src/entities/listing.entity";
import { LocationService } from "src/location/location.service";
import { Repository } from "typeorm";

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly locationService: LocationService,
  ) {}

  async getListings() {
    return await this.listingRepository.find();
  }

  async getListing(id: string) {
    return await this.listingRepository.findOne({ where: { id } });
  }

  async createListing({
    locationId,
    available,
    price,
    type,
  }: CreateListingDto) {
    const listing = new Listing();
    listing.available = available;
    listing.price = price;
    listing.type = type;

    const location = await this.locationService.getLocation(locationId);
    listing.location = location;

    await this.listingRepository.manager.save(listing);
  }
}
