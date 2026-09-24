import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export default class IsAdmin implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: { headers: Record<string, string> } = context
      .switchToHttp()
      .getRequest();
    const key: string = request.headers["x-fsd-key"];

    // the key wasn't supplied
    if (!key) {
      return false;
    }

    return await this.userService.checkAdminKey(key);
  }
}
