
var geojson;
var geojson2;
var map;

var currentMap = "default"

var mapState = null;
var stateLayer = null;
var markersLayer = null;

function initializeMapState() {
  if (mapState === null) {
    // Create the Leaflet map for the `map2` container
    mapState = L.map('map2', {
      zoomControl: false,
    }).setView([42.8270, -75.5433], 7);

    // Add the tile layer to the map
    tiles = L.tileLayer('img/solid-color-image.png').addTo(mapState);
  }
}

var info = L.control();

var legend = L.control();

legend.onAdd = function (map) {

    this._div = L.DomUtil.create('div', 'info legend');
    this.update(currentMap);
    return this._div;
};

legend.update = function (current) {
    var grades;
    if (current == "default") {
        grades = [0, 10, 20, 50, 75, 100, 200, 250];
    }
    else {
        grades = [0, 4, 8, 12, 16, 20, 24, 28];
    }
    this._div.innerHTML = "";

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        color = current == "default" ?  getColor(grades[i] + 1) :  getColor2(grades[i] + 1)
        this._div.innerHTML +=
            '<i style="background:' + color + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
};


info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update(currentMap);
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (current, props) {
    if (current == "default") {
        this._div.innerHTML = '<h4>Number of restaurants</h4>' +  (props ?
            '<b>in ' + props.name + '</b><br />' + props.num_of_restos
            : 'Hover over a state');
    }
    else {
        this._div.innerHTML = '<h4>Number of restaurants</h4>' +  (props ?
            '<b>by 1M people in ' + props.name + '</b><br />' + Math.round(props.restos_by_pop * 100) / 100
            : 'Hover over a state');
    }
};


// Function to initialize the map
function initMap(info) {
    map = L.map('map',
    {   zoomControl: false,
        minZoom: 5,
        maxZoom: 5
    }).setView([37.8, -96], 4);

     

    info.addTo(map);
    legend.addTo(map);
    
    var tiles = L.tileLayer('img/solid-color-image.png').addTo(map);

    geojson = L.geoJson(statesData, {
        onEachFeature: onEachFeature,
        style: style
    })

    geojson2 = L.geoJson(statesData, {
        onEachFeature: onEachFeature,
        style: style2
    });

    // Add a default layer
    geojson.addTo(map);
  }



function style(feature) {
    return {
        fillColor: getColor(feature.properties.num_of_restos),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function style2(feature) {
    return {
        fillColor: getColor2(feature.properties.restos_by_pop),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: navigateToTargetSlide
    });
}


function navigateToTargetSlide(e) {
    // Get the state's name from the feature properties
    var stateName = e.target.feature.properties.name;
    
    // Call the moveSlideRight() method to move to the next slide
    fullpage_api.moveSlideRight();
    
    // Perform any additional actions or updates based on the clicked state
    // For example, you can display the state on the next slide
    //document.getElementById('stateName').innerText = stateName;
  
    // Create a new Leaflet map for the next slide

    initializeMapState();

    if (stateLayer) {
        mapState.eachLayer(function (layer) {
            mapState.removeLayer(layer);
        });
    }
    L.tileLayer('img/solid-color-image.png').addTo(mapState);

    stateLayer = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "id": "1",
            "properties":  e.target.feature.properties,
            "geometry": {
              "type": "Polygon",
              "coordinates": e.target.feature.geometry.coordinates
            }
          }
        ]
      }
    
    if(stateName == "Washington") {
        console.log("lol2");
        mapState.setView([47.400902, -121.490494], 10);
    }
    else {
        console.log("else")
        mapState.setView(stateCoordinates[stateName], zoomLevels[stateName]);
    }
    var restosCoords = e.target.feature.properties.restos_coords;

    for (var i = 0; i < restosCoords.length; i++) {
        var coord = restosCoords[i];
        L.marker(coord).addTo(mapState);
      }


    L.geoJson(stateLayer).addTo(mapState);
}


function toggleMap() {
    if (map.hasLayer(geojson)) {
      map.removeLayer(geojson);
      map.addLayer(geojson2);
      currentMap = "other"
    } else {
      map.removeLayer(geojson2);
      map.addLayer(geojson);
      currentMap = "default"
    }
    var toggleButton = document.getElementById("toggleButton");
    toggleButton.classList.toggle("active"); // Toggle the "active" class
    legend.update(currentMap);
}


  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    info.update(currentMap, layer.feature.properties);
    layer.bringToFront();
}

function resetHighlight(e) {
    if (map.hasLayer(geojson)) {
        geojson.resetStyle(e.target);
      } else {
        geojson2.resetStyle(e.target);
    }
    info.update(currentMap);
}


function getColor(d) {
    return d > 50 ? '#800026' :
           d > 30  ? '#BD0026' :
           d > 25  ? '#E31A1C' :
           d > 20  ? '#FC4E2A' :
           d > 15   ? '#FD8D3C' :
           d > 10   ? '#FEB24C' :
           d > 5   ? '#FED976' :
                      '#FFEDA0';
}

function getColor2(d) {
    return d > 28 ? '#800026' :
           d > 24  ? '#BD0026' :
           d > 20  ? '#E31A1C' :
           d > 16  ? '#FC4E2A' :
           d > 12   ? '#FD8D3C' :
           d > 8   ? '#FEB24C' :
           d > 4   ? '#FED976' :
                      '#FFEDA0';
}

window.onload = initMap(info);
