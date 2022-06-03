// Define a couple variables about our SVG grid
const width = 1000;
const height = 1000;

// Define some helper functions to randomize plant size and orbit distance
let randomPlanetSize = () => randomInt(10, 50);
let randomOrbitDistance = () => randomInt(100, 120);

function draw() {
  let starSize = randomInt(70, 120);
  let markup = drawStar(starSize) + addPlanets(starSize);
  
  document.querySelector(".js-svg-wrapper_1").innerHTML = markup;
}

function addPlanets(starSize) {
  let markup = '';

  // Set up our first planet
  let planetSize = randomPlanetSize();
  let orbitDistance = starSize + randomOrbitDistance();

  // Keep adding planets until a planet's orbital distance and size would lead
  // to it extending past our canvas
  while (orbitDistance + planetSize < 500) {
    // Add our new planet and its orbit path to our markup
    markup += drawOrbit(orbitDistance) + drawPlanet(planetSize, orbitDistance);

    // Prep our next planet so the while loop can check whether it's in bounds
    planetSize = randomPlanetSize();
    orbitDistance += randomOrbitDistance();
  }

  return markup;
}

// We create a separate drawStar function to make it easier to change later
function drawStar(size) {
  // Note upper range of red exceeds 360
  const hueRange = randomItemInArray([[330, 390], [40, 60], [190, 240]]);

  // Pass along chosen array as arguments
  let hue = randomInt(...hueRange);

  // If red is greater than 360,
  // use remainder
  if (hue > 360) {
    hue = hue - 360;
  }

  // We'll use higher saturation and lightness values for our star
  // than our planets.
  const saturation = randomInt(90, 100);
  const lightness = randomInt(60, 80);
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return `
    <circle 
      cx="${width / 2}" 
      cy="${height / 2}" 
      r="${size}" 
      fill="${color}"
    />
  `;
}

function drawPlanet(size, distance) {
  const hue = randomInt(0, 360);
  const saturation = randomInt(70, 100);
  const lightness = randomInt(50, 70);
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return `
    <circle 
      cx="${width / 2 + distance}" 
      cy="${height / 2}" 
      r="${size}" 
      fill="${color}"
      class="planet"
      style="
        --start-rotation:${randomInt(0, 360)}deg;
        --rotation-speed:${distance * randomInt(40, 70)}ms;
      "
    />
  `;
}

function drawOrbit(distance) {
  // The orbit is centered and has a radius equal to our current distance
  return `
    <circle 
      cx="${width/2}" 
      cy="${height/2}" 
      r="${distance}" 
      stroke="#ccc"
      fill="none"
    />
  `;
}


/**
 * Initialize our art piece
 */
draw();

//
// Randomization Functions
//

// Return a number between two values.
function random(min, max) {
  const difference = max - min;
  return min + difference * Math.random();
}

// Returns a random integer between two values
function randomInt(min, max) {
  return Math.round(random(min, max));
}

// Returns true or false. By default the chance is 50/50 but you can pass in
// a custom probability between 0 and 1. (Higher values are more likely to
// return true.)
function randomBool(probability = 0.5) {
  return Math.random() > probability;
}

// Returns a random item from an array
function randomItemInArray(array) {
  return array[randomInt(0, array.length - 1)];
}

function irAdmin()
          {
            window.location.href="/admin.html";

          }

          function onLoad()
          {
            const xhttp = new XMLHttpRequest();
            xhttp.open("GET", "/api/exoplanets");
            xhttp.send();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                var trHTML = '<div class="carousel-item active">'; 
                    trHTML +='<div class="row">';
                const objects = JSON.parse(this.responseText);
                var chunk_size=4;
                var indice=0;
                var total=Object.values(objects).length;
                var sumTotal=0;
                for (let object of objects) {
                  if(indice == chunk_size)
                  {
                    trHTML +='</div>';
                    trHTML +='</div>';
                    trHTML +='<div class="carousel-item">';
                    trHTML +='<div class="row">';
                    indice = 0;
                  }
                 
                  trHTML +='<div  class="col-md-3 mb-3">';
                  trHTML +='<div class="card" align="center">';
                  trHTML +='<div class="cat"><img alt="100%x280" src="'+object['image']+'"></div>';
                  trHTML +='<div class="card-body">';
                  trHTML +='<h4 class="card-title">'+object['name']+'</h4>';
                  trHTML +='<p class="card-text">';
                  trHTML +='<b>WikiData Id:</b>' + object['id']+'<br>';
                  trHTML +='<b>Descubridor:</b>' + object['discoverer']+'<br>';
                  trHTML +='<b>Wikipedia:</b><a href="' + object['wiki']+'" target="_blank">'+object['wiki']+'</a><br>';
                  trHTML +='</p>';
                  trHTML +='</div>';
                  trHTML +='</div>';
                  trHTML +='</div>';
                  
                  if(total == sumTotal )
                  {
                    trHTML +='</div>';
                    trHTML +='</div>';
                  }

                  indice = indice + 1;
                  sumTotal = sumTotal + 1;
                }
                document.getElementById("totalPlanetas").innerHTML = ' <p class="cantidad">Existen '+total+' exoplanetas registrados</p>';
                document.getElementById("carousel").innerHTML = trHTML;
              }
            };

          };
         onLoad();