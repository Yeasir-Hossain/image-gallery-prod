"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = auth;
var _decodeAuthToken = _interopRequireDefault(require("../utils/decodeAuthToken"));
var _settings = _interopRequireDefault(require("../settings"));
var _statics = require("../utils/statics");
/**
 * This function is used to authenticate request.
 * After authetication it inserts the user data to reqest object.
 */
async function auth(req, res, next) {
  try {
    const token = req.cookies?.[_settings.default.SESSION_KEY] || req.headers.cookie;
    if (!token) return next();
    const user = await (0, _decodeAuthToken.default)(token);
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send(_statics.unauthorized);
  }
}