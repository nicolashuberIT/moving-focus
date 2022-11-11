// --- variables ---

let vectors = [];
const num = 15000;
const noiseScale = 0.04;
const velocity = 3;

// display

var Width = window.innerWidth;
var Height = window.innerHeight;

// --- colours ---

var strokeR = 125;
var strokeG = 150;
var strokeB = 143;


// --- setup ---

function setup() {
    createCanvas(Width, Height);
    for(let i = 0; i < num; i ++) {
        vectors.push(createVector(random(width), random(height)));
    }
    stroke(strokeR, strokeG, strokeB);
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
        k.y += sin(a)*velocity;

        if(!onScreen(k)) {
            k.x = Width;
            k.y = randomIntFromInterval(0, Width);
        }
    }
}

// --- mouseReleased ---

function mouseReleased() {
    draw();
    noiseSeed(millis()*sin(velocity));
}

// --- onScreen ---

function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

// --- interval ---

var intervalID = window.setInterval(mouseReleased, 10290);

// --- random integer value ---

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 10290