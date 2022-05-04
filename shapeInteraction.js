/* @author Petru Rey 
*  @date 2 May 2022
*/

//spawn rectangle based on quadrant
function calculateRect() {
  if (x1 < x2 && y1 > y2) {
    var rect = spawnRect(x1, y1, l2, l1);
    rect.setOrigin("left", "bottom");
  } else if (x1 < x2 && y1 < y2) {
    var rect = spawnRect(x1, y1, l2, l1);
  } else if (x1 > x2 && y1 < y2) {
    var rect = spawnRect(x2, y2, l2, l1);
    rect.setOrigin("left", "bottom");
  } else if (x1 > x2 && y1 > y2) {
    var rect = spawnRect(x2, y2, l2, l1);
  }
  return rect;
}

function getShape(){
    getCoordinates();

    l2 = Math.abs(l2);
    l1 = Math.abs(l1);

    getShapeAttributes();

    switch(shape) {
        case "rectangle":
            rect = calculateRect();

            if(x1 === x2 || y1 === y2){
                window.alert("please drag the mouse to create a rectangle");
                return;
            }

            rect.fill = shapeColor;
            rect.strokeWidth = strokeVar;
            rect.strokeColor = strokeCol;
            addShape(rect);

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

// prints shape and freezez shapes at mouse-up
function upHandlerShape(){
    x2 = canvas.mouse.x;
    y2 = canvas.mouse.y;

    getShape();

    freezeShapes(true);
}

function bindMouseShape(){
        canvas.bind("mousedown", downHandler);
        canvas.bind("mouseup", upHandlerShape);
}

//button constant so it can be toggled as active
const button3 = document.querySelector('.button2');
    
button3.addEventListener('click',() => {
    if (button1.classList.contains("active")){
        window.alert("please unclick any other drawing buttons");
        return;
    }

    button3.classList.toggle('active');
    shape = undefined;

    if (state == false){                               
        canvas.unbind("mousedown", downHandler);      
        canvas.unbind("mouseup", upHandlerShape); 

        hideForms();
        resetForms();

        freezeShapes(state);

        state = true;
    } else if (state == true){       

        $("#shape-settings").show();    

        bindMouseShape();

        freezeShapes(state);   
          
        state = false;
    }
});
