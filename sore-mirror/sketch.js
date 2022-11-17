let W = 700;
let H = 700;
// Colors
let RED = [255, 0, 0];
let WHITE = [255, 255, 255];
let thrust = 2;
let reconnects = 0;
let socket;
let GROUND = W - 200;
let imgSize = 150;
let d = new Drone();
let img;
let GRAVITY = 1; // pixels.s^-2
let OUTSIDE = false;
let sliderThrust;

function connectWebsocket(url) {
    socket = new WebSocket(url);
    socket.onmessage = function (message) {
        data = JSON.parse(message.data);
        if (data.propel != undefined) {
            d.propel(data.propel);
        }
    };
    socket.onopen = function () {
        console.log("connected to: " + socket.url);
        socket.send('{"Hi":"from client"}');
    };
    socket.onclose = function (event) {
        console.log("Connection Closed: ");
        console.log(event);
        reconnects++;
        if (reconnects > 10) {
            console.error("Tried reconnecting {reconnect} times");
        } else {
            console.log("Trying to reconnect");
            setTimeout(function () {
                connectWebsocket("ws://127.0.0.1:6969");
            }, 1000);
        }
    };
    socket.onerror = function (error) {
        console.error(error);
    };
}
connectWebsocket("ws://127.0.0.1:6969");

function setup() {
    // slider = createSlider(0, 360, 60, 40);
    sliderThrust = createSlider(1, 50, 30, 5);
    createCanvas(W, H);
    img.resize(imgSize, 0);
    textFont("Courier New");
    textSize(30);
    // frameRate(10);
}
function preload() {
    img = loadImage("assets/drone2.png");
}
function draw() {
    OUTSIDE = d.position < 0 ? true : false;
    background(OUTSIDE ? RED : WHITE);
    line(0, GROUND + imgSize, W, GROUND + imgSize);
    if (keyIsDown(UP_ARROW)) {
        d.propel(thrust);
    }

    image(img, (W - imgSize) / 2, d.position);
    d.update();
    d.show_stats();
}

function keyPressed() {
    socket.send(JSON.stringify({ event: "message on keypress" }));
}
