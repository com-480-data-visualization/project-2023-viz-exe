var ingredientsList = [];
var mapRestos = null
var geojson3;



// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,


  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    var index = ingredientsList.indexOf(event.relatedTarget.textContent);
    ingredientsList.splice(index, 1)
    console.log(ingredientsList);


  },
  ondrop: function (event) {
    var droppedElement = event.relatedTarget;
    // Change the image of  the dropped element
    droppedElement.classList.add('dropped'); // Add the "dropped" class to change the background image
    // Add the dropped element to the list
    if (-1 == ingredientsList.indexOf(droppedElement.id)) {
        ingredientsList.push(droppedElement.id);
    }

    // Print the updated list
    console.log(ingredientsList);
},

  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

interact('.drag-drop')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener }
  })

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // update the position attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// Select draggable elements by their text content
var draggableElements = document.querySelectorAll('.drag-drop');

draggableElements.forEach(function (element) {
    adjustImageSize(element);
  if (element.id === 'anchovy') {
    // Set background image for the draggable element with text content 'Apple'
    element.style.backgroundImage = "url('./img/anchovy.png')";
  } else if (element.id === 'basil') {
    // Set background image for the draggable element with text content 'Banana'
    element.style.backgroundImage = "url('./img/basil.png')";
  } else if (element.id === 'tomato') {
    // Set background image for the draggable element with text content 'Orange'
    element.style.backgroundImage = "url('./img/tomato.png')";
  } else if (element.id === 'mushroom') {
    // Set background image for the draggable element with text content 'Orange'
    element.style.backgroundImage = "url('./img/mushroom_small.png')";
  }else if (element.id === 'olive') {
    // Set background image for the draggable element with text content 'Orange'
    element.style.backgroundImage = "url('./img/olives_small.png')";
  }else if (element.id === 'onion') {
    // Set background image for the draggable element with text content 'Orange'
    element.style.backgroundImage = "url('./img/red_onion.png')";
  }else if (element.id === 'pepper') {
    // Set background image for the draggable element with text content 'Orange'
    element.style.backgroundImage = "url('./img/peppers.png')";
  }else if (element.id === 'eggplant') {
    // Set background image for the draggable element with text content 'Orange'
    element.style.backgroundImage = "url('./img/eggplant_big.png')";
  }else if (element.id === 'pepperoni') {
    // Set background image for the draggable element with text content 'Orange'
    element.style.backgroundImage = "url('./img/salami.png')";
  }else if (element.id === 'artichoke') {
    // Set background image for the draggable element with text content 'Orange'
    element.style.backgroundImage = "url('./img/artichoke_big.png')";
  }else if (element.id === 'pineapple') {
    // Set background image for the draggable element with text content 'Orange'
    element.style.backgroundImage = "url('./img/pineapple.png')";
  }else if (element.id === 'bacon') {
    // Set background image for the draggable element with text content 'Orange'
    element.style.backgroundImage = "url('./img/bacon_together.png')";
  }
});

function adjustImageSize(element) {
    var elementWidth = element.offsetWidth;
    var elementHeight = element.offsetHeight;
    element.style.backgroundSize = elementWidth + 'px ' + elementHeight + 'px';
  }


  function adjustImageSize(element) {
    var elementWidth = element.offsetWidth;
    var elementHeight = element.offsetHeight;
    element.style.backgroundSize = elementWidth + 'px ' + elementHeight + 'px';
  }


function searchPizza(ingredientsList, pizzaData, percentage) {
  const ingredients = ingredientsList.map(word => word.toLowerCase());

  const filteredPizzas = pizzaData.filter(pizza => {
    const ingredientsInPizza = pizza.ingredients.map(item => item.toLowerCase());
    const ingredientCoverage = ingredientsInPizza.filter(item => ingredients.includes(item)).length;
    const requiredCoverage = Math.ceil(percentage * ingredients.length);

    return ingredientCoverage >= requiredCoverage && pizza["menus.amountMax"] > 3; ;
  });

  console.log(`We have found ${filteredPizzas.length} places where you can buy this pizza !`);
  console.log(filteredPizzas);
  return filteredPizzas
  
  
  
  
}

