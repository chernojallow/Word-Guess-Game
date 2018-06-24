

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

// global variables
const maximumGuess = 10;           
var letters = [];        
var currentWord;          
var guessingWord = [];          
var remainders = 0;      
var startGuessing= false;        
var endGuessing = false;           
var wins = 0;                  



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

document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
document.getElementById("gameover-image").style.cssText = "display: none";
document.getElementById("youwin-image").style.cssText = "display: none";


showGame();
};


function showGame() {

document.getElementById("Wins").innerText = wins;
document.getElementById("currentWord").innerText = "";
for (var i = 0; i < guessingWord.length; i++) {
    document.getElementById("currentWord").innerText += guessingWord[i];
}
document.getElementById("remainders").innerText = remainders;
document.getElementById("letters").innerText = letters;
if(remainders <= 0) {
    document.getElementById("gameover-image").style.cssText = "display: block";
    //randomImageLost();
    document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
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
    // Loop through all the indicies and replace the '_' with a letter.
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

function randomImageWin() {
    var randomImageNumber = Math.floor(Math.random() * 4) + 1;
    var imageName = "you-win" + randomImageNumber + ".jpg";
    (document.getElementById("youwin-image").style.cssText= "display: block").src = "./images/" + imageName;

};

function randomImageLost() {
    var randomImageNumber = Math.floor(Math.random() * 4) + 1;
    var imageName = "game-over" + randomImageNumber + ".png";
    (document.getElementById("youwin-image").style.cssText = "display: block").src = "./images/" + imageName;

};

function playSound() {
    var sound = new Audio('./images./whistle.wav');
    sound.play();
}