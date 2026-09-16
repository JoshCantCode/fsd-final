import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import type CreateUserDto from "src/dtos/create-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(":id")
  async getUser(id: string) {
    return await this.userService.getUser(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }
}
