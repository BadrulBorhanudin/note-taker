/**
 * Generates a random hexadecimal string.
 * @returns {string} - A random hexadecimal string.
 */
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
