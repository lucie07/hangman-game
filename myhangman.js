
var rand = 0;
var word = " ";
var wordlength = 0;
var spaces = 0;
var numRight = 0;
var mistake = 7;
var nextImg = 1;
var divWidth = 55;
var fruits = ["apple", "kiwi", "carambola","gooseberry","mulberry","mango", "pear","avocado","jackfruit","raspberry","durian","pomegranate","mandarin","banana", "blackberry", "melon", "orange", "papaya", "peach", "pear", "plum", "pineapple", "watermelon", "grapes", "cherry", "coconut","lemon", "lime"];
//my functions are below
function myp()
{
    document.getElementById('introPage').style.display = "none";
    document.getElementById('myPage').style.display = "block";
}
function fruit()
{
    rand = Math.floor(Math.random() * fruits.length);
    word = fruits[rand];
    document.getElementById('myPage').style.display = "none";
    document.getElementById('theName').innerHTML = "Guess:";
    hangman();
}
function hangman()
{
    var x = word.length;
    var y = x - 1;
    divWidth = divWidth * word.length + 10 ;
    document.getElementById('wordWrap').style.width = divWidth + "px";
    while(x>0)
    {
        var letter = word.substring(y, x);
        if(letter  === " ")
        {
            document.getElementById('letter' + x).innerHTML = "&nbsp;";
            document.getElementById('letter' + x).style.visibility = "hidden";
            document.getElementById('letter' + x).style.display = "block";
            document.getElementById('underline' + x).style.display = "block";
            spaces++;
        }
        else
        {
            document.getElementById('letter' + x).innerHTML = letter;
            document.getElementById('letter' + x).style.visibility = "hidden";
            document.getElementById('underline' + x).style.display = "block";
            document.getElementById('underline' + x).style.borderBottom = "3px solid black";
          
        }
        x--;
        y--;
    }
    wordlength = word.length - spaces;

    document.getElementById('myPage').style.display = "none";
    document.getElementById('gamePage').style.display = "block";
    document.getElementById('mistakes').innerHTML = "Chances : " + mistake;
}

function guessLetter()
{
    var target = event.target;
    var correct=false;
    target.style.visibility = "hidden";
    var lower = target.id;
    var upper = document.getElementById(lower).getAttribute('value');
    for(var a=1;a<=100;a++)
    {
        if(document.getElementById('letter'+a).innerHTML===lower || document.getElementById('letter'+a).innerHTML===upper)
        {
            document.getElementById('letter' + a).style.visibility = "visible";
            correct = true;
            numRight++;
        }
    }
    if (correct == false)
    {
        mistake--;
        ++nextImg;
        document.getElementById('mistakes').innerHTML = "Chances : " + mistake;
        document.getElementById('hangImg').src = 'hang'+ nextImg +'.png';
    }
    if (mistake <= 0)
    {
        mistake = 0;
        document.getElementById('winStatus').innerHTML = 'You lose:(';
        lose();
    }
    if(numRight==wordlength)
    {
        document.getElementById('winStatus').innerHTML = "You Won!:)";
        win();
    }
}

function win()
{
    document.getElementById('gamePage').style.display = "none";
    document.getElementById('endPage').style.display = "block";
    document.getElementById('guessedWord').innerHTML = "The word: " + word;
}
function lose()
{
    document.getElementById('gamePage').style.display = "none";
    document.getElementById('endPage').style.display = "block";
    document.getElementById('guessedWord').innerHTML = "The right word is: " + word;
}
