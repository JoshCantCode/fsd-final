import {
  ForbiddenException,
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { toRole, UserRole } from "src/types/user";
import { REQUIRE_ROLE_KEY } from "src/decorators/require-role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<UserRole>(
      REQUIRE_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (required === undefined) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { role?: unknown } }>();
    const role = toRole(request.user?.role);

    if (role < required) {
      throw new ForbiddenException(
        `This action requires the ${UserRole[required]} role`,
      );
    }

    return true;
  }
}
