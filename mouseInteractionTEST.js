//function used to calculate the length of the line in between the point there the mouse is clicked and the mouse is let go 
// (in between mousedown and mouseup)
function coordinatePrint(){
    l1 = x1 - x2;
    l2 = y2 - y1;
    l3 = Math.sqrt(((l1 * l1) + (l2 * l2)));
    xmid = (x1+x2)/2;
    ymid = (y1+y2)/2;

    let shapeColor = document.getElementById('color').value;
    let strokeVar = Number(document.getElementById('stroke-width').value);
    let polySides = Number(document.getElementById('poly-sides').value);
    let strokeCol = document.getElementById('stroke-color').value;
    
    switch(shape) {
        case "square":
            var square = spawnSquare(x2, y2, l2, l1);
            square.setOrigin("left", "bottom");
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
            var line = spawnLine(x2, y2, x1, y1);
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
}

// Handles the fetching of coordinates and printing of object once mouse is up
function upHandler(){
    x1 = canvas.mouse.x;
    y1 = canvas.mouse.y;
    coordinatePrint();
}

// Handles the fetching of coordinates once mouse is down
function downHandler(){
    x2 = canvas.mouse.x;
    y2 = canvas.mouse.y;
}

// makes mouseup & mousedown carry out the functionality described in upHandler & downHandler respectively
function interactiveDraw(){
        canvas.bind("mousedown", downHandler);
        canvas.bind("mouseup", upHandler);
}

//button constant so it can be toggled as active
const button3 = document.querySelector('.button3');
var state = false;
    
button3.addEventListener('click',() => {
    button3.classList.toggle('active');
    shape = undefined;                                  // initializing global variable "shape" as undefined so switch statement in coordinatePrint                                                    
                                                        // can catch catch it if "drawing" is started before selecting a shape

    if (state == true){                                 //true state unbinds the mouseup & mousedown and allows user to stop drawing shapes 
        canvas.unbind("mousedown", downHandler);        //and go back to dragging / manipulation of current shapes
        canvas.unbind("mouseup", upHandler);
        $("#shape-label").hide();                       // hide shape-lebel & shape-menu when drawing is not engaged
        $("#shape-menu").hide();
        state = false;
        return;
    }

    if (state == false){                                //falase state allows user to draw new shapes 
        state = true;
        $("#shape-label").show();                       // show shape-lebel & shape-menu when drawing is engaged
        $("#shape-menu").show();
        interactiveDraw();
        return;
    }
});
