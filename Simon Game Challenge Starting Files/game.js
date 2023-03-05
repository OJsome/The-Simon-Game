
// Step 2 - create an array to store the colors
var buttonColors = ["red", "green", "blue", "yellow"];

//Step 2 - and an empty array for the pattern
var gamePattern = [];

//Step 7 - create a new empty array for the clickPattern 
var userClickedPattern = [];

//Step 10 - create 2 variables to know whether if the game has started and what level the user is in
var started = false;
var level = 0;

//Step 11 - when the game has started (any key is pressed), 
//when this happens for the first time, call nextSequence and change the text to Level 1, 2, 3.... Level n
$(document).on("keypress", function(){
    if (started == false) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});


//Step 6 - Use jQuery to detect when any of the buttons are clicked and trigger a handler function
$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");

    //Step 8 - add the contents of the userChosenColor to the end of userClickedPattern
    userClickedPattern.push(userChosenColor);
    //test 1 after step 8
    // console.log(userClickedPattern);

    //Step 5 - Play sound for any click
    playSound(userChosenColor);

    //Step 9 - Add the animatePress functionality for any clicked button
    animatePress(userChosenColor);

    //Step 12 - call checkAnswer after a user has clicked and chosen their answer,
    // passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});



// Step 1 - create a function, and a random number generator 
function nextSequence(){
    //Step 15 - Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    //Step 11 - also, increase level by one each time the function is called
    level++;

    //and update the h1 with the change in the value of level
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    
/*
Step 3 - generate a random color from the array and 
Add the new randomChosenColour generated in step 3 to the end of the gamePattern
*/
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Step 4 - Create an animation when a button is clicked
    // $("#"+randomChosenColor).on("click", function(){
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // });

    //Step 5 - Play sound for any click
    playSound(randomChosenColor);

    started = true;
}

function playSound(name){
    //move the playsound functionality to a new function and call the function in the nextSequence function
    //and when a user clicks any button
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    //Step - 9 add the (already created) css class .pressed to any clicked button
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

//function to check user's answer
function checkAnswer(currentLevel){

//test 2 after step 13
console.log("userClickedPattern: " + userClickedPattern);
console.log("gamePattern: " + gamePattern);

//Step 13 - Write an if statement inside checkAnswer() to check if the most recent user answer is the same 
//as the game pattern. If so then log "success", otherwise log "wrong".
if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success!");
}
else {
    //Step 15 - if the user gets it wrong, play the corresponding sound from the sounds folder
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    //Step 15 - add the home page effect for game over 
    $(document.body).addClass("game-over");

    setTimeout(function(){
        $(document.body).removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press any key to restart");

    //Step 16 - Call start over if the user gets the sequence wrong
    startOver();
}

//Step 14 - If the user got the most recent answer right in step 3, then check that they have 
//finished their sequence with another if statement. Call nextSequence() 
if (userClickedPattern.length == gamePattern.length) {
    setTimeout(function(){
        nextSequence();
    }, 1000)
}


//Step 16 - Finally, create a function for restarting the game, and reset the values of 'level', 'gamePattern'
//and 'started' variables... This automatically restarts the game because if the started value is false, the 
//nextSequence function is called
function startOver(){
    // the order matters, if we restart the 'started' first, the game starts, and the level goes back down to 0
    level = 0;
    gamePattern = [];
    started = false;
}

}



