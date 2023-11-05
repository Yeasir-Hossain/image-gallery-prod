"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = user;
var _middlewares = require("../middlewares");
var _user = require("./user.entity");
function user() {
  /**
  * POST /user
  * @description This route is used to create a user and store session ID.
  */
  this.route.get('/user', _middlewares.auth, (0, _user.register)(this));
}