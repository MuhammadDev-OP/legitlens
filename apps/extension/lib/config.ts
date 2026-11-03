/** Edge RDAP + check proxy. Override via storage in future. */
export const DEFAULT_API_BASE =
  (import.meta.env.WXT_API_BASE as string | undefined) ??
  "http://localhost:3000";

export function apiUrl(path: string): string {
  return `${DEFAULT_API_BASE.replace(/\/$/, "")}${path}`;
}
