import { NotificationType } from "src/types/notification";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Notification {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  message: string;

  @Column({
    type: "enum",
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({
    type: "json",
  })
  metadata: Record<any, any>;
}
