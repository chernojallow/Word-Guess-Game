

var Words =          
[
    "boostrap",
    "java",
    "javascript",
    "python",
    "sql",
    "science",
    "physics",
    "calculus",
    "science",
];

    

var guessLetters = [];       
var currentWord; 
var guessing =[];
var remaining = 0;      
var startGame= false;        
var gameEnd = false;        
var wins = 0;    





function makeGuess(letter) {
    if (remaining >0 ) {
        if (!startGame) {
           
       } 

        // Make sure letter is not yet used
        if ( guessLetters.indexOf(letter) === -1) {
            guessLetters.push(letter);
            
        }
    }
    
    Win();
};


function Win() {
    if(guessing.indexOf('_') === -1) {
      
        wins++;
        gameEnd= true;
    }
};











