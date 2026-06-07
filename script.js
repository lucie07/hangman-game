var rand = 0;
var word = "";
var wordlength = 0;
var spaces = 0;
var numRight = 0;
var mistake = 7;
var nextImg = 1;

var fruits = [
    "apple",
    "kiwi",
    "carambola",
    "gooseberry",
    "mulberry",
    "mango",
    "pear",
    "avocado",
    "jackfruit",
    "raspberry",
    "durian",
    "pomegranate",
    "mandarin",
    "banana",
    "blackberry",
    "melon",
    "orange",
    "papaya",
    "peach",
    "pear",
    "plum",
    "pineapple",
    "watermelon",
    "grapes",
    "cherry",
    "coconut",
    "lemon",
    "lime"
];

function draw() {
    document.getElementById("introPage").style.display = "block";
    document.getElementById("myPage").style.display = "none";
    document.getElementById("gamePage").style.display = "none";
    document.getElementById("endPage").style.display = "none";
}

function myp() {
    document.getElementById("introPage").style.display = "none";
    document.getElementById("myPage").style.display = "block";
}

// fruit button: choose a random fruit and start the game
function fruit() {
    resetGame();

    rand = Math.floor(Math.random() * fruits.length);
    word = fruits[rand].toLowerCase();

    document.getElementById("myPage").style.display = "none";
    document.getElementById("theName").innerHTML = "Guess:";

    hangman();
}

// reset game values and clear old display
function resetGame() {
    word = "";
    wordlength = 0;
    spaces = 0;
    numRight = 0;
    mistake = 7;
    nextImg = 1;

    document.getElementById("mistakes").innerHTML = "Chances : " + mistake;
    document.getElementById("hangImg").src = "hang1.png";
    document.getElementById("winStatus").innerHTML = "";
    document.getElementById("guessedWord").innerHTML = "Word";

    for (var i = 1; i <= 100; i++) {
        var letterDiv = document.getElementById("letter" + i);
        var underlineDiv = document.getElementById("underline" + i);

        if (letterDiv && underlineDiv) {
            letterDiv.innerHTML = "";
            letterDiv.style.visibility = "hidden";

            underlineDiv.style.display = "none";
            underlineDiv.style.borderBottom = "none";
        }
    }

    var letterButtons = document.querySelectorAll("#letterBank button");

    for (var j = 0; j < letterButtons.length; j++) {
        letterButtons[j].style.visibility = "visible";
        letterButtons[j].disabled = false;
    }
}

function hangman() {
    var divWidth = 55 * word.length + 10;
    document.getElementById("wordWrap").style.width = divWidth + "px";

    for (var i = 0; i < word.length; i++) {
        var position = i + 1;
        var letter = word.charAt(i);

        var letterDiv = document.getElementById("letter" + position);
        var underlineDiv = document.getElementById("underline" + position);

        if (letter === " ") {
            letterDiv.innerHTML = "&nbsp;";
            letterDiv.style.visibility = "hidden";

            underlineDiv.style.display = "block";
            underlineDiv.style.borderBottom = "none";

            spaces++;
        } else {
            letterDiv.innerHTML = letter;
            letterDiv.style.visibility = "hidden";

            underlineDiv.style.display = "block";
            underlineDiv.style.borderBottom = "3px solid black";
        }
    }

    wordlength = word.length - spaces;

    document.getElementById("gamePage").style.display = "block";
    document.getElementById("mistakes").innerHTML = "Chances : " + mistake;

    revealStartingLetters();
}

function revealStartingLetters() {
    var uniqueLetters = [];

    for (var i = 0; i < word.length; i++) {
        var currentLetter = word.charAt(i);

        if (currentLetter !== " " && uniqueLetters.indexOf(currentLetter) === -1) {
            uniqueLetters.push(currentLetter);
        }
    }

    // decide how many letters to reveal
    var lettersToReveal = 1;

    if (word.length >= 7) {
        lettersToReveal = 2;
    }

    // do not reveal too much for very short words
    if (uniqueLetters.length <= 3) {
        lettersToReveal = 1;
    }

    for (var r = 0; r < lettersToReveal; r++) {
        if (uniqueLetters.length === 0) {
            return;
        }

        var randomIndex = Math.floor(Math.random() * uniqueLetters.length);
        var selectedLetter = uniqueLetters[randomIndex];

        uniqueLetters.splice(randomIndex, 1);

        for (var j = 1; j <= word.length; j++) {
            var letterDiv = document.getElementById("letter" + j);

            if (letterDiv.innerHTML.toLowerCase() === selectedLetter) {
                if (letterDiv.style.visibility !== "visible") {
                    letterDiv.style.visibility = "visible";
                    numRight++;
                }
            }
        }

        var button = document.getElementById(selectedLetter);

        if (button) {
            button.style.visibility = "hidden";
            button.disabled = true;
        }
    }
}

function guessLetter(event) {
    var target = event.target;
    var guessedLetter = target.textContent.toLowerCase();
    var correct = false;

    target.style.visibility = "hidden";
    target.disabled = true;

    for (var i = 1; i <= word.length; i++) {
        var letterDiv = document.getElementById("letter" + i);

        if (letterDiv.innerHTML.toLowerCase() === guessedLetter) {
            if (letterDiv.style.visibility !== "visible") {
                letterDiv.style.visibility = "visible";
                numRight++;
            }

            correct = true;
        }
    }

    if (correct === true) {
        playSound(correctSound);
    }

    if (correct === false) {
        mistake--;
        nextImg++;

        document.getElementById("mistakes").innerHTML = "Chances : " + mistake;
        document.getElementById("hangImg").src = "hang" + nextImg + ".png";

        if (mistake > 0) {
            playSound(wrongSound);
        }
    }

    if (mistake <= 0) {
        mistake = 0;
        document.getElementById("mistakes").innerHTML = "Chances : " + mistake;
        document.getElementById("winStatus").innerHTML = "You lose :(";

        playSound(loseSound);

        setTimeout(function() {
            lose();
        }, 600);
        return;
    }

    if (numRight === wordlength) {
        document.getElementById("winStatus").innerHTML = "You won! :)";

        playSound(winSound);

        setTimeout(function() {
            win();
        }, 600);
    }
}

function win() {
    document.getElementById("gamePage").style.display = "none";
    document.getElementById("endPage").style.display = "block";
    document.getElementById("guessedWord").innerHTML = "The word: " + word;
}

function lose() {
    document.getElementById("gamePage").style.display = "none";
    document.getElementById("endPage").style.display = "block";
    document.getElementById("guessedWord").innerHTML = "The right word is: " + word;
}
