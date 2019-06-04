/*!
 * maptalks.wmts v0.1.0
 * LICENSE : MIT
 */
/*!
 * requires maptalks@^0.39.0 
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
    typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
      (factory((global.maptalks = global.maptalks || {}), global.maptalks));
}(this, (function (exports, maptalks) {
  'use strict';
  var extend = maptalks.Util.extend;
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
  function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

  function getParamString(obj, existingUrl, uppercase) {
    var params = [];

    for (var i in obj) {
      params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
    }

    return (!existingUrl || existingUrl.indexOf('?') === -1 ? '?' : '&') + params.join('&');
  }
  var options$v2 = {
    uppercase: false
  };
  var defaultWmtsParams = {
    service: 'WMTS',
    request: 'GetTile',
    layer: '',
    tilematrixset: '',
    format: 'image/png',
    version: '1.0.0'
  };

  var WMTSTileLayer = function (_TileLayer) {
    _inherits(WMTSTileLayer, _TileLayer);
    function WMTSTileLayer(id, options) {
      var _this;
      _this = _TileLayer.call(this, id) || this;
      var wmtsParams = extend({}, defaultWmtsParams);
      for (var p in options) {
        if (!(p in _this.options)) {
          wmtsParams[p] = options[p];
        }
      }
      var url = options.urlTemplate
      options.urlTemplate = url + getParamString(wmtsParams, url, this.options.uppercase) + '&tileMatrix={z}&tileRow={y}&tileCol={x}'
      _this.setOptions(options);
      _this.setZIndex(options.zIndex);
      return _this;
    }
    var _proto = WMTSTileLayer.prototype;
    _proto.toJSON = function toJSON() {
      return {
        'type': 'WMTSTileLayer',
        'id': this.getId(),
        'options': this.config()
      };
    };
    _proto.fromJSON = function fromJSON(layerJSON) {
      if (!layerJSON || layerJSON['type'] !== 'WMTSTileLayer') {
        return null;
      }

      return new WMTSTileLayer(layerJSON['id'], layerJSON['options']);
    };
    return WMTSTileLayer;
  }(maptalks.TileLayer);

  WMTSTileLayer.registerJSONType('WMTSTileLayer');
  WMTSTileLayer.mergeOptions(options$v2);

  exports.WMTSTileLayer = WMTSTileLayer;

  Object.defineProperty(exports, '__esModule', { value: true });

  typeof console !== 'undefined' && console.log('maptalks.wmts v0.1.0, requires maptalks@^0.39.0.');

})));