// Assuming you have loaded the JSON data using d3.json and it returns a Promise
d3.json("pizza_with_ingredients.json")
  .then(pizzaData => {
    // Get a reference to the Search button
    const searchButton = document.querySelector('.beautiful-button');

    // Create a closure for each marker click event handler
    (function () {
      buttonMarker.on('click', function () {
        // Navigate to the left slide
        const percentage = 0.75; // Replace with your desired percentage
        var filtered = searchPizza(ingredientsList, pizzaData, percentage);
        var text = `
          <div class="slide-content">
            
              <div class="image-box">
              <script type="text/javascript">
              if(mapRestos == null) {
                  initMap(filteredPizzas);
                }
                else {
                  updateMap(filteredPizzas);
                } 
              </script>
                
              </div>
              <div class="text-box">
                  <h2>Wow so many results !</h2>
                  We have found ${filtered.length} places where you can buy this pizza !
                  
              </div>
          </div>
        `;

        fullpage_api.moveSlideRight();

        // Write the text on the left slide
        var slideContent = document.querySelector('.fp-slides .fp-slide.active');
        slideContent.innerHTML = text;
      });
    })();
    
  })
  .catch(error => {
    console.error("Error loading JSON file:", error);
  });



// Function to initialize the map
function initMap(pizzas) {
  mapRestos = L.map('map_results',
  {   zoomControl: false,
      minZoom: 5,
      maxZoom: 5
  }).setView([37.8, -96], 4);
  
  var minPricePizza = pizzas.reduce(function (prev, curr) {
    return prev["menus.amountMax"] < curr["menus.amountMax"] ? prev : curr;
  })

  for (var i = 0; i < pizzas.length; i++) {
    var coord_l = pizzas[i].latitude;
    var coord_long = pizzas[i].longitude;
    var pizzaName = pizzas[i]["menus.name"];
    var pizzaPrice = pizzas[i]["menus.amountMax"];
    var restaurantName = pizzas[i].name;
    var city = pizzas[i].city;

    var isMinPricePizza = pizzas[i] === minPricePizza;

    var markerClassName = isMinPricePizza ? 'custom-marker-min-price' : 'custom-marker';

    var popupContent = `
      <div style="background-color: #F4E3C3; color: #8c0b0b; padding: 20px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); font-family: 'Brush Script MT', cursive;">
        <h4 style="font-size: 24px; margin-bottom: 10px;">${pizzaName}</h4>
        <p style="margin-bottom: 5px; font-size: 16px;">Price: ${pizzaPrice}</p>
        <p style="margin-bottom: 5px; font-size: 16px;">Restaurant: ${restaurantName}</p>
        <p style="margin-bottom: 5px; font-size: 16px;">City: ${city}</p>
      </div>
    `;
  
    var marker = L.marker([coord_l, coord_long], {
      icon: L.divIcon({
        className: markerClassName,
        iconSize: [32, 32]
      })
    }).addTo(mapRestos);

    marker.bindPopup(popupContent);

    marker.on('mouseover', function(e){
      this.openPopup();
    });

    marker.on('mouseout', function(e){
      this.closePopup();
    });
  }
  
  geojson3 = L.geoJson(statesData, {
      style: style3
  })

  // Add a default layer
  geojson3.addTo(mapRestos);
}

// Function to initialize the map
function updateMap(pizzas) {

  mapRestos.eachLayer(function (layer) {
    mapRestos.removeLayer(layer);
    });

    var minPricePizza = pizzas.reduce(function (prev, curr) {
      return prev["menus.amountMax"] < curr["menus.amountMax"] ? prev : curr;
    })


    for (var i = 0; i < pizzas.length; i++) {
      var coord_l = pizzas[i].latitude;
    var coord_long = pizzas[i].longitude;
    var pizzaName = pizzas[i]["menus.name"];
    var pizzaPrice = pizzas[i]["menus.amountMax"];
    var restaurantName = pizzas[i].name;
    var city = pizzas[i].city;

    var popupContent = `
      <div style="background-color: #FFD700; color: #8B0000; padding: 20px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); font-family: 'Brush Script MT', cursive;">
        <h4 style="font-size: 24px; margin-bottom: 10px;">${pizzaName}</h4>
        <p style="margin-bottom: 5px; font-size: 16px;">Price: ${pizzaPrice}</p>
        <p style="margin-bottom: 5px; font-size: 16px;">Restaurant: ${restaurantName}</p>
        <p style="margin-bottom: 5px; font-size: 16px;">City: ${city}</p>
      </div>
    `;

    var isMinPricePizza = pizzas[i] === minPricePizza;

    var markerClassName = isMinPricePizza ? 'custom-marker-min-price' : 'custom-marker';
  
    var marker = L.marker([coord_l, coord_long], {
      icon: L.divIcon({
        className: markerClassName,
        iconSize: [32, 32]
      })
    }).addTo(mapRestos);

    marker.bindPopup(popupContent);

    marker.on('mouseover', function(e){
      this.openPopup();
    });

    marker.on('mouseout', function(e){
      this.closePopup();
    });
  }
  
    geojson3 = L.geoJson(statesData, {
      style: style3
  })
  geojson3.addTo(mapRestos);
}