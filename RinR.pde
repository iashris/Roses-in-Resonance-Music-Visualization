//Ashris Choudhury
float a=0;
color[] Love={#A61458,#C92B68,#F74F70,#FF939B};
import krister.Ess.*;
AudioChannel myChannel;
FFT myFFT;
int spectrum_min=50;
int spectrum_max=200;
float theta,thetacum;
int dafuq;
void setup(){
size(600,600,P3D);
Ess.start(this);
myChannel=new AudioChannel("beethoven-5th.wav");
myFFT=new FFT(512);
myFFT.smooth=true;
myChannel.play();
myChannel.loop(9);
  background(255);
}
void draw(){
translate(300,300);
strokeWeight(4);
myFFT.getSpectrum(myChannel);
theta=(myFFT.spectrum[20]+myFFT.spectrum[60]+myFFT.spectrum[100]+myFFT.spectrum[140]+myFFT.spectrum[180]+myFFT.spectrum[220])*512/6;
thetacum+=theta;
stroke(Love[int(map(constrain(theta,0.3,0.4),0,0.4,0,3.93))],20);
rotateY(cos(thetacum/40));
rotateZ(sin(thetacum/40));
fill(220,150);
box(300-a*10);
//saveFrame("C:/Users/user/Desktop/fil/#####.tga");
a+=0.005;
if (a>30){
a=30;
}
}
