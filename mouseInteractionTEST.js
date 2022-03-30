var text = canvas.display.text({
    x: 177,
    y: 196,
    origin: { x: "center", y: "center" },
    align: "center",
    font: "bold 25px/1.5 sans-serif",
    text: "Press mouse",
    fill: "#000"
});

canvas.addChild(text);



function coordinatePrint(){
    l1 = x1 - x2;
    l2 = y2 - y1;
    l3 = Math.sqrt(((l1 * l1) + (l2 * l2)));
    xmid = (x1+x2)/2;
    ymid = (y1+y2)/2;
    console.log(l3);
    var shape = spawnCircle(xmid,ymid,l3/2);
    addShape(shape);
}


const button3 = document.querySelector('.button3');
var state = 0;
    
button3.addEventListener('click',() => {
    button3.classList.toggle('active');
    console.log(state);
    if (state === 1){
        canvas.unbind("mouseup");
        canvas.unbind("mousdown");
        state--;
        return;
    } else if (state === 0){
        canvas.timeline.start();

        canvas.bind("mouseup", function up () {
            text.text = "up: " + canvas.mouse.x;
            x1 = canvas.mouse.x;
            y1 = canvas.mouse.y;
            console.log("mouseup");
            if (typeof(x1) == "undefined"){
                return;
            } else {
                console.log("print");
                coordinatePrint();
            }
        });
    
        canvas.bind("mousedown", function down () {
            text.text = "down"
            x2 = canvas.mouse.x;
            y2 = canvas.mouse.y;
            console.log("mousedown");
    
        });


        console.log(state);
        state++;
        return;
    }
});
