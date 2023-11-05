"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _mongodb = _interopRequireDefault(require("./controllers/mongodb"));
var _app = _interopRequireDefault(require("./app"));
var _settings = _interopRequireDefault(require("./settings"));
require("./utils/dateOverride");
(() => {
  // Check for clients directory as it is required by this framework
  const statics = _path.default.resolve(__dirname, '..', 'client');
  if (!_fs.default.existsSync(statics)) {
    _fs.default.mkdirSync(statics);
  }
  const deps = [{
    method: _mongodb.default,
    args: [_settings.default]
  }];

  // Boot Up the server & services
  const app = new _app.default({
    deps
  });
  app.start();
})();