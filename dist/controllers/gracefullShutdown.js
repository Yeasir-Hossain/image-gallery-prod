"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gracefullShutdown;
var _nodeFs = _interopRequireDefault(require("node:fs"));
var _nodePath = _interopRequireDefault(require("node:path"));
var _driverCache = require("./driverCache");
const eventsToHandle = ['SIGTERM', 'SIGINT', 'unhandledRejection', 'uncaughtException', 'SIGUSR2'];
const cachePath = _nodePath.default.join(_nodePath.default.resolve(), '.cache');
if (!_nodeFs.default.existsSync(cachePath)) _nodeFs.default.mkdirSync(cachePath);
function gracefullShutdown() {
  //events to handle
  eventsToHandle.forEach(async e => process.on(e, async orgErr => {
    try {
      console.log(orgErr);
      await this.search.save().catch(e => console.log(e));
      _driverCache.driverCache.die();
      return process.exit();
    } catch (e) {
      console.log(e);
      return process.exit();
    }
  }));
}