import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CreateListingDto from "src/dtos/create-listing.dto";
import UpdateListingDto from "src/dtos/update-listing.dto";
import type { SessionUser } from "src/types/user";
import Listing from "src/entities/listing.entity";
import { LocationService } from "src/location/location.service";
import { UserRole } from "src/types/user";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { NotificationType } from "src/types/notification";

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly locationService: LocationService,
    @InjectQueue("notification") private queue: Queue,
  ) {}

  async getListings() {
    return await this.listingRepository.find();
  }

  async getListing(id: string) {
    return await this.listingRepository.findOne({ where: { id } });
  }

  async createListing(
    { locationId, available, price, type }: CreateListingDto,
    actor: SessionUser,
  ) {
    this.assertManagesLocation(actor, locationId);

    const listing = new Listing();
    listing.available = available;
    listing.price = price;
    listing.type = type;
    listing.location = await this.locationService.getLocation(locationId);

    await this.queue.add(NotificationType[NotificationType.LISTING_CREATED], {
      listingId: listing.id,
    });

    return await this.listingRepository.save(listing);
  }

  async updateListing(
    id: string,
    { locationId, available, price, type }: UpdateListingDto,
    actor: SessionUser,
  ) {
    const listing = await this.findListing(id);
    this.assertManagesLocation(actor, listing.location?.id);

    if (locationId !== undefined && locationId !== listing.location.id) {
      this.assertManagesLocation(actor, locationId);
      listing.location = await this.locationService.getLocation(locationId);
    }

    if (available !== undefined) listing.available = available;
    if (price !== undefined) listing.price = price;
    if (type !== undefined) listing.type = type;

    await this.queue.add(NotificationType[NotificationType.LISTING_UPDATED], {
      listingId: listing.id,
    });

    return await this.listingRepository.save(listing);
  }

  async deleteListing(id: string, actor: SessionUser) {
    const listing = await this.findListing(id);
    this.assertManagesLocation(actor, listing.location?.id);

    await this.listingRepository.remove(listing);

    await this.queue.add(NotificationType[NotificationType.LISTING_DELETED], {
      listingId: listing.id,
    });

    return {
      status: 200,
      message: `Successfully deleted listing ${id}`,
    };
  }

  private async findListing(id: string) {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: { location: true },
    });

    if (!listing) {
      throw new NotFoundException(`Could not find listing ${id}`);
    }

    return listing;
  }

  private assertManagesLocation(actor: SessionUser, locationId?: string) {
    if (actor.role >= UserRole.ADMIN) return;

    if (!actor.locationId || actor.locationId !== locationId) {
      throw new ForbiddenException(
        "You can only manage listings at the location you manage",
      );
    }
  }
}
