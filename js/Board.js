var board;
var size;
var sizeOfCell;
var chars = [];

//Create Cell
function createCell(x,y){
  //Set Cell
  var cell = document.createElement('div');
  $(cell).addClass('cell-board');
  $(cell).addClass('cell-board-' + x + '-' + y);
  $(cell).css('width', sizeOfCell + 'em');
  $(cell).css('height', sizeOfCell + 'em');

  //Get random char
  var position = Math.floor((Math.random() * chars.length));
  var img = './src/icon/' + chars[position] + '.png';

  //Remove char in array
  chars = chars.slice(0,position).concat(chars.slice(position + 1 , chars.length));

  $(cell).css('background-image','url(' + img + ')');

  //Set onclick cell
  $(cell).click(function(){
    //Check if this is Blank
    if($(this).css('background-image').slice(-11,-2) == 'Blank.png') return;

    if($(this).attr('class').indexOf('active')==-1){
      setActiveCell(this);
    } else {
      //setDeactiveCell(this);
    }
  });

  return cell;
}

function setActiveCell(cell){
  $(cell).addClass('active');

  //Change Background
  var imgChange = $(cell).css('background-image').slice(0,-7) + 'active/' +
                  $(cell).css('background-image').slice(-7,-1) + ')';
  $(cell).css('background-image',imgChange);

  //Set result
  addToPlayBoard($(cell).css('background-image').slice(-7,-6));
}

function setDeactiveCell(cell){
  if($(cell).css('background-image').slice(-11,-2) == 'Blank.png') return;

  $(cell).removeClass('active');

  //Change Background
  var imgChange = $(cell).css('background-image').slice(0,-14) +
                  $(cell).css('background-image').slice(-7,-1) + ')';
  $(cell).css('background-image',imgChange);
}

function clearAllActive(){
  var cells = $('.cell-board');

  for (var i = 0; i < cells.length; i++) {
    if($(cells[i]).attr('class').indexOf('active')!=-1) setDeactiveCell(cells[i]);
  }
}

//Create Row
function createRow(x){
  var row = document.createElement('div');
  $(row).addClass('row-board row-board-' + x);
  for(var i = 0; i < size ; i++){
    $(row).append(createCell(x,i));
  }
  return row;
}

function getCharsOfWordForBoard(word){
  var keys = word.split(" ");
  var arr = [];

  for (var i in keys) {
    arr = arr.concat(keys[i].split(""));
  }

  return arr;
}

function getSize(length){
  var num = Math.sqrt(length);
  if(num > Math.round(num)) num = Math.round(num) + 1;
  else num = Math.round(num);
  return num;
}

//Create Board
function createBoard(div, word, cell){
  board = div;
  $(board).empty();
  sizeOfCell = cell;

  word = word.toUpperCase();
  chars = getCharsOfWordForBoard(word);
  size = getSize(chars.length);

  //Append char
  if(chars.length < size * size){
    for(var i = chars.length; i < size * size; i++) {
      chars.push('Blank');
    }
  }

  $(board).addClass('board');
  for(var i = 0; i < size ; i++){
    $(board).append(createRow(i));
  }
}
