var song = "";
var leftWristX;
var rightWristX;
var leftWristY;
var rightWristY;
var scoreleftwrist;
var scorerightwrist;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1)
}

function modelLoaded() {
    console.log("Posenet initialized");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("score of left wrist: " + scoreleftwrist + " score of right wrist: " + scorerightwrist);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left Wrist X: " + leftWristX + " Right Wrist X: " + rightWristX + " Left Wrist Y: " + leftWristY + " Right Wrist Y: " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");

    if(scorerightwrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        if(rightWristY > 200 && rightWristY < 300) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
        }

        else if(rightWristY > 300 && rightWristY < 400) {
            song.rate(1);
            document.getElementById("speed").innerHTML = "Speed = 1x";
        }

        else if(rightWristY > 400 && rightWristY < 500) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
        }
    }

    if(scoreleftwrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        volume = floor(Number(leftWristY)) / 500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "Volume: " + volume;
    }
}