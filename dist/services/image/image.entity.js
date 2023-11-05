"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.getImages = exports.deleteImage = void 0;
var _statics = require("../../utils/statics");
var _image = _interopRequireDefault(require("./image.schema"));
var _cloudinary = _interopRequireDefault(require("cloudinary"));
//   these are the set to validate the request query.
const allowedQuery = new Set(['$or', 'sortBy']);

/**
 * Uploads the image in to cloudinary and then store it in the database.
 * @param {Object} db - The database object for interacting with the database.
 * @returns {Object} - The new image object
 */
/**
 * Uploads multiple images to Cloudinary and stores them in the database.
 * @param {Object} db - The database object for interacting with the database.
 * @returns {Array} - An array of new image objects
 */
/**
 * Uploads multiple images to Cloudinary and stores them in the database using Mongoose's insertMany.
 * @param {Object} db - The database object for interacting with the database.
 * @returns {Array} - An array of new image objects
 */
const upload = ({
  db
}) => async (req, res) => {
  try {
    const images = [];
    if (!req.files || !req.files.image) {
      return res.status(400).send(_statics.badRequest);
    }
    if (Array.isArray(req.files.image)) {
      for (const file of req.files.image) {
        const cloudinaryResponse = await _cloudinary.default.v2.uploader.upload(file.path);
        const imageObject = {
          path: cloudinaryResponse.secure_url
        };
        if (req.user) {
          imageObject.user = req.user.id;
        }
        images.push(imageObject);
      }
    } else {
      const cloudinaryResponse = await _cloudinary.default.v2.uploader.upload(req.files.image.path);
      const imageObject = {
        path: cloudinaryResponse.secure_url
      };
      if (req.user) {
        imageObject.user = req.user.id;
      }
      images.push(imageObject);
    }
    const insertedImages = await db.bulkCreate({
      table: _image.default,
      docs: [...images]
    });
    res.status(200).send(insertedImages);
  } catch (e) {
    res.status(500).send(_statics.serverError);
    console.log(e);
  }
};

/**
 * This function is used to get the images and also if there is any user images.
 * Here if the user upload any images he or she will also get the images uploaded by them only along with the default images
 * @param {Object} db - The database object for interacting with the database.
 * @returns {Object} - all images
 */
exports.upload = upload;
const getImages = ({
  db
}) => async (req, res) => {
  try {
    const query = {
      sortBy: 'createdAt:desc',
      $or: [{
        user: {
          $exists: false
        }
      }]
    };
    if (req.user && req.user.id) {
      query.$or.push({
        user: req.user.id
      });
    }
    const images = await db.find({
      table: _image.default,
      key: {
        query,
        allowedQuery: allowedQuery,
        paginate: false
      }
    });
    images ? res.status(200).send(images) : res.status(400).send(_statics.badRequest);
  } catch (e) {
    console.error(e);
    res.status(500).send(_statics.serverError);
  }
};

/**
 * @param deleteImage function is used to delete images that the user has uploaded
 * @param req.params contains the image id.
 * @returns success or failed
 */
exports.getImages = getImages;
const deleteImage = ({
  db
}) => async (req, res) => {
  try {
    if (!req.body.id.length || !req.user) return res.status(400).send(_statics.badRequest);
    const deleteResult = await db.removeAll({
      table: _image.default,
      key: {
        id: {
          '$in': req.body.id
        }
      }
    });
    deleteResult.deletedCount ? res.status(200).send({
      message: 'Deleted Successfully',
      status: true
    }) : res.status(400).send({
      message: 'image not found',
      status: false
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(_statics.serverError);
  }
};
exports.deleteImage = deleteImage;