"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _mongoose = require("mongoose");
function _default(settings) {
  return new Promise(function (resolve, reject) {
    // Set mongoose properties
    (0, _mongoose.set)('strictQuery', true);

    // Connect
    // eslint-disable-next-line
    (0, _mongoose.connect)(settings.MONGODB_URL, {
      keepAlive: true,
      loggerLevel: 'debug'
    }, function (err) {
      if (err) {
        reject(err);
      }
      resolve('Connected to MongoDB');
    });
  });
}