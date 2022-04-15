//function used to calculate the length of the line in between the point there the mouse is clicked and the mouse is let go 
// (in between mousedown and mouseup)
function getShapeAttributes(){
    shapeColor = document.getElementById('color').value;
    strokeVar = Number(document.getElementById('stroke-width').value);
    polySides = Number(document.getElementById('poly-sides').value);
    strokeCol = document.getElementById('stroke-color').value;
};

function calculateSquare(){
    
    if (x1 < x2 && y1 > y2){

        var square = spawnSquare(x1, y1, l2, l1);
        square.setOrigin("left", "bottom");

    } else if (x1 < x2 && y1 < y2){

        var square = spawnSquare(x1, y1, l2, l1);

    } else if (x1 > x2 && y1 < y2){

        var square = spawnSquare(x2, y2, l2, l1);
        square.setOrigin("left", "bottom");

    } else if ( x1 > x2 && y1 > y2){
    
        var square = spawnSquare(x2, y2, l2, l1);
    }

    return square;
}

function coordinatePrint(){
    getCoordinates();

    l2 = Math.abs(l2);
    l1 = Math.abs(l1);

    getShapeAttributes();

    switch(shape) {
        case "rectangle":
            square = calculateSquare();

            if(x1 === x2 || y1 === y2){
                window.alert("please drag the mouse to create a rectangle");
                return;
            }

            square.fill = shapeColor;
            square.strokeWidth = strokeVar;
            square.strokeColor = strokeCol;
            addShape(square);

        break;

        case "circle":
            var circle = spawnCircle(xmid, ymid, l3/2);
            circle.fill = shapeColor;
            circle.strokeWidth = strokeVar;
            circle.strokeColor = strokeCol;
            addShape(circle);
        break;

        case "line":
            var line = spawnLine(x1, y1, x2, y2);
            line.strokeWidth = strokeVar;
            line.strokeColor = shapeColor;
            addShape(line);
        break;

        case "polygon":
            console.log("poly selected");
            var poly = spawnPoly(xmid, ymid, 3, l3/2);
            poly.fill = shapeColor;
            poly.strokeWidth = strokeVar;
            poly.sides = polySides;
            poly.strokeColor = strokeCol;
            addShape(poly);
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
    console.log(canvas.children);
}

// Handles the fetching of coordinates and printing of object once mouse is up
function upHandlerShape(){
    x2 = canvas.mouse.x;
    y2 = canvas.mouse.y;

    coordinatePrint();
    freezeShapes(true);
}

// Handles the fetching of coordinates once mouse is down
function downHandler(){
    x1 = canvas.mouse.x;
    y1 = canvas.mouse.y;
}

// makes mouseup & mousedown carry out the functionality described in upHandler & downHandler respectively
function interactiveDraw(){
        canvas.bind("mousedown", downHandler);
        canvas.bind("mouseup", upHandlerShape);
}

//button constant so it can be toggled as active
const button3 = document.querySelector('.button2');
var state = true;
    
button3.addEventListener('click',() => {
    if (button1.classList.contains("active")){
        window.alert("please unclick any other drawing buttons");
        return;
    }

    button3.classList.toggle('active');
    shape = undefined;

    if (state == false){                                 //true state unbinds the mouseup & mousedown and allows user to stop drawing
        canvas.unbind("mousedown", downHandler);        //and go back to dragging / manipulation of current shapes
        canvas.unbind("mouseup", upHandlerShape);
        $("#shape-settings").hide(); 
        $("#shape-menu").hide();  
        console.log("unclicked")                    
        menuReset();
        freezeShapes(state);
        state = true;
    } else if (state == true){                                //falase state allows user to draw new shapes 
        $("#shape-settings").show();                      // show shape-lebel & shape-menu when drawing is engaged
        interactiveDraw();
        freezeShapes(state);     
        state = false;
    }
});
