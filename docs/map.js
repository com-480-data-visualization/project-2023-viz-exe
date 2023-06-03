
var geojson;
var geojson2;
var map;

dico = {"Altoona-style pizza" : [40.51, -78.40, "Altoona", "Pennsylvania", "Altoona-style pizza is a distinct type of pizza created in the city of Altoona, Pennsylvania, by the Altoona Hotel. The definitive characteristics of Altoona-style pizza are a Sicilian-style pizza dough, tomato sauce, sliced green bell pepper, salami, topped with American cheese and pizzas cut into squares instead of wedges. Altoona-style pizza originated at the Altoona Hotel, which was noted as serving a unique pizza in 1996 by the Pittsburgh Post-Gazette. Following the destruction of the hotel in 2013 by fire, other local restaurants began serving Altoona-style pizza.", "altoona.png"],
       "Bar Pizza" : [42.36, -71.05, "Boston", "Massachusetts", "Bar pizza, also known as tavern pizza and sometimes Milwaukee-style pizza, is distinguished by a thin crust, almost cracker-like, and is baked, or at least partly baked, in a shallow pan for an oily crust. Cheese covers the entire pizza, including the crust, leaving a crispy edge where the cheese meets the pan or oven surface. Bar pizzas are usually served in a bar or pub and are usually small in size. This style of pizza is popular in the Boston area, particularly the South Shore, other parts of the northeast, the Chicago area, and the midwest.", "barpizza.png"],
       "California-style pizza" : [37.87, -122.27, "Berkeley", "California", "California-style pizza (also known as California pizza) is a style of pizza that combines New York and Italian thin crust with toppings from the California cuisine cooking style. Its invention is generally attributed to chef Ed LaDou, and Chez Panisse, in Berkeley, California. Wolfgang Puck, after meeting LaDou, popularized the style of pizza in the rest of the country. It is served in many California cuisine restaurants. California Pizza Kitchen, Round Table Pizza, Extreme Pizza, and Sammy's Woodfired Pizza are four major pizza franchises associated with California-style pizza.", "california.png"],
       "Chicago style" : [41.88, -87.62, "Chicago", "Illinois", "Chicago-style pizza is pizza prepared according to several styles developed in Chicago, widely referred to as deep-dish pizza due to its cooking style. The pan in which it is baked gives the pizza its characteristically high edge which provides ample space for large amounts of cheese and a chunky tomato sauce. Chicago-style pizza may be prepared in deep-dish style and as a stuffed pizza.", "chicago.png"],
       "Detroit-style pizza" : [42.33, -83.04, "Detroit", "Michigan", "Detroit-style pizza is a rectangular pan pizza with a thick, crisp, chewy crust. It is traditionally topped to the edges with Wisconsin brick cheese, which caramelizes against the high-sided heavyweight rectangular pan. Detroit-style pizza was originally baked in rectangular steel trays designed for use as automotive drip pans or to hold small industrial parts in factories. It was developed during the mid-20th century in Detroit, Michigan, before spreading to other parts of the United States in the 2010s. It is one of Detroit's iconic local foods.", "detroit.png"],
       "Grandma pizza" : [40.8, -73.30, "Long Island", "New York", "Grandma pizza is a distinct thin, rectangular style of pizza attributed to Long Island, New York. Typically topped with cheese and tomato sauce, it is reminiscent of pizzas baked at home by Italian housewives who lacked a pizza oven. The pizza is often compared to Sicilian pizza. A grandma pizza is typically rectangular, with the cheese placed before the tomato sauce, baked in a sheet pan in a home oven, and cut into small squares.", "grandma.png"],
       "Greek pizza" : [41.35,-72.09, "New London", "Connecticut", "In the cuisine of the United States, Greek pizza is a style of pizza crust and preparation where the pizza is proofed and cooked in a metal pan rather than stretched to order and baked on the floor of the pizza oven. A shallow pan is used, unlike the deep pans used in Sicilian, Chicago, or Detroit-styled pizzas. Its crust is typically spongy, airy, and light, like focaccia but not as thick. The crust is also rather oily, due to the coating of oil applied to the pan during preparation. In the United States, Greek-style pizza is common in New England and parts of eastern New York State.", "greek.png"],
       "Minneapolis-style pizza" : [44.95, -93.20, "Minneapolis–Saint Paul", "Minnesota", "Minneapolis-style pizza or Minnesota-style pizza is a circular thin-crust pizza, cut into squares, with spicy sauce, and hearty toppings. It is popular in the Twin Cities metropolitan area.", "minneapolis.png"],
       "New Haven–style" : [41.31, -72.92, "New Haven", "Connecticut", "New Haven–style pizza is a style of thin-crust, coal-fired Neapolitan pizza common in and around New Haven, Connecticut. Locally known as apizza (from Neapolitan na pizza, a pizza), it originated in 1925 at the Frank Pepe Pizzeria Napoletana and is now served in many other pizza restaurants in the area, most notably Sally's Apizza and Modern Apizza. This geographically limited pizza style has been favorably regarded by national critics.", "newhaven.png"],
       "New York-style" : [40.71, -74.00, "New York City", "New York", "New York-style is a Neapolitan-style thin-crust pizza developed in New York City by immigrants from Naples, Italy, where pizza was created. It is traditionally hand-tossed, moderately topped with southern Italian-style marinara sauce, and liberally covered with mozzarella cheese. It is often sold in generously sized, thin, and flexible slices, typically folded in half to eat. This style of pizza tends to dominate the Northeastern states and is particularly popular in New York, New Jersey, and Connecticut. Jumbo slices of a similar pie are particularly popular in Washington, D.C.", "newyork.png"],
       "Pan pizza" : [37.68, -97.33, "Wichita", "Kansas", "Pan pizza is a pizza baked in a deep dish pan or sheet pan. Italian tomato pie, Sicilian pizza, Chicago-style pizza and Detroit-style pizza may be considered forms of pan pizza. Pan pizza also refers to the thick style popularized by Pizza Hut in the 1960s. The bottoms and sides of the crust become fried and crispy in the oil used to coat the pan.", "pan.png"],
       "Quad City–style pizza" : [41.54, -90.59, "Davenport", "Iowa", "Quad City–style pizza is a variety of pizza originating in the Quad Cities region of the states of Illinois and Iowa in the United States. Characteristics of Quad City–style pizza include malt in the crust, tomato sauce made with red chili flakes and/or cayenne pepper, toppings placed under the cheese, and being cut into strips instead of triangular slices.", "quad.png"],
       "Sicilian pizza" : [45.52, -122.68, "Portland", "Oregon", "Sicilian pizza in the United States is typically a square pie with a thick crust. It is derived from Sfinciuni, a thick-crust variety from Sicily, and was introduced in the US by early Sicilian immigrants. Sicilian-style pizza is popular in Italian-American enclaves in the Northeast, Metro Detroit, and Portland, Oregon.", "sicilian.png"],
       "St. Louis-style" : [38.62, -90.19, "St. Louis", "Missouri", "St. Louis-style is a variant of thin-crust pizza popular around St. Louis and southern Illinois notable for its use of distinctive Provel cheese instead of (or, rarely, in addition to) mozzarella. Its crust is thin enough to become very crunchy in the oven, sometimes being compared to a cracker, and toppings are usually sliced instead of diced. Even though round, St. Louis-style pies are always cut into small squares.", "stlouis.png"],
       };

