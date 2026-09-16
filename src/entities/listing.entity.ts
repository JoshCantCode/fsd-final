import { ListingType } from "src/types/listing";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import Location from "./location.entity";

/**
 * The Listing entity is an individual listing of a room in a Location
 */
@Entity()
export default class Listing {
  @PrimaryColumn()
  id!: string;

  @Column({
    type: "enum",
    enum: ListingType,
    default: ListingType.SINGLE,
  })
  type: ListingType;

  @Column({
    type: "float",
  })
  price: number;

  @ManyToOne(() => Location, (location) => location.listings)
  location: Location;

  @Column()
  available: boolean = true;
}
