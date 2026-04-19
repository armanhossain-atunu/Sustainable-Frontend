const FALLBACK_API_BASE_URL = "http://localhost:5000/api/v1";

function trimBaseUrl(value?: string) {
  return value?.trim().replace(/\/+$/, "");
}

export function getServerApiBaseUrl() {
  return (
    trimBaseUrl(process.env.SERVER_DOMAIN) ??
    trimBaseUrl(process.env.NEXT_PUBLIC_SERVER_DOMAIN) ??
    FALLBACK_API_BASE_URL
  );
}

export function getClientApiBaseUrl() {
  return trimBaseUrl(process.env.NEXT_PUBLIC_SERVER_DOMAIN) ?? FALLBACK_API_BASE_URL;
}
