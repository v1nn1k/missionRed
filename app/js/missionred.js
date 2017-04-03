var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

c.width = 500;
c.height = 500;
var WIDTH = c.width;
var HEIGHT = c.height;
var gamerunning = false;
var clientx = 0;
var clienty = 0;
var circles = [];

var failCounter = 0;


circles.push({
    x: 30,
    y: 30,
    r: 30
});
circles.push({
    x: 130,
    y: 120,
    r: 30
});


//______________________________________________________________________

window.onload = function hello() {
    alert('hellooooo');
}


function drawC(x, y, r) {
    ctx.beginPath();
    ctx.fillStyle = "#c82124";
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function draw(elems) {
    for (var i = 0; i < elems.length; i++) {
        drawC(elems[i].x, elems[i].y, elems[i].r);

        window.requestAnimationFrame(draw);
    }

}

function distTwoPoints(x1, x2, y1, y2) {

    var dist1 = 0;
    var s1 = Math.abs(x2 - x1);
    var s2 = Math.abs(y2 - y1);

    s1 = s1 * s1;
    s2 = s2 * s2;

    dist1 = s1 + s2;
    dist1 = Math.sqrt(dist1);

    console.log("dist " + dist1);
    console.log("------------------------------");

    return dist1;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
////////////////////////////////////////////////////////////////////////////////

$('#btnStart').on('click', function() {
    ctx.clearRect(0, 0, c.width, c.height);
    circles = [];
    circles.push({
        x: 30,
        y: 30,
        r: 30
    });
    circles.push({
        x: 130,
        y: 120,
        r: 30
    });





});

$('#myCanvas').on('click', function() {

    coords = c.relMouseCoords(event);
    canvasX = coords.x;
    canvasY = coords.y;

    ctx.clearRect(0, 0, c.width, c.height);
    clientx = parseInt(event.clientX - 378);
    clienty = parseInt(event.clientY - 150);
    console.log("failC " + failCounter);
    console.log("x" + clientx);
    console.log("y" + clienty);
    if (failCounter <= 5) {
        for (var i = 0; i < circles.length - 1; i++) {

            if (distTwoPoints(circles[i].x, canvasX, circles[i].y, canvasY) <= circles[i].r) {

                console.log("dist_click " + distTwoPoints(circles[i].x, clientx, circles[i].y, clienty));
                console.log("r_click " + circles[i].r);
                circles.splice(i, 1);

                draw(circles);
                console.log("c.length " + circles.length)
                console.log('%c matched: ' + i, 'background: #222; color: #bada55');
                break;

            }

            circles[i].r += 5;
        }
        circles.push({
            x: randomIntFromInterval(10, 390),
            y: randomIntFromInterval(10, 390),
            r: 20
        });
        draw(circles);


    } else {
        alert("GAME OVERRRRR");
    }







});





function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {
        x: canvasX,
        y: canvasY
    }
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;