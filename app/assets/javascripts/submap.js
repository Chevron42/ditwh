// we have to create a little submap prototype
// in order for the callback to work
// (since they're designed to bind this context

var Submap = function(aWidth, aHeight) {
  // we need to add 2 because the Eller Maze
  // adds an outer boundary of walls
  // and we don't need that
  this.width = aWidth + 2;
  this.height = aHeight + 2;

  // make the submap the size we want it to be
  this.myLilMap = [];
  for (var i = 0; i < this.width; i += 1) {
    this.myLilMap[i] = [];
    for (var j = 0; j < this.height; j += 1) {
      this.myLilMap[i].push(null);
    }
  }

  // k, so this callback is gonna fill the map with values
  // from the Eller Maze
  this.mazeCallback = function(x, y, value) {
    var tile;
    var rand;

    if (value === 0) {
      tile = new Tile('.');
      tile.onThePath = true;
    }
    else {
      // give the walls a placeholder value
      tile = new Tile('~');
      tile.isTrap = true;
    }
    this.myLilMap[x][y] = tile;
  };

  // now we need to get rid of those outer walls from the Eller Maze generator
  this.shaveWalls = function() {
    // take off the right-hand wall
    this.myLilMap.pop();

    // take off the left-hand wall
    this.myLilMap.splice(0, 1);

    // take off the bottom and top walls
    for (var i = 0; i < aWidth; i += 1) {
      this.myLilMap[i].pop();
      this.myLilMap[i].splice(0, 1);
    }

  };

  this.em = new ROT.Map.EllerMaze(this.width, this.height);
  this.em.create(this.mazeCallback.bind(this));
  this.shaveWalls();

};