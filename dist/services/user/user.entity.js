"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("./user.schema"));
var _statics = require("../../utils/statics");
var _generateSessionId = _interopRequireDefault(require("../../utils/generateSessionId"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Creates a new user in the database with the generated session ID.
 * @param {Object} req - The request object containing the properties for the new user.
 * @param {Object} db - The database object for interacting with the database.
 * @returns {Object} the JWT token for an indefinite time for the user in the cookie.
 */
const register = ({
  db,
  settings
}) => async (req, res) => {
  try {
    if (req.user) return res.status(200).send({
      message: 'OK'
    });
    const user = await db.create({
      table: _user.default,
      key: {
        sid: (0, _generateSessionId.default)()
      }
    });
    const token = _jsonwebtoken.default.sign({
      id: user.id
    }, settings.secret);
    res.cookie(settings.SESSION_KEY, token, _objectSpread(_objectSpread({
      httpOnly: true
    }, settings.useHTTP2 && {
      sameSite: 'None',
      secure: true
    }), {}, {
      expires: new Date(253402300000000)
    }));
    res.status(200).send({
      message: 'OK'
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(_statics.serverError);
  }
};
exports.register = register;