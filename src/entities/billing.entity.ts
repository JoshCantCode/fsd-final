import { Column, Entity, PrimaryColumn } from "typeorm";

/**
 * The Billing Entity that all users get. Creating a new user automatically creates this billing entity alongside it
 * The default values all come from Stripes own test data and docs, as well as this medium article
 * https://medium.com/@yassinejedidi10/how-to-implement-a-payment-module-in-nestjs-ad402aa7f83d
 */
@Entity()
export default class Billing {
  @PrimaryColumn()
  id!: string;

  @Column()
  card_number: string = "4242424242424242";

  @Column()
  cvc: number = 123;

  @Column()
  expiry: string = "12/34";
}
