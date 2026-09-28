import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { LocationService } from "./location.service";
import type CreateLocationDto from "src/dtos/create-location.dto";

@Controller("location")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getLocations() {
    return await this.locationService.getLocations();
  }

  @Get(":id")
  async getLocation(@Param("id") id: string) {
    return await this.locationService.getLocation(id);
  }

  @Get(":id/listings")
  async getListings(@Param("id") id: string) {
    return await this.locationService.getListings(id);
  }

  @Post()
  async createLocation(@Body() body: CreateLocationDto) {
    return await this.locationService.createLocation(body);
  }
}
