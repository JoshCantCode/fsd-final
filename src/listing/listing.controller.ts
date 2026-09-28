import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ListingService } from "./listing.service";
import type CreateListingDto from "src/dtos/create-listing.dto";

@Controller("listing")
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  async getListings() {
    return await this.listingService.getListings();
  }

  @Get(":id")
  async getListing(@Param("id") id: string) {
    return await this.listingService.getListing(id);
  }

  @Post()
  async createListing(@Body() body: CreateListingDto) {
    return await this.listingService.createListing(body);
  }
}
