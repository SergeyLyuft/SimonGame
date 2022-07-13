let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"]; 
let userClickedPattern = [];
let count = false;
let level = 0;

$(document).keydown(function() {
    if (!count) {
        $("h1").text("level " + level);
        nextSequence();
        count = true;
    }
})

$(".btn").click(function() {
    let userChosenColor = $(this).attr("id" );
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            console.log("success");
            setTimeout(() => {
            nextSequence();
            }, 1000);    }    
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
           
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    count = false;
}