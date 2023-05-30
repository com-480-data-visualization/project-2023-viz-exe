
var map = L.map('map').setView([37.8, -96], 4);

var tiles = L.tileLayer('https://www.freeusandworldmaps.com/images/USPrintable/USA522letterBWPrint.jpg').addTo(map);

L.geoJson(statesData).addTo(map);


