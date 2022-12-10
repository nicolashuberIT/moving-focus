// --- variables ---

let vectors = [];
const num = 25000;
var noiseScale = 0.02;
var noiseScale2 = 1;
var velocity = 2;

// dimensions

var Width = window.innerWidth;
var Height = window.innerHeight;

displayValues();

// --- colours ---

var color_hex = "#7D968F";

var strokeR = 125;
var strokeG = 150;
var strokeB = 143;

// user input

function getInput(){
   getVelocity();
   getNoise();
   getNoise2();
   displayValues()
   draw();
}

function getVelocity(){
    velocity = document.getElementById('velocity_value').textContent;
    return velocity;
}

function getNoise(){
    noiseScale = document.getElementById('noiseScale_value').textContent;
    return noiseScale;
}

function getNoise2(){
    noiseScale2 = document.getElementById('noiseScale_value2').textContent;
    return noiseScale2;
}


// --- setup ---

function setup() {
    createCanvas(Width, Height);
    for(let i = 0; i < num; i ++) {
        vectors.push(createVector(random(width), random(height)));
    }
    stroke(color_hex);
}

// --- draw vectors ---

function draw() {
    background(0, 10);
    for(let i = 0; i < num; i ++) {
        let k = vectors[i];
        point(k.x, k.y);
        let n = noise(k.x * noiseScale, k.y * noiseScale, frameCount * noiseScale * noiseScale);
        let a = TAU * n;
        k.x += cos(a)*velocity;
        k.y += sin(a)*velocity*noiseScale2;

        if(!onScreen(k)) {
            k.x = Width;
            k.y = randomIntFromInterval(0, Width);
        }
    }
}

// --- mouseReleased ---

function randomChange() {
    draw();
    noiseSeed(millis()*sin(velocity));
}

// --- onScreen ---

function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

// --- interval ---

var intervalID = window.setInterval(randomChange, 60000);

// --- random integer value ---

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// display values in html

function displayValues() {
    document.getElementById("width").textContent = "Breite " + Width + " px";
    document.getElementById("height").textContent = "Höhe " + Height + " px";
    document.getElementById("num").textContent = "Anzahl Vektoren: " + num;
    document.getElementById("color").textContent = "Farbe (hex): " + color_hex;
    document.getElementById("noiseScale").textContent = "Störfaktor 1: " + getNoise();
    document.getElementById("noiseScale2").textContent = "Störfaktor 2: " + getNoise2();
    document.getElementById("velocity").textContent = "Geschwindigkeit: " + getVelocity();
}