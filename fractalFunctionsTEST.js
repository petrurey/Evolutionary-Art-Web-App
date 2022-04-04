function makeFractal(startX, startY, angle, len, n){
       if(n==0){
        return;
    }
        //fract = makeLine(startX, startY, startX, startY +len);
        fract = spawnSquare(startX, startY, len);
        //addShape(fract);
        fract.setOrigin(startX - len*4, startY - len*4);
        //fract.rotate(20);
        //fract.moveTo(fract.end.x, fract.end.y);
        //fract.moveTo(startX, startY);
        //fract.rotate(20);
        addShape(fract);
        
        //fract.moveTo(startX + len, startX +len);

        var origin = fract.getOrigin();
        console.log('origin: ', origin);
        console.log("start coordinates: ", startX, startY);
        //console.log("fract start", fract.start.x, fract.start.y);
        console.log("end coordinates: ", startX + len, startX +len);
        //console.log("end2 coordinates: ", fract.end.x, fract.end.y);
        
        console.log("n: ",n);

        makeFractal(startX, startY + len, angle, len * 0.8, n-1);
        
        //makeFractal(0, -len, angle, n-1, len*0.8)
}

function makeFractal2(startX, startY, angle, len, n){
    if(n==0){
        return;
    }
        fract = spawnLine(startX, startY, startX, startY +len);
        //fract = makeSquare(startX, startY, len);
        //addShape(fract);
        fract.setOrigin(startX - len*4, startY - len*4);
        //fract.rotate(20);
        //fract.moveTo(fract.end.x, fract.end.y);
        //fract.moveTo(startX, startY);
        //fract.rotate(20);
        addShape(fract);
        
        //fract.moveTo(startX + len, startX +len);

        var origin = fract.getOrigin();
        console.log('origin: ', origin);
        console.log("start coordinates: ", startX, startY);
        //console.log("fract start", fract.start.x, fract.start.y);
        console.log("end coordinates: ", startX + len, startX +len);
        //console.log("end2 coordinates: ", fract.end.x, fract.end.y);
        
        console.log("n: ",n);

        makeFractal(startX, startY + len, angle, len * 0.8, n-1);
        
        //makeFractal(0, -len, angle, n-1, len*0.8)
}


function makeFractal3(startX, startY, len, n){
    console.log(n);
    if(n==0){
        return;
    }
        fract = spawnSquare(startX, startY, len, len);
        addShape(fract);
 
        makeFractal3(startX + len, startY + len, len * 0.8, n-1);
        makeFractal3(startX + len*0.3, startY + len*0.3, len * 0.5, n-1);
}


// function makeFractal4(startX, startY, len, n, shape){
//     //console.log(n);
//     //console.log(shape.shapeType);
//     if(n==0){
//         return;
//     }

//     if (shape.shapeType = "radial"){
//         shape.start.x = startX;
//         shape.start.y = startX;
//         shape.end.x = startX + len;
//         shape.end.y = startX + len;
//         addShape(shape);
//         //console.log(n);
//         console.log(shape.shapeType);
//     }
//         shape.x = startX;
//         shape.y = startY;
//         shape.r
//         //addShape(fract);
//         makeFractal4(startX + len, startY + len, len * 0.8, n-1, shape);
//         //makeFractal3(startX + len*0.3, startY + len*0.3, len * 0.5, n-1);
// }