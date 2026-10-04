import { ListingType } from "src/types/listing";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import Location from "./location.entity";
import Order from "./order.entity";

/**
 * The Listing entity is an individual listing of a room in a Location
 */
@Entity()
export default class Listing {
  @PrimaryGeneratedColumn("uuid")
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

  @OneToMany(() => Order, (o) => o.listing)
  orders: Order[];

  @Column()
  available: boolean = true;
}
