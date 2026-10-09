import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import type CreateLocationDto from "src/dtos/create-location.dto";
import { RequireRole } from "src/decorators/require-role.decorator";
import { UserRole } from "src/types/user";
import { LocationService } from "./location.service";

@Controller("location")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @AllowAnonymous()
  async getLocations() {
    return await this.locationService.getLocations();
  }

  @Get(":id/listings")
  @AllowAnonymous()
  async getListings(@Param("id") id: string) {
    return await this.locationService.getListings(id);
  }

  @Get(":id")
  @AllowAnonymous()
  async getLocation(@Param("id") id: string) {
    return await this.locationService.getLocation(id);
  }

  @Post()
  @RequireRole(UserRole.ADMIN)
  async createLocation(@Body() body: CreateLocationDto) {
    return await this.locationService.createLocation(body);
  }
}
