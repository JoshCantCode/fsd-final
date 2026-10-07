import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { REQUIRE_ROLE_KEY } from "src/constants/rbac";
import { RoleGuard } from "src/guards/role.guard";
import { UserRole } from "src/types/user";

export const RequireRole = (role: UserRole) =>
  applyDecorators(SetMetadata(REQUIRE_ROLE_KEY, role), UseGuards(RoleGuard));
