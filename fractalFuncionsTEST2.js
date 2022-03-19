// var myCanvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

//original fractal function
function draw(startX,startY,len,angle){
    ctx.beginPath();
    ctx.save();

    ctx.translate(startX, startY);
        ctx.rotate(angle * Math.PI/180);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -len);
        ctx.stroke();

        if(len < 20) {
            ctx.restore();
            return;
        }

        //draw(0, -len, len*0.8, -20);
        draw(0, -len, len*0.8, +0);
        //draw(0, -len, len*0.8, +20);

        ctx.restore();

}
//draw(100, 100, 100, 135)



// fractalFromPoint function
// startX = X coordinate of fractal start
// startY = Y coordinate of fractal start
// angle = original direction that the fractal starts towards
// n = number of iterations for the fractal
// len = side length for shape
//fractAngle = angle at which the fractal iterates

function fractalFromPoint(startX, startY, startAngle, n,len,fractAngle){
    if(n==0){
        return;
    }
    ctx.beginPath();
    ctx.save();
        ctx.translate(startX, startY);
                ctx.rotate(startAngle * Math.PI/180);
                ctx.moveTo(0, 0);
                ctx.strokeRect(0,0,-len,-len); 
                console.log(startX, startY);
                console.log(startAngle);
                console.log(fractAngle);
                ctx.lineTo(0, -len);
                ctx.stroke();
            
                fractalFromPoint(0, -len, fractAngle, n-1, len*0.8,fractAngle);
                
        
            ctx.restore();
    
}

//fractalFromPoint(100,100,10,10,100,10);





