window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    //resizing
    //canvas.height = window.innerHeight;
    //canvas.width = window.innerWidth;


    //two sided shapes
    // ctx.fillRect(100,100,200,200) //(x,y,height,width)
    ctx.strokeStyle = "black"; //color for next shape
    ctx.strokeRect(50,50,200,200) //stroke for hollow shapes

    // //drawing line
    // ctx.beginPath();
    // ctx.moveTo(500,500); //moves pen without drawing line
    // ctx.lineTo(400,400); 
    // ctx.lineTo(500,400);
    // ctx.closePath(); //draws connecting line between two other lines
    // ctx.stroke();


    //variables
    let painting = false;

    function startPosition(e){
        painting = true;
        draw(e); //allows dots to be drawn, otherwise ragging is needed for drawing
    }

    function endPosition(){
        painting = false;
        ctx.beginPath(); // allows for more discontinued lines to be drawn
    }

    function draw(e){
        if(!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();                    //makes line smoother
        ctx.moveTo(e.clientX, e.clientY);   //makes lines smoother
    }

    //EventListeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    
});
