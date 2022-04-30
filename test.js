// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

// function shapeFractal2(startX, startY, startAngle, n,len,fractAngle){
//     if(n==0){
//         return;
//     }
//     ctx.beginPath();
//     ctx.save();
//         ctx.translate(startX, startY);
//                 ctx.rotate(startAngle * Math.PI/180);
//                 ctx.moveTo(0, 0);
//                 ctx.strokeRect(0,0,-len,-len); 
            
// shapeFractal2(0, -len, fractAngle, n-1, len*0.8,fractAngle);
// ctx.restore();
// }


// function shapeFractal3(startX, startY, angle, len, n){
//     if(n==0){
//      return;
//  }
//      fract = spawnLine(startX, startY, startX+len, startY +len);
//      fract.setOrigin(startX - len*4, startY - len*4);
//      fract.rotate(20);
//      addShape(fract);
     
//      shapeFractal3(startX, startY + len, angle, len * 0.8, n-1);
    
// }

// let number = 0;
// let scale = 10;

// function drawFlower(){
//     let angle = number * 0.4;
//     let radius = scale * Math.sqrt(number);
//     let positionX = radius * Math.sin(angle) + canvas.width/2;
//     let positionY = radius * Math.cos(angle) + canvas.height/2;
//     //canvas.reset();

//     shape = spawnCircle(positionX, positionY, 20);
//     shape.fill = "red";
//     shape.stroke = "3px #28112B";
//     // shape.zIndex = -number;
//     addShape(shape);

//     number ++;
// }

// function animateFlower(){
//     drawFlower();
//     if (number > 500){
//         return;
//     }
//     requestAnimationFrame(animateFlower);
// }

// animateFlower();
