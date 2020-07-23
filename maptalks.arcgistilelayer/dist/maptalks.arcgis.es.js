/*!
 * maptalks.ArcGISTileLayer v0.1.0
 * LICENSE : MIT
 */
/*!
 * requires maptalks@^0.39.0 
 */
import { Util, TileLayer } from 'maptalks';

var extend = Util.extend;
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
  uppercase: false,
  detectRetina:false
};
var defaultArcParams = {
  // dpi: '90',		
  // bboxSR: '3857',
  // imageSR: '3857',
  // size: '512,512',
  // layers: '',
  transparent: true,
  format: 'png32',
  f:'image'
};

var ArcGISTileLayer = function (_TileLayer) {
  _inherits(ArcGISTileLayer, _TileLayer);
  function ArcGISTileLayer(id, options) {
    var _this;
    _this = _TileLayer.call(this, id) || this;
    var arcParams = extend({}, defaultArcParams);
    for (var p in options) {
      if (!(p in _this.options)) {
        arcParams[p] = options[p];
      }
    }
    _this.arcParams = arcParams;
    _this.setOptions(options);
    _this.setZIndex(options.zIndex);
    _this.onConfig();
    return _this;
  }
  var _proto = ArcGISTileLayer.prototype;
  _proto.getTileUrl = function getTileUrl(x, y, z) {
    var res = this.getSpatialReference().getResolution(z),
        tileConfig = this._getTileConfig(),
        tileExtent = tileConfig.getTilePrjExtent(x, y, res);

    var max = tileExtent.getMax(),
        min = tileExtent.getMin();
    // var bbox = [min.y, min.x, max.y, max.x].join(',');
    var bbox = [min.x, min.y, max.x, max.y].join(',');
    
    
    var pro = this.getSpatialReference().getProjection() || this.getMap().getProjection()  
    var srid = pro.code.split(':').pop();
    this.arcParams['bboxSR'] = srid;
    this.arcParams['imageSR'] = srid;
    
    var tileSize = this.getTileSize();
    this.arcParams['size'] = tileSize.width + ',' + tileSize.height;
    
    var dpr = this.getMap().getDevicePixelRatio();
    var r = options$v2.detectRetina ? dpr : 1;
    this.arcParams['dpi'] = 90 * r;
    
    var url = _TileLayer.prototype.getTileUrl.call(this, x, y, z);
    return url + getParamString(this.arcParams, url, this.options.uppercase) + (this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
  };
  _proto.onConfig = function onConfig() {
    var url = this.options.urlTemplate; 
    this.options.urlTemplate = url.replace(/MapServer\/?$/, "MapServer/export").replace(/ImageServer\/?$/, "ImageServer/exportImage");
    // this.clear();
  };
  _proto.toJSON = function toJSON() {
    return {
      'type': 'ArcGISTileLayer',
      'id': this.getId(),
      'options': this.config()
    };
  };
  ArcGISTileLayer.fromJSON = function fromJSON(layerJSON) {
    if (!layerJSON || layerJSON['type'] !== 'ArcGISTileLayer') {
      return null;
    }

    return new ArcGISTileLayer(layerJSON['id'], layerJSON['options']);
  };
  return ArcGISTileLayer;
}(TileLayer);

ArcGISTileLayer.registerJSONType('ArcGISTileLayer');
ArcGISTileLayer.mergeOptions(options$v2);

export { ArcGISTileLayer };

typeof console !== 'undefined' && console.log('maptalks.ArcGISTileLayer v0.1.0, requires maptalks@^0.39.0.');