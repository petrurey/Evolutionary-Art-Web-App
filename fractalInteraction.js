const button1 = document.querySelector('.button1');
var state = false;

button1.addEventListener('click',() => {
    if (button3.classList.contains("active")){
        window.alert("please unclick any other drawing buttons");
        return;
    }

    button1.classList.toggle('active');
    shape = undefined;                                  // initializing global variable "shape" as undefined so switch can catch

    if (state === true){            
        console.log("unbinded");                     //true state unbinds the mouseup & mousedown and allows user to stop drawing
        unbindFlower();
        unbindFract();

        freezeShapes(false);

        $("#fractal-label").hide();                       // hide shape-lebel & shape-menu when drawing is not engaged
        $("#fractal-menu").hide();
        $("#shape-settings").hide();
        $("#shape-menu").hide();                       
        $("#iter-label").hide();
        $("#flower-settings").hide();

        menuReset();

        state = false;
        return;
    }

    if (state === false){     
        
        freezeShapes(true);  

        $("#fractal-label").show();                       // show shape-lebel & shape-menu when drawing is engaged
        $("#fractal-menu").show();  

        state = true;

        return;
    }
});

function bindFract(){
    canvas.bind("mousedown", downHandler);
    canvas.bind("mouseup", upHandlerFract);
}

function unbindFract(){
    canvas.unbind("mousedown", downHandler);        //and go back to dragging / manipulation of current shapes
    canvas.unbind("mouseup", upHandlerFract);
}


function upHandlerFract(){
    x2 = canvas.mouse.x;
    y2 = canvas.mouse.y;
    fractDraw();
    freezeShapes(true);
}

function getFractName(fract){
    fract = fract.value;
    $("#iter-label").hide();
    $("#flower-settings").hide();
        if (fract === "selector"){
            unbindFlower();
            unbindFract();
        } else if(fract === "shape fractals"){

            $("#shape-settings").show();                       // show shape-lebel & shape-menu when drawing is engaged
            $("#iter-label").show();

            unbindFlower();
            bindFract();

        } else if (fract === "trigonometric flower"){

            unbindFract();
            bindFlower();

            $(".button3").show();
            $("#shape-settings").show();
            $("#iter-label").show();
            $("#random-check").show();

        }
    return fract;
}

function calculateAlpha(){
    getCoordinates();

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
    iterN = Number(document.getElementById('iter-input').value);

    if (iterN > 25){
        iterN  = 25;
    }

    calculateAlpha();

    switch(shape) {
        case "square":
            fractParent = spawnSquare(x2, y2, l3, l3);
            fractParent.rotate(alpha);
            squareFract(x1, y1, l3, iterN);
            addShape(fractParent);
        break;

        case "circle":
            fractParent = spawnCircle(xmid, ymid, l3/2);
            fractParent.rotate(alpha);
            circleFract(x1, y1, l3/2, iterN);
            addShape(fractParent);
        break;

        case "line":
            fractParent = spawnLine(x1, y1, x2, y2);
            // line.strokeWidth = strokeVar;
            // line.strokeColor = shapeColor;
            lineFract(x1, y1, x2, y2, iterN);
        break;

        case "polygon":
            fractParent = spawnPoly(xmid, ymid, 3, l3/2);
            fractParent.rotate(alpha);
            polyFract(x1, y1, 3, l3/2, iterN);
            addShape(fractParent);
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

