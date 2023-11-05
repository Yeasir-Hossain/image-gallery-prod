"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.driverCache = exports.default = void 0;
var _nodePath = _interopRequireDefault(require("node:path"));
var _nodeFs = _interopRequireDefault(require("node:fs"));
class DriverCache {
  constructor() {
    this.cachePath = _nodePath.default.join(_nodePath.default.resolve(), 'cache');
    this.cacheFileName = 'drivers.json';
    this.fullPath = _nodePath.default.join(this.cachePath, this.cacheFileName);
  }
  born() {
    if (!_nodeFs.default.existsSync(this.fullPath)) _nodeFs.default.writeFileSync(this.fullPath, '{}', 'utf-8');
    global.drivers = {};
  }
  get(id) {
    return id ? global.drivers[id] : global.drivers;
  }
  add(id, value) {
    global.drivers[id] = value;
  }
  remove(id) {
    delete global.drivers[id];
  }
  die() {
    _nodeFs.default.writeFileSync(this.fullPath, JSON.stringify(global.drivers || {}), 'utf-8');
  }
}
const driverCache = new DriverCache();
exports.driverCache = driverCache;
var _default = DriverCache;
exports.default = _default;