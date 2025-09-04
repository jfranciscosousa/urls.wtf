export const ERRORS = {
  INVALID_URL: "invalid_url",
  UNKNOWN_ERROR: "unknown_error",
};

export function getErrorMessage(error: unknown) {
  if (!error || typeof error !== "object") return ERRORS.UNKNOWN_ERROR;

  const message = "message" in error ? error.message : ERRORS.UNKNOWN_ERROR;

  if (typeof message !== "string") return ERRORS.UNKNOWN_ERROR;

  if (Object.values(ERRORS).includes(message)) return message;

  return ERRORS.UNKNOWN_ERROR;
}
