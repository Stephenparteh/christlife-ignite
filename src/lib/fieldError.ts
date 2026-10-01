/**
 * Backend validation errors come back as "field: message" when they're
 * about a specific field (see server/src/utils/zodError.ts) — this pulls
 * the field name back out so a dashboard form can show the message under
 * the right input instead of one ambiguous toast.
 */
export const parseFieldError = (message: string, knownFields: readonly string[]) => {
  const separatorIndex = message.indexOf(":");
  if (separatorIndex > 0) {
    const field = message.slice(0, separatorIndex).trim();
    if (knownFields.includes(field)) {
      return { field, message: message.slice(separatorIndex + 1).trim() };
    }
  }
  return { field: null as string | null, message };
};
