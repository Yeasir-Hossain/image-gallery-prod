"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateSessionId;
/**
 * This function is used generating session ID.
 * @returns returns session ID.
 */
function generateSessionId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let sessionId = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sessionId += characters.charAt(randomIndex);
  }
  return sessionId;
}