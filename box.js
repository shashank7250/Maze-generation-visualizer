function Box(x, y) {
    this.x = x;
    this.y = y;
  
    // every box will have two walls -> right and bottom
    this.right = true;
    this.bottom = true;
    this.visited = 0;
  
    this.drawRect = function() {
      noStroke();
      // color blue if visited but not backtracked
      if (this.visited === 1) {
        fill(0, 0, 255);
        rect(x * wallLength, y * wallLength, wallLength, wallLength);
      }
  
      // color white if visited and backtracked
      else if (this.visited === 0) {
        fill(0);
        rect(x * wallLength, y * wallLength, wallLength, wallLength);
      }
    }
    
    this.drawWall = function() {
      stroke(255, 0, 0);
      // if wall exists show it
      if (this.right) {
        line((x + 1) * wallLength, y * wallLength, (x + 1) * wallLength, (y + 1) * wallLength);
      }
  
      if (this.bottom) {
        line(x * wallLength, (y + 1) * wallLength, (x + 1) * wallLength, (y + 1) * wallLength);
      }
    }
  
    this.getRandomBox = function() {
      var list = [];
      // adding all possible boxes in the list
  
      if (idxChecker(x - 1, y)) {
        if (grid[x - 1][y].visited === 0)
          list.push(grid[x - 1][y]);
      }
  
      if (idxChecker(x + 1, y)) {
        if (grid[x + 1][y].visited === 0)
          list.push(grid[x + 1][y]);
      }
  
      if (idxChecker(x, y - 1)) {
        if (grid[x][y - 1].visited === 0)
          list.push(grid[x][y - 1]);
      }
  
      if (idxChecker(x, y + 1)) {
        if (grid[x][y + 1].visited === 0)
          list.push(grid[x][y + 1]);
      }
  
      // if no possible boxes
      if (list.length === 0)
        return undefined;
  
      // return a random box for random mazes
      return list[floor(random(0, list.length))];
    }
  
    this.highlight = function() {
      noStroke();
      fill(0, 255, 0);
      rect(x * wallLength, y * wallLength, wallLength, wallLength);
    }
  }