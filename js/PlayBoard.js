var playBoard;
var size;
var result;
var chars = [];
var sizeOfCell;
var playCell = [];
var playChars = [];
var currentPosition;

function getCharsOfWordForPlayBoard(word){
  return word.split(" ");
}

function createPlayCell(count){
  var cell = document.createElement('div');
  $(cell).addClass('cell-playboard');
  $(cell).addClass('cell-playboard-' + count);
  $(cell).css('width', sizeOfCell + 'em');
  $(cell).css('height', sizeOfCell + 'em');

  playCell.push(cell);

  return cell;
}

function createWordCell(x,count){
  var wordCell = document.createElement('div');
  $(wordCell).addClass('wordcell-playboard wordcell-playboard-' + x);

  for (var i = 0; i < chars[x].length; i++) {
    count++;
    $(wordCell).append(createPlayCell(count));
  }

  return wordCell;
}

function createPlayBoard(div, word, sizeOfCell){
  playBoard = div;
  $(playBoard).empty();

  word = word.toUpperCase();
  chars = getCharsOfWordForPlayBoard(word);
  result = getCharsOfWordForBoard(word);
  size = result.length;
  this.sizeOfCell = sizeOfCell;
  playCell = [];
  playChars = [];
  currentPosition = -1;

  var count = 0;
  for (var i = 0; i < chars.length; i++) {
    $(playBoard).append(createWordCell(i,count));
  }
}

function addToPlayBoard(char){
  currentPosition++;
  $(playCell[currentPosition]).css('background-image','url(' + './src/icon/' + char + '.png'   + ')');
  playChars.push(char);
  if(currentPosition + 1 == size) checkWin();
}

function checkWin(){
     if(result.join('') == playChars.join('')) won();
   else wrong();
}

function won(){
  setTimeout(function(){
    alert("Click to next >>>>");
    $(playBoard).css('background-color','white');
    next();
  }, 100);
  $(playBoard).css('background-color','green');
}

function wrong(){
  setTimeout(function(){
    $(playBoard).css('background-color','white');
    clear();
  }, 500);
  $(playBoard).css('background-color','red');
}

function clearPlayBoard(){
  playChars = [];

  for (var i = 0; i <= currentPosition; i++) {
    $(playCell[i]).css('background-image','url(src/icon/Blank.png)');
  }

  currentPosition = -1;
}
