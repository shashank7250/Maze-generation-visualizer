// Ankur Ingale
// Maze Generation Visualizer

let gridWidth = 400, gridHeight = 400;
var wallLength = 20;
var nFrameRate = 240;
var grid = [] , stack = [];
var current;
var mode;
var columns , rows;

function setup() {
  createCanvas(gridWidth, gridHeight);
  frameRate(nFrameRate);
  
  // setting up number of rows and columns
  rows = floor(width / wallLength);
  columns = floor(height / wallLength);
  
  // making a grid of Boxes 
  for(var i = 0; i < rows; i++){
      var p = [];
      for(var j = 0; j < columns; j++){
          p.push(new Box(i,j));
      }
      grid.push(p);
  }
  grid[rows - 1][columns - 1].right = false;
  grid[rows - 1][columns - 1].bottom = false;
  
  // setting current box as the first box
  current = grid[0][0];
  
  // visited = 1 means the Box has not beem used again(backtracked)
  current.visited = 1;
  
  //mode = 0 for generating maze, mode = 1 for playing
  mode = 0;
}

function draw() {
  background(255);
  
  // drawing walls
  for(var i = 0;i < grid.length; i++){
      for(var j = 0; j < grid[i].length; j++){
          grid[i][j].drawRect();
          grid[i][j].drawWall();
      }
  }
  
  // highlighting current box
  current.highlight();
  
  if(mode == 0){
    // getting next box
    next = current.getRandomBox();
    
    if(next){
        next.visited = 1;

        // depth-first-search
        stack.push(current);

        // removing the wall between
        removeWall(current , next);
        current = next;
    }
    else{
        // box has been backtracked and will not be used again
        current.visited = 2;
        if(stack.length > 0)
            current = stack.pop();
    }
  }
  
  if(current == grid[0][0] && current.visited == 2 && stack.length == 0)
      mode = 1;
}

function idxChecker(x,y){
  return x >= 0 && x < rows && y >= 0 && y < columns;
}

function removeWall(currentBox , nextBox){
  
    if(nextBox.x - currentBox.x === 1){
        currentBox.right = false;
    }
  
    if(nextBox.x - currentBox.x === -1){
        nextBox.right = false;
    }
  
    if(nextBox.y - currentBox.y === 1){
        currentBox.bottom = false;
    }
  
    if(nextBox.y - currentBox.y === -1){
        nextBox.bottom = false;
    }
}

function keyPressed(){
  
  var posx = current.x;
  var posy = current.y;
  if(mode == 1){
      if(keyCode == UP_ARROW){
         if(idxChecker(posx,posy - 1))
             if(grid[posx][posy - 1].bottom === false)
                 current = grid[posx][posy - 1];
      }
      
      if(keyCode == DOWN_ARROW){
         if(idxChecker(posx,posy + 1))
             if(grid[posx][posy].bottom === false)
               current = grid[posx][posy + 1];
      }
    
      if(keyCode == LEFT_ARROW){
         if(idxChecker(posx - 1,posy))
             if(grid[posx - 1][posy].right === false)
                 current = grid[posx - 1][posy];
      }
  
      if(keyCode == RIGHT_ARROW){
         if(idxChecker(posx + 1,posy))
              if(grid[posx][posy].right === false)
                   current = grid[posx + 1][posy];
      }
  }
  
  if(current.x === rows - 1 && current.y === columns - 1)
      console.log("Maze Completed");
}