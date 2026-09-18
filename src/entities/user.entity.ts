import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Billing from "./billing.entity";
import { UserRole } from "src/types/user";
import Booking from "./order.entity";

/**
 * The User entity, created when... theres a new User
 */
@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @OneToOne(() => Billing)
  @JoinColumn()
  billing: Billing;

  @OneToMany(() => Booking, (b) => b.user)
  bookings: Booking[];
}