var currentMap = "default"

var mapState = null;
var stateLayer = null;
var markersLayer = null;

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
        grades = [0, 5, 10, 15, 20, 25, 30, 50];
    }
    else {
        grades = [0, 1.5, 2, 2.5, 3, 3.5, 4, 4.5];
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



    // Iterate over the dico dictionary to add buttons
    for (var key in dico) {
        if (dico.hasOwnProperty(key)) {
          var buttonCoords = [dico[key][0], dico[key][1]];
          var buttonName = key;
          var buttonPopupContent = `
            <strong>${buttonName}</strong><br>
            Origin: ${dico[key][2]}, ${dico[key][3]}<br>
            <img src="./pizza-img/${dico[key][5]}" alt="Image" width="300">
            `;


          console.log(dico[key]);
          var t = `
            <div class="slide-content">
               
                <div class="image-box">
                    <img src="./pizza-img/${dico[key][5]}" alt="Image">
                </div>
                <div class="text-box">
                    <h2>${buttonName}</h2>

                    ${dico[key][4]}<br>
                </div>
            </div>`;
      
          // Create a marker at the button's coordinates
          var buttonMarker = L.marker(buttonCoords, {
            icon: L.divIcon({
              className: 'custom-marker',
              iconSize: [32, 32]
            })
          }).addTo(map);
      
          // Bind a popup to the marker with the desired content
          buttonMarker.bindPopup(buttonPopupContent);

          buttonMarker.on('mouseover', function (e) {
            this.openPopup();
          });
      
          // Close the popup when the mouse leaves the marker
          buttonMarker.on('mouseout', function (e) {
            this.closePopup();
          });
      
          // Create a closure for each marker click event handler
          (function (text) {
            buttonMarker.on('click', function () {
              // Navigate to the left slide
              fullpage_api.moveSlideLeft();
      
              // Write the text on the left slide
              var slideContent = document.querySelector('.fp-slides .fp-slide.active');
              slideContent.innerHTML = text;
            });
          })(t);
        }
      }
    }   



