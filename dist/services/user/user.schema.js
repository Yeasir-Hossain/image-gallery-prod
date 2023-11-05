"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
const schema = new _mongoose.Schema({
  sid: {
    type: String
  },
  visitedTime: {
    type: Date
  },
  rating: {
    type: Number
  },
  review: {
    type: String
  }
}, {
  timestamps: true
});
schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return JSON.parse(JSON.stringify(obj).replace(/_id/g, 'id'));
};
var _default = (0, _mongoose.model)('User', schema);
exports.default = _default;