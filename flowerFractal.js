let number = 0;
let scale = 10;

function drawFlower(){
    let angle = number * 0.3;
    let radius = scale * Math.sqrt(number);
    let positionX = radius * Math.sin(angle) + canvas.width/2;
    let positionY = radius * Math.cos(angle) + canvas.height/2;
    //canvas.reset();

    shape = spawnCircle(positionX, positionY, 20);
    shape.fill = "";
    shape.stroke = "1px black";
    // shape.zIndex = -number;
    addShape(shape);

    number ++;
}

function animateFlower(){
    drawFlower();
    if (number > 500){
        return;
    }
    requestAnimationFrame(animateFlower);
}