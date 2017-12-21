var board = $('.main')[0];
var playBoard = $('.result')[0];
var timeDiv = $('.time');
var scoreDiv = $('.score>span')[0];
var size = 5;
var sizeOfCell = 5;
var currentWord;
var score;
var time;

var words = [
   'hi', 'snap', 'hello',
   'response', 'request',
   'programmer', 'javascript',
   'open the door'
];

function play(){

  if(words.length == 0){
    alert('You won all rounds !!!!!');
    return;
  }

  startTimer(time,timeDiv);
  $(scoreDiv).text(score);

  var pos = Math.floor((Math.random() * words.length));
  currentWord = words[pos];
  createBoard(board,currentWord,sizeOfCell);
  createPlayBoard(playBoard,currentWord,sizeOfCell);
  words = words.slice(0,pos).concat(words.slice(pos + 1 , words.length));
}

function clear(){
  clearAllActive();
  clearPlayBoard();

  time-=20;
  if(time < 0) lose();
  startTimer(time,timeDiv);
}

function next(){
  score++;
  time+=60;
  play();
}

function start(){
  score = 0;
  time = 300;
  play();
}

function init(){
  start();
  var clearBtn = $('#clearBtn')[0];
  $(clearBtn).click(function(){
    clear();
  });
}

function lose(){
  alert('Your score : ' + score + '\n Click to Play Again');
  window.clearInterval(countdown);
  start();
}

//Set up Count Down Timer
function startTimer(duration,display) {
    var timer = duration, minutes, seconds;
    countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        time = timer;

        display.html(minutes + ":" + seconds);

        if (--timer < 0) {
          lose();
        }
    }, 1000);
}

$(document).ready(function(){
  init();
})
