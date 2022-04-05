let number = 0;
let scale = 10;
zNumber = 100

function drawFlower(){
    let angle = number * 0.5;
    let radius = scale * Math.sqrt(number);
    let positionX = radius * Math.sin(angle) + canvas.width/2;
    let positionY = radius * Math.cos(angle) + canvas.height/2;
    //canvas.reset();

    shape = spawnCircle(positionX, positionY, 20);
    shape.fill = "red";
    shape.stroke = "1px black";
    // shape.zIndex = -number;
    addShapeFlower(shape);

    number ++;
}

function animateFlower(){
    drawFlower();
    if (number > 500){
        return;
    }
    requestAnimationFrame(animateFlower);
}

function addShapeFlower(shape){
    canvas.addChildAt(shape, zNumber);
    console.log(number);
    var dragOptions = { changeZindex: true };
    shape.dragAndDrop(dragOptions);
    zNumber -= 1
    console.log(number);
}