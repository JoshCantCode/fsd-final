import { Controller } from "@nestjs/common";

@Controller("user")
export class UserController {
  async getUsers() {}

  async getUser(id: string) {}
}
