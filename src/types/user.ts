export enum UserRole {
  MEMBER,
  MANAGER,
  ADMIN,
}

export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
  locationId: string | null;
}

export function toRole(value: unknown): UserRole {
  const parsed = Number(value);
  return UserRole[parsed] === undefined ? UserRole.MEMBER : parsed;
}
