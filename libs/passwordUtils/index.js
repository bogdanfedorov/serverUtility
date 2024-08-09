import crypto from "node:crypto";

/**
 * Create hash and salt for password
 * @param {string} password
 * @returns {{salt: string, hash: string}}
 */
export const generatePassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

/**
 * Check password on valid
 * @param {string} password
 * @param {string} hash
 * @param {string} salt
 * @returns {boolean}
 */
export const validPassword = (password, hash, salt) => {
  const checkHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  console.table([password, hash, salt, checkHash]);
  return hash === checkHash;
};
