var ingredientsList = [];
var mapRestos = null
var geojson3;



interact('.dropzone').dropzone({
  overlap: 0.75,

  ondropactivate: function (event) {
    event.target.classList.add('drop-active')
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
  },
  ondragleave: function (event) {
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    var index = ingredientsList.indexOf(event.relatedTarget.textContent);
    ingredientsList.splice(index, 1)
    console.log(ingredientsList);


  },
  ondrop: function (event) {
    var droppedElement = event.relatedTarget;
    droppedElement.classList.add('dropped');
    if (-1 == ingredientsList.indexOf(droppedElement.id)) {
        ingredientsList.push(droppedElement.id);
    }

    console.log(ingredientsList);
},

  ondropdeactivate: function (event) {
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
    listeners: { move: dragMoveListener }
  })

function dragMoveListener(event) {
  var target = event.target;
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

window.dragMoveListener = dragMoveListener;

var draggableElements = document.querySelectorAll('.drag-drop');

draggableElements.forEach(function (element) {
    adjustImageSize(element);
  if (element.id === 'anchovy') {
    element.style.backgroundImage = "url('./img/anchovy.png')";
  } else if (element.id === 'basil') {
    element.style.backgroundImage = "url('./img/basil.png')";
  } else if (element.id === 'tomato') {
    element.style.backgroundImage = "url('./img/tomato.png')";
  } else if (element.id === 'mushroom') {
    element.style.backgroundImage = "url('./img/mushroom_small.png')";
  }else if (element.id === 'olive') {
    element.style.backgroundImage = "url('./img/olives_small.png')";
  }else if (element.id === 'onion') {
    element.style.backgroundImage = "url('./img/red_onion.png')";
  }else if (element.id === 'pepper') {
    element.style.backgroundImage = "url('./img/peppers.png')";
  }else if (element.id === 'eggplant') {
    element.style.backgroundImage = "url('./img/eggplant_big.png')";
  }else if (element.id === 'pepperoni') {
    element.style.backgroundImage = "url('./img/salami.png')";
  }else if (element.id === 'artichoke') {
    element.style.backgroundImage = "url('./img/artichoke_big.png')";
  }else if (element.id === 'pineapple') {
    element.style.backgroundImage = "url('./img/pineapple.png')";
  }else if (element.id === 'bacon') {
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
  if(mapRestos == null) {
    initMap(filteredPizzas);
  }
  else {
    updateMap(filteredPizzas);
  }
  
  
}

d3.json("pizza_with_ingredients.json")
  .then(pizzaData => {
    const searchButton = document.querySelector('.beautiful-button');

    searchButton.addEventListener('click', () => {
      const percentage = 0.75; 
      searchPizza(ingredientsList, pizzaData, percentage);
      fullpage_api.moveSlideRight();
    });
  })
  .catch(error => {
    console.error("Error loading JSON file:", error);
  });



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

  geojson3.addTo(mapRestos);
}

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