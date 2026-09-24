import { Controller, Get, Post } from "@nestjs/common";

@Controller("location")
export class LocationController {
  @Get()
  async getLocations() {}

  @Get(":id")
  async getLocation() {}

  @Post("")
  async createLocation() {}
}
