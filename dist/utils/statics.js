"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unauthorized = exports.serverError = exports.badRequest = void 0;
const unauthorized = {
  status: 401,
  reason: 'Unauthorized'
};
exports.unauthorized = unauthorized;
const badRequest = {
  status: 400,
  reason: 'Bad Request'
};
exports.badRequest = badRequest;
const serverError = {
  status: 404,
  reason: 'Server Error'
};
exports.serverError = serverError;