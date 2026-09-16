import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Listing from "./listing.entity";

@Entity()
export default class Location {
  @PrimaryGeneratedColumn()
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
