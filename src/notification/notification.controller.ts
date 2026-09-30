import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import type CreateNotificationDto from "src/dtos/create-notification.dto";
import { NotificationService } from "./notification.service";
import { AuthService } from "src/auth/auth.service";

@Controller("notification")
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
  ) {}

  @Get(":id")
  async getNotification(@Param("id") id: string) {
    return await this.notificationService.getNotification(id);
  }

  @Post()
  async createNotification(
    @Req() req: { headers: Record<string, string> },
    @Body() body: CreateNotificationDto,
  ) {
    const key: string = req.headers["x-fsd-key"];
    let isAdmin: boolean;

    if (!key) {
      isAdmin = false;
    }

    isAdmin = await this.authService.checkAdminKey(key);

    return await this.notificationService.createNotification({
      ...body,
      isAdmin,
    });
  }
}
