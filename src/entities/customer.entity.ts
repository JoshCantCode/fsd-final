import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Billing from "./billing.entity";

/**
 * The customer entity, created when... theres a new customer
 */
@Entity()
export default class Customer {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @OneToOne(() => Billing)
  @JoinColumn()
  billing: Billing;
}
