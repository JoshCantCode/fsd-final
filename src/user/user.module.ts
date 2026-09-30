import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "src/entities/user.entity";
import { LocationModule } from "src/location/location.module";
@Module({
  imports: [TypeOrmModule.forFeature([User]), LocationModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
