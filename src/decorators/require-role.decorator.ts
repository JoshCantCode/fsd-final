import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RoleGuard } from "src/guards/role.guard";
import { UserRole } from "src/types/user";

export const REQUIRE_ROLE_KEY = "fsd:require-role";

export const RequireRole = (role: UserRole) =>
  applyDecorators(SetMetadata(REQUIRE_ROLE_KEY, role), UseGuards(RoleGuard));
