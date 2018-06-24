

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
[ "goal", "team", "nation", "stadium", "yellowcard", "redcard", "whistle",
  "dribble", "tackle", "jersey", "goalie", "header", "header", "foul", "kick",
];
               


// show game on HTML page 
function showGame() {

document.getElementById("Wins").innerHTML = wins;
document.getElementById("currentWord").innerHTML = "";
for (var i = 0; i < guessingWord.length; i++) {
    document.getElementById("currentWord").innerHTML = document.getElementById("currentWord").innerHTML + guessingWord[i];
}
document.getElementById("remainders").innerHTML = remainders;
document.getElementById("letters").innerHTML = letters;
if(remainders <= 0) {
    document.getElementById("userLoss-Image").style = "display: block";
    //randomImageLost();
    document.getElementById("pressAnyKeyTryAgain").style ="";
    endGuessing = true;
}
};

document.onkeydown = function(e) {
// reset when a game is finished
    if(endGuessing) {
        startGame();
        endGuessing = false;
} else {
    // make sure A-Z is selected.
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        guessLetters(e.key.toLowerCase());
    }
}
};

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
   
    document.getElementById("pressAnyKeyTryAgain").style= "display: none";
    document.getElementById("userLoss-Image").style = "display: none";
    document.getElementById("userWin-Image").style= "display: none";
   
   showGame();
   };



function guessLetters(letter) {
if (remainders > 0) {
    if (!startGuessing || startGuessing ===false) { 
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

// functions to hold positions of letters
function check(letter){
 var letterPositions = [];


for (var i = 0; i < wordArray[currentWord].length; i++) {
    if(wordArray[currentWord][i]=== letter) {
        letterPositions.push(i);
    }
}


if (letterPositions.length <= 0) {
    remainders--;
} else {
    // Loop through all and replace the '_' with a letter.
    for(var i = 0; i < letterPositions.length; i++) {
        guessingWord[letterPositions[i]] = letter;
    }
}
};


function Win() {
    if (guessingWord.indexOf("_") === -1) {
    playSound();
    document.getElementById("userWin-Image").style = "display: block";
    //randomImageWin();
    document.getElementById("pressAnyKeyTryAgain").style = "display: block";
    wins++;
    endGuessing = true;
}
};

// play sounds when user wins 
function playSound() {
    var sound = new Audio('./assets/images/whistle.wav');
    sound.play();
}

// functions to generate images randomly 
function randomImageWin() {
    var randomImageNumber = Math.floor(Math.random() * 4) + 1;
    var imageName = "you-win" + randomImageNumber + ".jpg";
    (document.getElementById("userWin-Image").style = "display: block").src = "./assets/images/" + imageName;

};

function randomImageLost() {
    var randomImageNumber = Math.floor(Math.random() * 4) + 1;
    var imageName = "game-over" + randomImageNumber + ".png";
    (document.getElementById("userWin-Image").style = "display: block").src = "./assets/images/" + imageName;

};

