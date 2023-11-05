"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.services = void 0;
var _image = _interopRequireDefault(require("./image/image"));
var _user = _interopRequireDefault(require("./user/user"));
const services = app => {
  app.configure(_user.default);
  app.configure(_image.default);
};
exports.services = services;