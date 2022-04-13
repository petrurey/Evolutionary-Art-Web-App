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
        stroke: "5px #fff"
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
    fractMenu.selectedIndex = "selector";
    shapeMenu.selectedIndex = "selector";
}

function freezeShapes(freezeState){
    var arrayLength = canvas.children.length;

    if (freezeState === true){
        for (let i = 0; i < arrayLength ; i++){
            var child = canvas.children[i];
            if (child.draggable === true){
                console.log(child + " frozen");
                child.dragAndDrop(false);
            }
        }
    } else if (freezeState === false){
        for (let i = 0; i < arrayLength ; i++){
            var child = canvas.children[i];
            child.dragAndDrop(true);
        }
    }
}