export interface AuthUser {
  fullName: string;
  email: string;
}

const authStorageKey = "codefolk.auth.user";

export function loadAuthUser(): AuthUser | null {
  try {
    const storedUser = localStorage.getItem(authStorageKey);
    if (!storedUser) return null;

    const user: unknown = JSON.parse(storedUser);
    if (
      typeof user === "object" &&
      user !== null &&
      "fullName" in user &&
      typeof user.fullName === "string" &&
      "email" in user &&
      typeof user.email === "string"
    ) {
      return { fullName: user.fullName, email: user.email };
    }
  } catch {
    return null;
  }

  return null;
}

export function saveAuthUser(user: AuthUser): void {
  try {
    localStorage.setItem(authStorageKey, JSON.stringify(user));
  } catch {
    // Keep the current session usable when browser storage is unavailable.
  }
}

export function clearAuthUser(): void {
  try {
    localStorage.removeItem(authStorageKey);
  } catch {
    // The in-memory session still ends even when browser storage is unavailable.
  }
}