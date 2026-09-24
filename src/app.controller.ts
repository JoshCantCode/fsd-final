import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import IsAdmin from "./guards/is-admin.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth() {
    return this.appService.getHealth();
  }

  @Get("/test")
  @UseGuards(IsAdmin)
  test() {
    return 200;
  }
}
