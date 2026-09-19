import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Listing from "./listing.entity";

/**
 * An order is created after a user successfully pays for a booking.
 */
@Entity()
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (u) => u.bookings)
  user: User;

  @ManyToOne(() => Listing, (l) => l.orders)
  listing: Listing;

  @Column({
    type: "date",
  })
  arrival: Date;

  @Column({
    type: "date",
  })
  departure: Date;
}
