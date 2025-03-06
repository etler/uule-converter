export function toUriSafeBase64(plainString: string): string {
  return btoa(plainString).replace(/\+/g, "-").replace(/\//g, "_")
}
export function fromUriSafeBase64(base64String: string): string {
  return atob(base64String.replace(/-/g, "+").replace(/_/g, "/"))
}
