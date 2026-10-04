import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import type CreateUserDto from "src/dtos/create-user.dto";
import type SetUserRoleDto from "src/dtos/set-user-role.dto";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { RequireRole } from "src/decorators/require-role.decorator";
import { type SessionUser, UserRole } from "src/types/user";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@AuthUser() user: SessionUser) {
    return await this.userService.getUsersAs(user);
  }

  @Get(":id")
  async getUser(@AuthUser() user: SessionUser, @Param("id") id: string) {
    return await this.userService.getUserAs(id, user);
  }

  @Post()
  @RequireRole(UserRole.ADMIN)
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Patch(":id/role")
  @RequireRole(UserRole.ADMIN)
  async setRole(@Param("id") id: string, @Body() body: SetUserRoleDto) {
    return await this.userService.setRole(id, body);
  }

  @Delete(":id")
  @RequireRole(UserRole.ADMIN)
  async deleteUser(@Param("id") id: string) {
    return await this.userService.deleteUser(id);
  }
}
