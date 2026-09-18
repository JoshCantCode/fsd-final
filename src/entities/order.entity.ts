import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Listing from "./listing.entity";

@Entity()
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (u) => u.bookings)
  user: User;

  @ManyToOne(() => Listing, (l) => l.orders)
  listing: Listing;

  @Column({
    type: "datetime",
  })
  arrival: Date;
}
