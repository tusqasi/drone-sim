let W = 720;
let H = 1920;

// Colors
let RED = [255, 0, 0];
let WHITE = [255, 255, 255];
let BLACK = [0, 0, 0];

// Variables
let font;
let _textSize = 60;
let socket;
let connected = false;
function connectWebsocket(url) {
  socket = new WebSocket(url);
  socket.onmessage = function (message) {
    data = JSON.parse(message.data);
  };
  socket.onopen = function () {
    console.log("connected to: " + socket.url);
    socket.send('{"Hi":"from remote"}');
    connected = true;
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
        connectWebsocket(url);
      }, 10000);
    }
  };
  socket.onerror = function (error) {
    console.error(error);
  };
}
connectWebsocket("wss://InsubstantialRosyApplications.tusqasi.repl.co");

function setup() {
  createCanvas(displayWidth, displayHeight);
  // textFont(font);
}
function preload() {
  // font = loadFont("assets/inconsolata.otf");
}
function draw() {
  // rotate(TAU / 4);
  background(255);
  drawButton(200, 500, 300, 40);
  if (mouseIsPressed == true) {
    console.log("to the moon 🚀");
    socket.send(JSON.stringify({ thrust: 1.8 }));
  }
}

function drawButton(posX, posY, r, size) {
  stroke;
  strokeWeight(4);
  circle(posX, posY, r);
  textSize(size);
  text("Thrust", posX - (r * 1) / 4, posY);
}
function touchStarted() {
  socket.send(JSON.stringify({ thrust: 1.8 }));

  return false;
}

function touchEnded() {
  socket.send(JSON.stringify({ thrust: 1.8 }));

  return false;
}
