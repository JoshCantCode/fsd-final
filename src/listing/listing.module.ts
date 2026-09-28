import { Module } from "@nestjs/common";
import { ListingService } from "./listing.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Listing from "src/entities/listing.entity";
import { LocationModule } from "src/location/location.module";
import { ListingController } from "./listing.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), LocationModule],
  controllers: [ListingController],
  providers: [ListingService],
  exports: [ListingService],
})
export class ListingModule {}
