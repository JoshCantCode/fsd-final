import { Controller, Get, Post } from "@nestjs/common";
import { LocationService } from "./location.service";

@Controller("location")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getLocations() {}

  @Get(":id")
  async getLocation() {}

  @Get(":id/listings")
  async getListings() {}

  @Post()
  async createLocation() {}
}
