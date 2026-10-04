import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Location from "src/entities/location.entity";
import Listing from "src/entities/listing.entity";
import CreateLocationDto from "src/dtos/create-location.dto";

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getLocations() {
    return await this.locationRepository.find();
  }

  async getLocation(id: string) {
    const location = await this.locationRepository.findOne({
      where: {
        id,
      },
    });

    if (!location) {
      throw new HttpException(
        "Could not find this location",
        HttpStatus.NOT_FOUND,
      );
    }

    return location;
  }

  async getListings(id: string): Promise<Listing[]> {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: { listings: true },
    });

    const listings = location?.listings;

    if (!listings) {
      throw new HttpException("bad", HttpStatus.NOT_FOUND);
    }

    return listings;
  }

  async createLocation({ name, city, country }: CreateLocationDto) {
    try {
      const location = new Location();

      location.name = name;
      location.city = city;
      location.country = country;
      await this.locationRepository.manager.save(location);

      return {
        id: location.id,
        name,
        country,
        city,
      };
    } catch (cause) {
      throw new HttpException(
        `Error creating user ${name}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause,
        },
      );
    }
  }
}
