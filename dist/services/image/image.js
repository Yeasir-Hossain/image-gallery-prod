"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = image;
var _middlewares = require("../middlewares");
var _image = require("./image.entity");
var _cloudinary = _interopRequireDefault(require("cloudinary"));
function image() {
  // Intitalizing cloudinary
  _cloudinary.default.config(this.settings.CLOUDINARY_CREDS);

  /**
  * POST /image
  * @description This route is used upload an image.
  */
  this.route.post('/image', _middlewares.auth, (0, _image.upload)(this));

  /**
  * GET /image
  * @description This route is used to get all image.
  */
  this.route.get('/image', _middlewares.auth, (0, _image.getImages)(this));

  /**
  * GET /image/:imageId
  * @description This route is used delete an image.
  */
  this.route.delete('/image', _middlewares.auth, (0, _image.deleteImage)(this));
}