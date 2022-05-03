/* @author Petru Rey
 *  @date 2 May 2022
 *  @Copyright (c) 2022 Johannes Koggdal
 */

function spawnCircle(x, y, r) {
  var circle = canvas.display.arc({
    x: x,
    y: y,
    radius: r,
    start: 0,
    end: 360,
    fill: "",
    stroke: "",
  });
  return circle;
}

function spawnRect(x, y, sideH, sideW) {
  var square = canvas.display.rectangle({
    x: x,
    y: y,
    height: sideH,
    width: sideW,
    fill: "",
    stroke: "",
  });
  return square;
}

function spawnLine(startX, startY, endX, endY) {
  var line = canvas.display.line({
    start: { x: startX, y: startY },
    end: { x: endX, y: endY },
    stroke: "",
    cap: "round",
  });
  return line;
}

function spawnPoly(x, y, s, r) {
  var poly = canvas.display.polygon({
    x: x,
    y: y,
    sides: s,
    radius: r,
    fill: "",
  });
  return poly;
}

// stores selected shape and handels relevant menus
function getSelectShape(selectedShape) {
  shape = selectedShape.value;

  $("#stroke-color").show();
  $("#poly-menu").hide();
  $("#shape-menu").show();

  if (shape === "line") {
    $("#stroke-color").hide();
  } else if (shape === "polygon") {
    $("#poly-menu").show();
  }

  return shape;
}

//adds shape to canvas & makes each shape's zindex change when it's dragged (so it comes on top of other shapes)
function addShape(shape) {
  canvas.addChild(shape);
  var dragOptions = { changeZindex: true };
  shape.dragAndDrop(dragOptions);
}

//reset specific menu values
function resetForms() {
  var shapeMenu = document.getElementById("shape-drop-down");
  var fractMenu = document.getElementById("fractal-menu");
  document.getElementById("check").checked = true;
  fractMenu.selectedIndex = "selector";
  shapeMenu.selectedIndex = "selector";
}

//freezes shapes and makes cursor change when user hovers over shape depending on freeze state
function freezeShapes(freezeState) {
  var arrayLength = canvas.children.length;
  var dragOptions = { changeZindex: true };

  if (freezeState === true) {
    for (let i = 0; i < arrayLength; i++) {
      var child = canvas.children[i];

      child
        .bind("mouseenter", function () {
          canvas.mouse.cursor("default");
        })
        .bind("mouseleave", function () {
          canvas.mouse.cursor("default");
        });

      if (child.draggable === true) {
        child.dragAndDrop(false);
      }
    }
  } else if (freezeState === false) {
    for (let i = 0; i < arrayLength; i++) {
      var child = canvas.children[i];
      child.dragAndDrop(dragOptions);

      child.bind("mouseenter", function () {
        canvas.mouse.cursor("pointer");
      });
    }
  }
}

//calculate and store coordinates relevant to shape spawning
function getCoordinates() {
  l1 = x2 - x1;
  l2 = y1 - y2;
  l3 = Math.sqrt(l1 * l1 + l2 * l2);
  xmid = (x1 + x2) / 2;
  ymid = (y1 + y2) / 2;
}

function exportCanvas() {
  var canvas = document.getElementById("canvas");
  var fileType = "image/png";
  var URL = canvas.toDataURL("image/png");
  var link = document.createElement("a");

  link.download = "downloadImg";
  link.href = URL;
  link.dataset.downloadurl = [fileType, link.download, link.href].join( ":" );

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function canvasBgColour(colour) {
  bg = String(colour.value);
  canvas.background.set(bg);
}

// Handles the fetching of coordinates once mouse is down
function downHandler() {
  x1 = canvas.mouse.x;
  y1 = canvas.mouse.y;
}

function hideForms() {
  $("#fractal-settings").hide();
  $("#shape-settings-fract").hide();
  $("#shape-menu").hide();
  $("#flower-settings").hide();
  $("#random-check").hide();
  $("#shape-settings").hide();
  $("#poly-menu").hide();
  $("#iter-menu").hide();
}

function getShapeAttributes() {
  shapeColor = document.getElementById("color").value;
  strokeVar = Number(document.getElementById("stroke-width").value);
  polySides = Number(document.getElementById("poly-sides").value);
  strokeCol = document.getElementById("stroke-color").value;
}

//copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }