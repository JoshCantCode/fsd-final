import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Listing from "./listing.entity";

/**
 * A location is a venue. Can be a hotel, inn, etc
 */
@Entity()
export default class Location {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @OneToMany(() => Listing, (listing) => listing.location)
  listings: Listing[];
}
