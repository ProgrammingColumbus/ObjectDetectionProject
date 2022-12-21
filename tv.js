//Start

img = "";
status1 = "";
objects = [];

function preload(){
    img = loadImage("tv.jpg");
}


function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status:  Detecting Objects.";

}


function draw(){
    image(img, 0, 0, 640, 420);
    if(status1 != ""){
        for(i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object(s) detected.";

            fill("#A085AD");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#0854AD");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model: Initialized.");
    status1 = true;
    objectDetect.detect(img, gotResult);

}

function gotResult(error, results){
    if(error){
        console.log(error);
    }

    console.log(results);
    objects = results;
}