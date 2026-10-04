import { UserRole } from "src/types/user";

export default interface SetUserRoleDto {
  role: UserRole;
  locationId?: string | null;
}
