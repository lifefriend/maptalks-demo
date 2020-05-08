# maptalks.arcgistilelayer
[![npm](https://img.shields.io/npm/v/maptalks.arcgistilelayer.svg)](https://www.npmjs.com/package/maptalks.arcgistilelayer)


## Get Start

## Installation

```
npm install maptalks.arcgistilelayer --save
```

```
yarn add maptalks.arcgistilelayer
```


### Usage

```javascript
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/maptalks.arcgistilelayer/dist/maptalks.arcgis.min.js"></script>
<script>
var arcGISTileLayer = new maptalks.ArcGISTileLayer('ESRI_Imagery_World_2D', {
			urlTemplate: 'https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer'
          }).addTo(map);
</script>
```

or

```javascript
import { ArcGISTileLayer } from 'maptalks.arcgistilelayer'
var arcGISTileLayer = new ArcGISTileLayer('ESRI_Imagery_World_2D', {
			urlTemplate: 'https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer'
          }).addTo(map);
```



[在线demo](https://lifefriend.netlify.app/data/maptalks/arcgis/)

