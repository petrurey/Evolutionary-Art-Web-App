const button1 = document.querySelector('.button1');
var state = false;

button1.addEventListener('click',() => {
    button1.classList.toggle('active');
    shape = undefined;                                  // initializing global variable "shape" as undefined so switch can catch

    if (state == true){                                 //true state unbinds the mouseup & mousedown and allows user to stop drawing
        canvas.unbind("mousedown", downHandler);        //and go back to dragging / manipulation of current shapes
        canvas.unbind("mouseup", upHandlerFract);

        $("#fractal-label").hide();                       // hide shape-lebel & shape-menu when drawing is not engaged
        $("#fractal-menu").hide();
        $("#shape-label").hide();                       // hide shape-lebel & shape-menu when drawing is not engaged
        $("#shape-menu").hide();

        shapeMenuReset();

        state = false;
        return;
    }

    if (state == false){                                //falase state allows user to draw new shapes 
        state = true;
        canvas.bind("mousedown", downHandler);
        canvas.bind("mouseup", upHandlerFract);

        $("#fractal-label").show();                       // show shape-lebel & shape-menu when drawing is engaged
        $("#fractal-menu").show();

        return;
    }
});

function squareFract(startX, startY, len, n){
        fract = spawnSquare(startX-x1, startY-y1, len, len);

        getShapeAttributes();

        fract.fill = shapeColor;
        fract.strokeWidth = strokeVar;
        fract.strokeColor = strokeCol;

        if(n==0){
            return;
        }

        fractParent.addChild(fract);

        squareFract(startX + len, startY + len, len * 0.8, n-1);

}

function circleFract(startX, startY, len, n){
    fract = spawnCircle(startX-x1, startY-y1, len);

    getShapeAttributes();

    fract.fill = shapeColor;
    fract.strokeWidth = strokeVar;
    fract.strokeColor = strokeCol;

    if(n==0){
        return;
    }

    fractParent.addChild(fract);

    circleFract(startX + len, startY + len, len * 0.8, n-1);

}

function lineFract(startX, startY, endX, endY, n){
    fract = spawnLine(startX-x1, startY-y1, endX, endY);

    getShapeAttributes();

    fract.fill = shapeColor;
    fract.strokeWidth = strokeVar;
    fract.strokeColor = strokeCol;

    if(n==0){
        return;
    }

    fractParent.addChild(fract);

    lineFract(startX + endX, startY + endY, endX + endX * 0.8, endY + endY * 0.8, n-1);

}



function upHandlerFract(){
    x2 = canvas.mouse.x;
    y2 = canvas.mouse.y;
    fractDraw();
}

function getFractName(fract){
    fract = fract.value;
    console.log(fract);
        if(fract === "shape fractals"){
            $("#shape-label").toggle();                       // show shape-lebel & shape-menu when drawing is engaged
            $("#shape-menu").toggle();
        } 
    return fract;
}

function calculateAlpha(){
    l1 = x2 - x1;
    l2 = y1 - y2;
    l3 = Math.sqrt(((l1 * l1) + (l2 * l2)));
    xmid = (x1+x2)/2;
    ymid = (y1+y2)/2;

    alpha = (Math.asin(l1/l3)) * (180/Math.PI);
    if (x1 < x2 && y1 < y2){
        alpha = 180 - alpha;
    } else if (x1 > x2 && y1 < y2){
        alpha = 180 + Math.abs(alpha);
    } else if ( x1 > x2 && y1 > y2){
        alpha = 360 - Math.abs(alpha);
    }
    return alpha;
}

function fractDraw(){

    calculateAlpha();

    switch(shape) {
        case "square":
            fractParent = spawnSquare(x2, y2, l3, l3);
            fractParent.rotate(alpha);
            squareFract(x1, y1, l3, 3);
        break;

        case "circle":
            fractParent = spawnCircle(xmid, ymid, l3/2);
            fractParent.rotate(alpha);
            circleFract(x1, y1, l3/2, 3);
        break;

        case "line":
            fractParent = spawnLine(x1, y1, x2, y2);
            // line.strokeWidth = strokeVar;
            // line.strokeColor = shapeColor;
            lineFract(x1, y1, x2, y2, 3);
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
    addShape(fractParent);
}




// addChild() TESTING BELOW

// var box  = canvas.display.rectangle({ 
//     x: 300, 
//     y: 300, 
//     width: 50, 
//     height: 50, 
//     fill: "#000"
// });


// var square  = canvas.display.rectangle({ x: 100, y: 100, width: 100, height: 100, fill: "#990000"});
// var circle = canvas.display.arc({  //define first arc (circle)
//     x: 400,
//     y: 100,
//     radius: 100,
//     start: 0,
//     end: 360,
//     fill: "#772014",
//     pieSection: false,  //can be used to cut circle as for pie chart
//     stroke: "5px #fff"
// });
// box.addChild(square);
// box.addChild(circle);
// addShape(box);
