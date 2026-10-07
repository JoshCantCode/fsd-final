import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Billing from "./billing.entity";
import { UserRole } from "src/types/user";
import Booking from "./order.entity";
import Location from "./location.entity";
import Notification from "./notification.entity";

/**
 * The User entity, created when... theres a new User
 */
@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Index("IDX_user_email", { unique: true })
  @Column()
  email!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Column("uuid", { name: "locationId", nullable: true })
  locationId: string | null;

  @ManyToOne(() => Location, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "locationId" })
  managedLocation: Location | null;

  @OneToOne(() => Billing)
  @JoinColumn()
  billing: Billing;

  @OneToMany(() => Booking, (b) => b.user)
  bookings: Booking[];

  @ManyToMany(() => Location)
  @JoinTable()
  watchlist: Location[];

  @ManyToMany(() => Notification)
  @JoinTable()
  notifications: Notification[];

  @Column("boolean", { name: "emailVerified", default: false })
  emailVerified!: boolean;

  @Column("text", { name: "image", nullable: true })
  image: string | null;

  @Column("timestamptz", {
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @Column("timestamptz", {
    name: "updatedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
}
