/**
 * Fractal Button; this is the button that handles everything on the fractal creation side of the app.
 *
 * @state = global button state (pressed/unpressed)
 *
 */
const button1 = document.querySelector(".button1");

button1.addEventListener("click", () => {
  //if another button is clicked throw alert
  if (button3.classList.contains("active")) {
    window.alert("please unclick any other drawing buttons");
    return;
  }
  //use "active" css when button is clicked
  button1.classList.toggle("active");
  //shape "undefined" for error catching during shape spawning
  shape = undefined;

  if (state === false) {
    //unbind any mouse actions
    unbindFlower();
    unbindFract();

    //unfreeze shapes so user can drag them
    freezeShapes(state);

    //hide all labels
    $("#fractal-label").hide();
    $("#fractal-menu").hide();
    $("#shape-settings").hide();
    $("#shape-menu").hide();
    $("#iter-label").hide();
    $("#flower-settings").hide();
    $("#random-check").hide();

    //reset all menus
    menuReset();

    //change button state
    state = true;
  } else if (state === true) {
    //freeze all shapes
    freezeShapes(state);

    //show relevant menus
    $("#fractal-label").show();
    $("#fractal-menu").show();

    state = false;
  }
});

//binds mouse for shape fractal drawing
function bindFract() {
  canvas.bind("mousedown", downHandler);
  canvas.bind("mouseup", upHandlerFract);
}

//unbinds mouse for shape fractal drawing
function unbindFract() {
  canvas.unbind("mousedown", downHandler);
  canvas.unbind("mouseup", upHandlerFract);
}

//calculates coordinates at mouseup + draws shape + freezes new shape
function upHandlerFract() {
  x2 = canvas.mouse.x;
  y2 = canvas.mouse.y;
  fractDraw();
  freezeShapes(true);
}

//shows & hides labels & inputs based on fractal-menu selected value
function getFractName(fract) {
  fract = fract.value;

  $("#iter-label").hide();
  $("#flower-settings").hide();
  $("#random-check").hide();

  if (fract === "selector") {
    unbindFlower();
    unbindFract();
  } else if (fract === "shape fractals") {
    unbindFlower();
    bindFract();

    $("#shape-settings").show();
    $("#iter-label").show();
  } else if (fract === "trigonometric flower") {
    unbindFract();
    bindFlower();

    $("#shape-settings").show();
    $("#iter-label").show();
    $("#random-check").show();
  }
  return fract;
}

//returns angle of rotation starting from x=0, clockwise, depending on quadrant
function calculateAlpha() {
  //gets user inputs first
  getCoordinates();

  //Quadrant 1
  alpha = Math.asin(l1 / l3) * (180 / Math.PI);

  //Quadrant 4
  if (x1 < x2 && y1 < y2) {
    alpha = 180 - alpha;

    //Quadrant 3
  } else if (x1 > x2 && y1 < y2) {
    alpha = 180 + Math.abs(alpha);

    //Quadrant 2
  } else if (x1 > x2 && y1 > y2) {
    alpha = 360 - Math.abs(alpha);
  }
  return alpha;
}

//draws shape fractals
function fractDraw() {
  //gets number of desired iterations
  iterN = Number(document.getElementById("iter-input").value);

  //limit iterations to 25 max
  if (iterN > 25) {
    iterN = 25;
  }

  //get rotation angle
  calculateAlpha();

  //spawn fractal based on input shape
  switch (shape) {
    case "rectangle":
      fractParent = spawnSquare(x2, y2, l3, l3);
      fractParent.rotate(alpha);
      squareFract(x1, y1, l3, iterN);
      addShape(fractParent);
      break;

    case "circle":
      fractParent = spawnCircle(xmid, ymid, l3 / 2);
      fractParent.rotate(alpha);
      circleFract(x1, y1, l3 / 2, iterN);
      addShape(fractParent);
      break;

    case "line":
      window.alert("please return a valid shape");
      console.log("please return a valid shape");
      break;

    case "polygon":
      fractParent = spawnPoly(xmid, ymid, 3, l3 / 2);
      fractParent.rotate(alpha);
      polyFract(x1, y1, 3, l3 / 2, iterN);
      addShape(fractParent);
      break;

    case undefined:
      window.alert("please return a shape");
      console.log("please return a shape");
      break;

    default:
      window.alert("please return a shape");
      console.log("please return a shape");
      break;
  }
}
