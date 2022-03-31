// text element used to test initial functionality of mouseup / mousedown & x/y coordinates of pointer
var text = canvas.display.text({
    x: 177,
    y: 196,
    origin: { x: "center", y: "center" },
    align: "center",
    font: "bold 25px/1.5 sans-serif",
    text: "Press mouse",
    fill: "#000"
});

//adding text element to canvas
canvas.addChild(text);

//function used to calculate the length of the line in between the point there the mouse is clicked and the mouse is let go 
// (in between mousedown and mouseup)
function coordinatePrint(){
    l1 = x1 - x2;
    l2 = y2 - y1;
    l3 = Math.sqrt(((l1 * l1) + (l2 * l2)));
    xmid = (x1+x2)/2;
    ymid = (y1+y2)/2;
    var shape = spawnCircle(xmid,ymid,l3/2);    // currently has a hard coded circle shape spawninig for testing
    addShape(shape);
}

// Handles the fetching of coordinates and printing of object once mouse is up
function upHandler(){
    text.text = "up: " + canvas.mouse.x;
    x1 = canvas.mouse.x;
    y1 = canvas.mouse.y;
    console.log("mouseup");
    coordinatePrint();
}

// Handles the fetching of coordinates once mouse is down
function downHandler(){
    text.text = "down"
    x2 = canvas.mouse.x;
    y2 = canvas.mouse.y;
    console.log("mousedown");
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
    console.log(state);

    if (state == true){                                 //true state unbinds the mouseup & mousedown and allows user to stop drawing shapes
        console.log(state + " unbinded");               //and go back to dragging / manipulation of current shapes
        canvas.unbind("mousedown", downHandler);
        canvas.unbind("mouseup", upHandler);
        state = false;
        return;
    }

    if (state == false){                                //falase state allows user to draw new shapes 
        state = true;
        interactiveDraw();
        console.log(state);
        return;
    }
});
