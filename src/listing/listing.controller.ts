import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import type CreateListingDto from "src/dtos/create-listing.dto";
import type UpdateListingDto from "src/dtos/update-listing.dto";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { RequireRole } from "src/decorators/require-role.decorator";
import { type SessionUser, UserRole } from "src/types/user";
import { ListingService } from "./listing.service";

@Controller("listing")
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  @AllowAnonymous()
  async getListings() {
    return await this.listingService.getListings();
  }

  @Post()
  @RequireRole(UserRole.MANAGER)
  async createListing(
    @AuthUser() user: SessionUser,
    @Body() body: CreateListingDto,
  ) {
    return await this.listingService.createListing(body, user);
  }

  @Patch(":id")
  @RequireRole(UserRole.MANAGER)
  async updateListing(
    @AuthUser() user: SessionUser,
    @Param("id") id: string,
    @Body() body: UpdateListingDto,
  ) {
    return await this.listingService.updateListing(id, body, user);
  }

  @Delete(":id")
  @RequireRole(UserRole.MANAGER)
  async deleteListing(@AuthUser() user: SessionUser, @Param("id") id: string) {
    return await this.listingService.deleteListing(id, user);
  }

  @Get(":id")
  @AllowAnonymous()
  async getListing(@Param("id") id: string) {
    return await this.listingService.getListing(id);
  }
}
