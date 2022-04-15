let number = 0;
let zNumber = 0;
let random = Math.random();
randomVals = true;


function getFlowerMenu(status){
    randomVals = status.checked;

    $("#flower-settings").toggle();
    console.log(randomVals);

    return randomVals;
}

function downHandlerFlower(){
    selectedShape = document.getElementById("shape-drop-down").value;
    if (selectedShape === "selector"){
        window.alert("please return a shape");
        console.log("please return a shape");
        return;
    }

    if (randomVals === true){
        petalSize = getRandomInt(1,20);
        scale = getRandomInt(1,20);
        petalAngle = getRandomInt(1,100)/100;
    }

    animateFlower()
}

function unbindFlower(){
    canvas.unbind("dblclick", downHandlerFlower);
}

function bindFlower(){
    canvas.bind("dblclick", downHandlerFlower);
}

function drawFlower(){

    let angle = number * petalAngle;
    let radius = scale * Math.sqrt(number);
    positionX = radius * Math.sin(angle);
    positionY = radius * Math.cos(angle);

    if (number === 0){
        parentShape = spawnCircle(600, 300, petalSize);
        addShape(parentShape);
    }

    getShape();

    addShapeFlower(childShape);

    freezeShapes(true); 

    number ++;
}

function animateFlower(){
    if (randomVals === false){
        petalSize = document.getElementById('petal').value;
        scale = document.getElementById('scale').value;
        petalAngle = (document.getElementById('angle').value / 100);
    }

    selectedShape = document.getElementById("shape-drop-down").value;
    iterN = Number(document.getElementById('iter-input').value);

    if (selectedShape === "selector"){
        window.alert("please return a shape");
        console.log("please return a shape");
        return;
    }

    drawFlower();

    if (number > iterN){
        random = Math.random();
        number = 0;
        return;
    }
    requestAnimationFrame(animateFlower);
}

function addShapeFlower(shape){
    parentShape.addChildAt(shape, zNumber);
    zNumber -= 1
}

function getShape(){

    getShapeAttributes();

    switch(shape) {
        case "rectangle":
            childShape = spawnSquare(positionX , positionY, petalSize, petalSize);
            childShape.fill = shapeColor;
            childShape.strokeWidth = strokeVar;
            childShape.strokeColor = strokeCol;
        break;

        case "circle":
            childShape = spawnCircle(positionX , positionY, petalSize);
            childShape.fill = shapeColor;
            childShape.strokeWidth = strokeVar;
            childShape.strokeColor = strokeCol;
        break;

        case "line":
            childShape = spawnLine(positionX , positionY,positionX - petalSize, positionY - petalSize);
            childShape.strokeWidth = strokeVar;
            childShape.strokeColor = strokeCol;
        break;

        case "polygon":
            childShape = spawnPoly(positionX , positionY, 3, petalSize);
            childShape.fill = shapeColor;
            childShape.strokeWidth = strokeVar;
            childShape.strokeColor = strokeCol;
            childShape.sides = polySides;
        break;

        case undefined:
            childShape = null;
        break;

        default:
            childShape = null;
        break;
    }
    return childShape;
}