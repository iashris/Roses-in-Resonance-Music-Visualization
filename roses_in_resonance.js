// original author : @iashris
// p5js fork author: @rayanfer32
// Updated the code to work in p5js web using chatgpt ofcourse and digging down the rabbit hole of Krister Ess library and its uses, 
// I discovered that p5js natively supports spectrum generation using p5.sound library 
// https://editor.p5js.org/Rayanfer32/sketches/1kcdl_URM

let a = 0;
let loveColors = ["#A61458", "#C92B68", "#F74F70", "#FF939B"];
let harmonyColors = ["#14472C", "#185027", "#3A724A", "#77AA84"];
let peaceColors = ["#2C774E", "#2C8646", "#789C84", "#ECEEEC"];
let myChannel, myFFT;
let spectrum_min = 50;
let spectrum_max = 200;
let theta;
let thetacum = 0;
let dafuq;

let DEBUG_VARIABLES = false

function preload() {
    let audioFile1 =
        "AI_Test_Kitchen_melodic_acoustic_guitar_reverb_latent_music.mp3";
    let audioFile2 =
        "AI_Test_Kitchen_melodic_acoustic_guitar_reverb_latent_music2.mp3";

    let audioFile3 = "piano.wav";
    let audioFile4 = "beethoven5th.wav";
    myChannel = loadSound("./assets/" + audioFile1);

    inconsolata = loadFont("assets/Inconsolata.otf");
}
function setup() {
    createCanvas(600, 600, WEBGL);

    // * reference: https://p5js.org/reference/#/p5.FFT
    myFFT = new p5.FFT();
    myChannel.loop();
    myChannel.amp(0.5);
    background(255);
    textFont(inconsolata);
    textSize(24);

    smoothnessSlider = createSlider(1, 10, 5, 1);
    smoothnessSlider.position(10, 10);
    smoothnessSlider.style('width', '80px');
}

function draw() {
    // * test spectrum
    function testSpectrum() {
        spectrum = myFFT.analyze();
        noStroke();
        fill(loveColors[0]);
        for (let i = 0; i < spectrum.length; i++) {
            let x = map(i, 0, spectrum.length, 0, width);
            let h = -height + map(spectrum[i], 0, 255, height, 0);
            rect(x, height, width / spectrum.length, h);
        }
    }
    // background(255);
    // testSpectrum();
    // * end spectrum test

    strokeWeight(4);

    spectrum = myFFT.analyze();
    theta =
        (spectrum[20] +
            spectrum[60] +
            spectrum[100] +
            spectrum[140] +
            spectrum[180] +
            spectrum[220]) /
        (256 * smoothnessSlider.value());
    thetacum += theta;
    constrainedTheta = constrain(theta, 0.3, 0.4);
    mappedTheta = map(constrainedTheta, 0, 0.4, 0, 3.93);
    strokeColor = loveColors[int(mappedTheta)];

    if (DEBUG_VARIABLES) {
        fill("black");
        translate(-150, -100)
        text(`@theta=${theta}`, 0, 0); // should be always < 1
        text(`@thetacum=${thetacum}`, 0, 30);
        text(`@constrainedTheta=${constrainedTheta}`, 0, 60);
        text(`@mappedTheta=${mappedTheta}`, 0, 90);
        translate(150, 100)
    }

    stroke(color(strokeColor));
    rotateY(cos(thetacum / 40));
    rotateZ(sin(thetacum / 40));
    fill(220, 150);
    box(300 - a * 10);
    a += 0.005;
    if (a > 30) {
        a = 30;
    }


}
