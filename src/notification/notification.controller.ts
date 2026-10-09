import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import type CreateNotificationDto from "src/dtos/create-notification.dto";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { RequireRole } from "src/decorators/require-role.decorator";
import { type SessionUser, UserRole } from "src/types/user";
import { NotificationService } from "./notification.service";

@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @RequireRole(UserRole.MANAGER)
  async createNotification(
    @AuthUser() user: SessionUser,
    @Body() body: CreateNotificationDto,
  ) {
    return await this.notificationService.createNotification({
      ...body,
      isAdmin: user.role >= UserRole.ADMIN,
    });
  }

  @Get(":id")
  async getNotification(@Param("id") id: string) {
    return await this.notificationService.getNotification(id);
  }
}
