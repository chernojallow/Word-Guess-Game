

// global variables
var maximumGuess = 12;           
var letters = [];        
var currentWord;          
var guessingWord = [];          
var remainders = 0;      
var startGuessing= false;        
var endGuessing = false;           
var wins = 0;                  


// Array of words 
var wordArray =           
[
    "goal",
    "team",
    "nation",
    "stadium",
    "yellowcard",
    "redcard",
    "whistle",
    "dribble",
    "tackle",
    "jersey",
    "goalie",
    "header",
    "header",
    "foul",
    "kick",
];
               



function startGame() {
 remainders = maximumGuess;
 startGuessing = false;

// randomly picking words 
currentWord = Math.floor(Math.random() * (wordArray.length));


letters = [];
guessingWord = [];

for (var i = 0; i < wordArray[currentWord].length; i++) {
    guessingWord.push("_");
}

 document.getElementById("pressKeyTryAgain").style= "display: none";
 document.getElementById("gameover-image").style = "display: none";
 document.getElementById("youwin-image").style= "display: none";


showGame();
};


// show game on HTML page 
function showGame() {

document.getElementById("Wins").innerHTML = wins;
document.getElementById("currentWord").innerHTML = "";
for (var i = 0; i < guessingWord.length; i++) {
    document.getElementById("currentWord").innerHTML += guessingWord[i];
}
document.getElementById("remainders").innerHTML = remainders;
document.getElementById("letters").innerHTML = letters;
if(remainders <= 0) {
    document.getElementById("gameover-image").style = "";
    //randomImageLost();
    document.getElementById("pressKeyTryAgain").style ="";

    endGuessing = true;
}
};

document.onkeydown = function(event) {
// reset when a game is finished
    if(endGuessing) {
        startGame();
        endGuessing = false;
} else {
    // make sure A-Z is guess.
    if(event.keyCode >= 65 && event.keyCode <= 90) {
        guessLetters(event.key.toLowerCase());
    }
}
};

function guessLetters(letter) {
if (remainders > 0) {
    if (!startGuessing) {
        startGuessing = true;
    }

    // letter is not used yet 
    if (letters.indexOf(letter) === -1) {
        letters.push(letter);
        check(letter);
    }
}
// Calling functions
showGame();
 Win();
};


function check(letter){
var positions = [];


for (var i = 0; i < wordArray[currentWord].length; i++) {
    if(wordArray[currentWord][i]=== letter) {
        positions.push(i);
    }
}


if (positions.length <= 0) {
    remainders--;
} else {
    // Loop through all and replace the '_' with a letter.
    for(var i = 0; i < positions.length; i++) {
        guessingWord[positions[i]] = letter;
    }
}
};



function Win() {
    if (guessingWord.indexOf("_") === -1) {
    playSound();
    document.getElementById("youwin-image").style.cssText = "display: block";
    //randomImageWin();
    document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
    wins++;
    endGuessing = true;
}
};
// functions to generate images randomly 
function randomImageWin() {
    var randomImageNumber = Math.floor(Math.random() * 4) + 1;
    var imageName = "you-win" + randomImageNumber + ".jpg";
    (document.getElementById("youwin-image").style = "display: block").src = "./images/" + imageName;

};

function randomImageLost() {
    var randomImageNumber = Math.floor(Math.random() * 4) + 1;
    var imageName = "game-over" + randomImageNumber + ".png";
    (document.getElementById("youwin-image").style = "display: block").src = "./images/" + imageName;

};

// play sounds when user wins 
function playSound() {
    var sound = new Audio('./images/whistle.wav');
    sound.play();
}