import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { toRole, type SessionUser } from "src/types/user";

export const AuthUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): SessionUser => {
    const request = context.switchToHttp().getRequest<{
      user?: {
        id?: string;
        email?: string;
        role?: unknown;
        locationId?: string | null;
      };
    }>();

    return {
      id: request.user?.id ?? "",
      email: request.user?.email ?? "",
      role: toRole(request.user?.role),
      locationId: request.user?.locationId ?? null,
    };
  },
);
