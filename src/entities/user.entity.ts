import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Billing from "./billing.entity";
import { UserRole } from "src/types/user";

/**
 * The User entity, created when... theres a new User
 */
@Entity()
export default class User {
  @PrimaryColumn()
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
}
