import bcrypt from "bcryptjs";

/**
 * The one place the app hashes passwords. Account creation (createAdmin),
 * password changes, and login comparison all go through here so the cost
 * factor can't drift between them.
 */
export const BCRYPT_COST = 12;

/** bcrypt only uses the first 72 bytes of a password; longer input is rejected rather than silently truncated. */
export const BCRYPT_MAX_BYTES = 72;

export const hashPassword = (plainText: string) => bcrypt.hash(plainText, BCRYPT_COST);

export const verifyPassword = (plainText: string, hash: string) => bcrypt.compare(plainText, hash);
