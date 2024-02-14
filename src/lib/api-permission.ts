import { UserRole } from "@/types";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Endpoint = `${Method} ${string}`;
type Warning = "Please check the format of the api endpoint key";

const typeChecker = <
  T extends K extends true ? Record<Endpoint, UserRole[]> : Warning,
  // Record<Endpoint, UserRole[]> not working here
  K = keyof T extends Endpoint ? true : false
>(
  arg: T
) => arg;

/**
 * The permission for each api endpoint
 * default: all user can access
 */
const apiPermission = typeChecker({
  "POST /event": [UserRole.EVENT_MANAGER, UserRole.ADMIN],
  "GET /event/[^/]*": [UserRole.EVENT_MANAGER, UserRole.ADMIN],
  "GET /event/[^/]*/repair-request": [
    UserRole.REPAIRER,
    UserRole.EVENT_MANAGER,
    UserRole.ADMIN
  ],
  "GET /user": [UserRole.REPAIRER, UserRole.EVENT_MANAGER, UserRole.ADMIN],
  "GET /user/[^/]*": [
    UserRole.REPAIRER,
    UserRole.EVENT_MANAGER,
    UserRole.ADMIN
  ],
  "PATCH /user/[^/]*/role": [UserRole.ADMIN]
});

export default apiPermission;
