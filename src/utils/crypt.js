const crypto = require("crypto");
/**
 * initVector must be 16 byte of random data
 * secretKey must be 32 byte of random data
 */
const initVector = Buffer.from(process.env.ENCRYPTION_IV);
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY);
const encrypt = (value) => {
  if (!value) return value;
  /**
   * Buffer.from() Convert a string to a buffer
   */
  const data = Buffer.from(value.toString(), "utf-8").toString("binary");
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, initVector);
  let encryptedData = cipher.update(data, "utf-8", "hex");

  return data;
};
/*const decrypt = (encrypedData) => {
  const buff = Buffer.from(encryptedData, "base64");
};*/
module.exports = encrypt;
