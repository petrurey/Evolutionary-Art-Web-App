//function to spawn circles
function spawnCircle(x, y, r){
    var circle = canvas.display.arc({  //define first arc (circle)
        x: x,
        y: y,
        radius: r,
        start: 0,
        end: 360,
        fill: "",
        pieSection: false,  //can be used to cut circle as for pie chart
        stroke: ""
    });
    return circle;
}

//function to spawn images
function spawnImage(x , y){
    var image = canvas.display.image({
        x: x,
        y: y,
        origin: { x: "center", y: "center" },
        image: "/Users/petrurey/Downloads/turtle.png"
    });
    return image;
}

//function to spawn squares
function spawnSquare(x, y, sideH, sideW){
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

// line function
function spawnLine(startX, startY, endX, endY){
    var line = canvas.display.line({
        start: {x: startX, y: startY},
        end: {x: endX, y: endY},
        stroke: "",
        cap: "round",
    });
    return line;
}

//polygon function
function spawnPoly(x, y, s, r){
        var poly = canvas.display.polygon({ 
        x: x,
        y: y,
        sides: s,
        radius: r,
        fill: ""
    });
    return poly;
}

// gets selected shape from HTML drop-down menu and stores it as value for use in other functions
// displays any hidden shape-specific menus when that shape is selected in drop-down
function getSelectShape(selectedShape){
    shape = selectedShape.value;

    $("#stroke-color").show();
    $("#poly-settings").hide();
    $("#shape-menu").show();

    if(shape === "line"){
        $("#stroke-color").hide();
    } else if (shape === "polygon") {
        $("#poly-settings").show();
    }

    return shape;
}

//adds shape to canvas & makes each shape's zindex change when it's dragged (so it comes on top of other shapes)
function addShape(shape){
    canvas.addChild(shape);
    var dragOptions = { changeZindex: true };
    shape.dragAndDrop(dragOptions);
}

function menuReset(){
    var shapeMenu = document.getElementById("shape-drop-down");  
    var fractMenu = document.getElementById("fractal-menu");
    document.getElementById("check").checked = true;
    fractMenu.selectedIndex = "selector";
    shapeMenu.selectedIndex = "selector";
}

function freezeShapes(freezeState){
    var arrayLength = canvas.children.length;

    if (freezeState === true){
        for (let i = 0; i < arrayLength ; i++){
            var child = canvas.children[i];

            console.log("cursor unbinded");

            child.bind("mouseenter", function () {
                canvas.mouse.cursor("default");
            }).bind("mouseleave", function () {
                canvas.mouse.cursor("default");
            });

            if (child.draggable === true){
                console.log(child + " frozen");
                child.dragAndDrop(false);
            }
        }
    } else if (freezeState === false){
        for (let i = 0; i < arrayLength ; i++){
            var child = canvas.children[i];
            child.dragAndDrop(true);

            child.bind("mouseenter", function () {
                canvas.mouse.cursor("pointer");
            });
        }
    }
}

function getCoordinates(){
    l1 = x2 - x1;
    l2 = y1 - y2;
    l3 = Math.sqrt(((l1 * l1) + (l2 * l2)));
    xmid = (x1+x2)/2;
    ymid = (y1+y2)/2;

    console.log("(x1 y1): " + x1 + " " + y1 + " (x2 y2): " + x2 + y2);
}

//copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

// https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf
function exportCanvas() {

    var canvasElement = document.getElementById("canvas");

    var fileType = "image/png";

    var imgURL = canvasElement.toDataURL("image/png");

    var dlLink = document.createElement('a');
    dlLink.download = "downloadImg";
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [fileType, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}