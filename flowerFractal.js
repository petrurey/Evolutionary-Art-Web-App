/* @author Petru Rey 
*  @date 2 May 2022
*/

//keeps track of iterations & used in @drawFlower() calculations
let number = 0;
// keeps track of individual petal z value (where it sits below/above other petals)
let zNumber = 0;
//keeps track if random values are requested by user
randomVals = true;

function getFlowerMenu(status) {
  randomVals = status.checked;
  $("#flower-settings").toggle();
  return randomVals;
}

function bindFlower() {
  canvas.bind("dblclick", downHandlerFlower);
}

function unbindFlower() {
  canvas.unbind("dblclick", downHandlerFlower);
}

//adds each petal below previously spaned petal
function addFlowerChild(shape) {
  parentShape.addChildAt(shape, zNumber);
  zNumber -= 1;
}

function downHandlerFlower() {
  selectedShape = document.getElementById("shape-drop-down").value;

  if (selectedShape === "selector") {
    window.alert("please return a shape");
    console.log("please return a shape");
    return;
  }

  //randomizez values, outside of recursion, if selected
  if (randomVals === true) {
    petalSize = getRandomInt(1, 20);
    scale = getRandomInt(1, 20);
    petalAngle = getRandomInt(1, 100) / 100;
  }

  animateFlower();
}

function drawFlower() {
  let angle = number * petalAngle;
  let radius = scale * Math.sqrt(number);
  positionX = radius * Math.sin(angle);
  positionY = radius * Math.cos(angle);

  //first iteration spawns circle as parent regardless of selected flower shape
  if (number === 0) {
    parentShape = spawnCircle(600, 300, 10);
    addShape(parentShape);
  }
  
  getPetalShape();

  addFlowerChild(childShape);

  freezeShapes(true);

  number++;
}

function animateFlower() {
  //listen for new user inputs every animation
  if (randomVals === false) {
    petalSize = document.getElementById("petal").value;
    scale = document.getElementById("scale").value;
    petalAngle = document.getElementById("angle").value / 100;
  }

  selectedShape = document.getElementById("shape-drop-down").value;
  iterN = Number(document.getElementById("iter-input").value);

  //if selector selected during animation, throw error and return
  if (selectedShape === "selector") {
    window.alert("please return a shape");
    return;
  }

  drawFlower();

  //stop once desired iterations reached
  if (number > iterN) {
    number = 0;
    return;
  }

  requestAnimationFrame(animateFlower);
}


function getPetalShape() {
  getShapeAttributes();

  switch (shape) {
    case "rectangle":
      childShape = spawnRect(positionX, positionY, petalSize, petalSize);
      childShape.fill = shapeColor;
      childShape.strokeWidth = strokeVar;
      childShape.strokeColor = strokeCol;
      break;

    case "circle":
      childShape = spawnCircle(positionX, positionY, petalSize);
      childShape.fill = shapeColor;
      childShape.strokeWidth = strokeVar;
      childShape.strokeColor = strokeCol;
      break;

    case "line":
      childShape = spawnLine(
        positionX,
        positionY,
        positionX - petalSize,
        positionY - petalSize
      );
      childShape.strokeWidth = strokeVar;
      childShape.strokeColor = shapeColor;
      break;

    case "polygon":
      childShape = spawnPoly(positionX, positionY, 3, petalSize);
      childShape.fill = shapeColor;
      childShape.strokeWidth = strokeVar;
      childShape.strokeColor = strokeCol;
      childShape.sides = polySides;
      break;

    case undefined:
      childShape = null;
      break;

    default:
      childShape = null;
      break;
  }
  return childShape;
}