function style(feature) {
    return {
        fillColor: getColor(feature.properties.num_of_restos),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1
    };
}

function style2(feature) {
    return {
        fillColor: getColor2(feature.properties.restos_by_pop),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1
    };
}


function style3(feature) {
    return {
        fillColor: "#466f57",
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
  fullpage_api.moveSlideRight();

  if (mapState === null) {
      // Create the Leaflet map for the `map2` container
      mapState = L.map('mapState', {
        zoomControl: false,
      }).setView([42.8270, -75.5433], 7);
  
      // Add the tile layer to the map
    }

  if (stateLayer) {
      mapState.eachLayer(function (layer) {
          mapState.removeLayer(layer);
      });
  }

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
  
  mapState.setView(stateCoordinates[stateName], zoomLevels[stateName]);
  var restosCoords = e.target.feature.properties.restos_coords;
  restosCoords= restosCoords.filter(
      (value, index, self) =>
        index ===
        self.findIndex((arr) => JSON.stringify(arr) === JSON.stringify(value))
    );

  for (var i = 0; i < restosCoords.length; i++) {
      var coord = restosCoords[i];
      L.marker(coord, {
        icon: L.divIcon({
          className: 'custom-marker',
          iconSize: [32, 32]
        })
      }).addTo(mapState);
  }


  generateBarChart(cities[stateName]);

  if(currentMap=="default") {
    L.geoJson(stateLayer, {style: style}).addTo(mapState);
  }
  else {
    L.geoJson(stateLayer, {style: style2}).addTo(mapState);
  }
  

  document.getElementById('stateTitle').innerText = stateName;
  if(e.target.feature.properties.price != 0) {
      document.getElementById('priceDescription').innerText = "There average price for pizza in " + stateName + " is " + e.target.feature.properties.price.toFixed(2) + "$.";
  }
  else {
      document.getElementById('priceDescription').innerText = "There is no data about average price in this state.";
  }
  document.getElementById('stateDescription').innerText = "There are " + restosCoords.length + " pizza restaurants in " + stateName + ". The 10 cities with the most restaurants are : ";
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
    return d > 4.5 ? '#800026' :
           d > 4  ? '#BD0026' :
           d > 3.5  ? '#E31A1C' :
           d > 3  ? '#FC4E2A' :
           d > 2.5   ? '#FD8D3C' :
           d > 2   ? '#FEB24C' :
           d > 1.5   ? '#FED976' :
                      '#FFEDA0';
}
  
  // Call the addButtonsToMap() function after initializing the map
window.onload = initMap(info);


function generateBarChart(cityNames) {
  d3.select('.text-container').select('svg').remove();
  // Count the frequency of each city name
  const cityCounts = cityNames.reduce((acc, name) => {
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  // Get the top 10 most common city names
  const sortedCityCounts = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Set up the SVG dimensions
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 80, left: 60 };

  const tickCount = d3.max(sortedCityCounts, (d) => d[1]);

  // Create the SVG container
  const svg = d3
    .select('.text-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Set up the x and y scales
  const x = d3
    .scaleBand()
    .domain(sortedCityCounts.map((d) => d[0]))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(sortedCityCounts, (d) => d[1])])
    .range([height - margin.bottom, margin.top]);

  // Create the bars
  svg
    .selectAll('.bar')
    .data(sortedCityCounts)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d[0]))
    .attr('y', (d) => y(d[1]))
    .attr('width', x.bandwidth())
    .attr('height', (d) => y(0) - y(d[1]))
    .attr('fill', '#ae2d06'); // Change the color to 'dodgerblue' or any other CSS color value

  // Create the x-axis
  svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll('.tick text')
    .attr('class', 'text x-axis-label') // Add the x-axis-label class
    .attr('transform', 'rotate(-45)')
    .attr('text-anchor', 'end');

  // Create the y-axis
  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(tickCount, 'd'));

  // Add labels to the x-axis
  svg
    .append('text')
    .attr('class', 'text')
    .attr('x', width / 2)
    .attr('y', height)
    .attr('text-anchor', 'middle')
    .text('City Name');

  // Add labels to the y-axis
  svg
    .append('text')
    .attr('class', 'text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', margin.left / 2)
    .attr('text-anchor', 'middle')
    .text('Frequency');
}




