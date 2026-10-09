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

  // for the functions below, we don't need to specify the ID as they are all user-specific things

  @Patch("watch/:locationId")
  @RequireRole(UserRole.MEMBER)
  async watchLocation(
    @AuthUser() user: SessionUser,
    @Param("locationId") locationId: string,
  ) {
    const u = await this.userService.getCurrentUser(user);
    return await this.userService.addToWatchlist({
      userId: u.id,
      locationId,
    });
  }

  @Get("notifications")
  @RequireRole(UserRole.MEMBER)
  async getNotifications(@AuthUser() user: SessionUser) {
    const u = await this.userService.getCurrentUser(user);
    return await this.userService.getNotifications(u.id);
  }

  @Get("watched")
  @RequireRole(UserRole.MEMBER)
  async getWatchedLocations(@AuthUser() user: SessionUser) {
    const u = await this.userService.getCurrentUser(user);
    return await this.userService.getUsersWatchedLocations(u.id);
  }

  // this has to be at the bottom otherwise any thing in the first slot is percepted to be an ID

  @Get(":id")
  async getUser(@AuthUser() user: SessionUser, @Param("id") id: string) {
    return await this.userService.getUserAs(id, user);
  }
}
