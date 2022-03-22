//function to spawn circles
function spawnCircle(x, y, r){
    var circle = canvas.display.arc({  //define first arc (circle)
        x: x,
        y: y,
        radius: r,
        start: 0,
        end: 360,
        fill: "#772014",
        pieSection: false,  //can be used to cut circle as for pie chart
        stroke: "5px #080"
    });
    return circle;
}

//function to spawn images
function spawnImage(x , y){
    var image = canvas.display.image({
        x: x,
        y: y,
        origin: { x: "center", y: "center" },
        image: "/Users/petrurey/Desktop/1542984793603.jpeg"
    });
    return image;
}

//function to spawn squares
function spawnSquare(x, y, r){
    var square = canvas.display.rectangle({ 
        x: x,
        y: y,
        height: r,
        width: r,
        fill: "#18a",
        stroke: "5px #080"
    });
    return square;
}

// line function
function spawnLine(startX, startY, endX, endY){
    var line = canvas.display.line({
        start: {x: startX, y: startY},
        end: {x: endX, y: endY},
        stroke: "10px #363635",
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
        fill: "#18a"
    });
    return poly;
}

// gets selected shape from HTML drop-down menu and stores it as value for use in other functions
// displays any hidden shape-specific menus when that shape is selected in drop-down
function getSelectShape(selectedShape){
    shape = selectedShape.value;

        $("#line-settings").hide();
        $("#poly-settings").hide();

        if(shape === "line"){
            $("#line-settings").show();
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

//output shape to canvas based on shape selected in drop down meny & any aditional menu variables (like stroke & color)
function outputShape(){
    let shapeColor = document.getElementById('color').value;
    let strokeVar = Number(document.getElementById('stroke').value);
    let polySides = Number(document.getElementById('poly-sides').value);
    console.log(polySides);
    
    switch(shape) {
        case "square":
            var square = spawnSquare(200, 200, 100);
            square.fill = shapeColor;
            square.strokeWidth = strokeVar;
            addShape(square);
        break;

        case "circle":
            var circle = spawnCircle(500, 500, 100);
            circle.fill = shapeColor;
            circle.strokeWidth = strokeVar;
            addShape(circle);
        break;

        case "line":
            var line = spawnLine(200, 200, 300, 300);
            console.log(line);
            line.strokeWidth = strokeVar;  //hard coded stroke width
            line.strokeColor = shapeColor;
            addShape(line);
        break;

        case "polygon":
            var poly = spawnPoly(500, 500, 3, 100);
            poly.fill = shapeColor;
            poly.strokeWidth = strokeVar;
            poly.sides = polySides;
            addShape(poly);
        break;


        default:
            console.log("please return valid shape parameters");
    }
}

// function makeFractal4(startX, startY, len, n){
//     if(n==0){
//         return;
//     }

//     if (shape == "line"){
//         console.log(shape);
//         var newShape = makeLine(100,100,200,200);
//         newShape.start.x = startX;
//         newShape.start.y = startX;
//         newShape.end.x = startX + len;
//         newShape.end.y = startX + len;
//         //rotateShape(shape);
//         addShape(newShape);
//     }
//         makeFractal4(startX + len, startY + len, len * 0.8, n-1);
//         //makeFractal3(startX + len*0.3, startY + len*0.3, len * 0.5, n-1);
// }