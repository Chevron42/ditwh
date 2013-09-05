//= require rot
//= require submap

// XXX
// Clean up this constructor!
// get rid of those w and h params
ROT.Map.Arkham = function (width, height) {
  this.WIDTH = width;
  this.HEIGHT = height;
  ROT.Map.call(this, this.WIDTH, this.HEIGHT);

  this.anEmptyMap = null;
  $.ajax({
    url: '/map.json',
    async: false
  }).done(function(data) {
    anEmptyMap = data;
  });

  this.map = [];

  // create a map of Tile objects using the empty map as a template
  for (var i = 0; i < this.WIDTH; i += 1) {
    this_height = this.HEIGHT;
    this.map[i] = [];
    for (var j = 0; j < this_height; j += 1) {
      this.map[i].push(this.createTile(anEmptyMap[i][j]));
    }
  }

  // there's some duplicated code here sort of
  // try to fix it
  this.TILE = {
    SAFE: '.',
    WITCH_HOUSE: 'O',
    BARRIER: 'X',
    WEST_TRAP_1: '>',
    WEST_TRAP_2: '+',
    EAST_TRAP_1: '<',
    EAST_TRAP_2: '=',
    SOUTH_TRAP_1: '/',
    SOUTH_TRAP_2: '#',
    NORTH_TRAP_1: '\\',
    NORTH_TRAP_2: '*',
    EVENT: {
      "frank": 'F',
      "iwanicki": 'I',
      "library": 'L',
      "old woman": 'W',
      "statuette": 'S',
      "upham": 'U',
      "doctor": 'D',
      "brown jenkin": 'B'
    }
  };

  // west sector
  // could I get away with saving only upper left corner, width, and height
  // for the full sector as well as the maze?
  this.MISKATONIC_U = {
    name: 'Miskatonic University',
    upperLeft: [9, 0],
    upperRight: [46, 0],
    lowerLeft: [9, 41],
    lowerRight: [46, 41],
    mazeUpperLeft: [19, 10],
    mazeWidth: 27,
    mazeHeight: 23,
    traps: [this.TILE.WEST_TRAP_1, this.TILE.WEST_TRAP_2],
    // the following two variables specify lines of the map
    // that need to be clear to guarantee that this sector
    // will have a path to its tower
    horizontalEndPath: [[1, 20], [18, 20]],
    verticalEndPath: [[18, 10], [18, 41]]
  };

  // east sector
  this.ARKHAM_SQ = {
    name: 'Arkham Town Square',
    upperLeft: [97, 0],
    upperRight: [130, 0],
    lowerLeft: [97, 41],
    lowerRight: [130, 41],
    mazeUpperLeft: [97, 10],
    mazeWidth: 25,
    mazeHeight: 21,
    traps: [this.TILE.EAST_TRAP_1, this.TILE.EAST_TRAP_2],
    horizontalEndPath: [[121, 20], [139, 20]],
    verticalEndPath: [[121, 14], [121, 30]]
  };

  // south sector
  this.FOREST = {
    name: 'Forest',
    upperLeft: [46, 27],
    upperRight: [97, 27],
    lowerLeft: [46, 34],
    lowerRight: [97, 34],
    mazeUpperLeft: [46, 27],
    mazeWidth: 51,
    mazeHeight: 7,
    traps: [this.TILE.SOUTH_TRAP_1, this.TILE.SOUTH_TRAP_2],
    horizontalEndPath: [[50, 33], [94, 33]],
    verticalEndPath: [[70, 32], [70, 33]]
  };

  // north sector
  this.MEADOW_HILL = {
    name: 'Meadow Hill',
    upperLeft: [46, 7],
    upperRight: [96, 7],
    lowerLeft: [46, 15],
    lowerRight: [96, 15],
    mazeUpperLeft: [46, 9],
    mazeWidth: 51,
    mazeHeight: 7,
    traps: [this.TILE.NORTH_TRAP_1, this.TILE.NORTH_TRAP_2],
    horizontalEndPath: [[53, 8], [85, 8]],
    verticalEndPath: [[70, 6], [70, 8]]
  };

  this.CENTER = {
    upperLeft: [48, 16],
    upperRight: [95, 16],
    lowerLeft: [47, 25],
    lowerRight: [95, 25]
  };

  this.SECTORS = [this.MISKATONIC_U, this.ARKHAM_SQ, this.FOREST, this.MEADOW_HILL];
  return this;
};

ROT.Map.Arkham.extend(ROT.Map);

// takes an Eller Maze and replaces the appropriate sector of the map
ROT.Map.Arkham.prototype.replaceSubsection = function(sector, submap) {
  var plusWidth = sector.mazeUpperLeft[0];
  var plusHeight = sector.mazeUpperLeft[1];

  for (var i = 0; i < sector.mazeWidth; i += 1) {
    for (var j = 0; j < sector.mazeHeight; j += 1) {
      this.map[i + plusWidth][j + plusHeight] = submap[i][j];
    }
  }
};

// XXX
// Clean this up
ROT.Map.Arkham.prototype.makePathEnds = function(sector) {

  // make the necessary horizontal path
  for (var i = sector.horizontalEndPath[0][0]; i < sector.horizontalEndPath[1][0]; i += 1) {
    var tileA = this.map[i][sector.horizontalEndPath[0][1]];
    tileA.onThePath = true;
    tileA.trap = false;
  }

  // make the necessary vertical path
  for (var j = sector.verticalEndPath[0][1]; j < sector.verticalEndPath[1][1]; j += 1) {
    var tileB = this.map[sector.verticalEndPath[0][0]][j];
    tileB.onThePath = true;
    tileB.trap = false;
  }
};

ROT.Map.Arkham.prototype.create = function() {

  // okay, here's where all the work gets done
  var s,
    j,
    i,
    sectors_length = this.SECTORS.length;
  for (s = 0; s < sectors_length; s += 1) {
    var sector = this.SECTORS[s];
    var startWidth = sector.upperLeft[0];
    var endWidth = sector.upperRight[0];
    var startHeight = sector.upperLeft[1];
    var endHeight = sector.lowerRight[1];

    // first, let's generate a maze submap for this sector
    var mySubmap = new Submap(sector.mazeWidth, sector.mazeHeight).myLilMap;

    // then, replace the corresponding section of the map with the maze
    this.replaceSubsection(sector, mySubmap);

    // great! now that we've got some mazes, it's time to tend to those
    // odd tendrils at the four corners of the map.
    // let's make some guaranteed paths from each maze to each tower
    this.makePathEnds(sector);

    // now let's fill in the non-path spaces with dense traps
    var rand;
    var aChar;
    var trap = false;

    for (i = startWidth; i < endWidth; i += 1) {
      for (j = startHeight; j < endHeight; j += 1) {
        // tilde tiles MUST get traps
        if (this.map[i][j].value === '~') {
          rand = ROT.RNG.getUniform();
          if (rand < 0.50) {
            aChar = sector.traps[0];
            trap = true;
          }
          else {
            aChar = sector.traps[1];
            trap = true;
          }

          this.map[i][j].value = aChar;
          this.map[i][j].isTrap = trap;
        }

        // tiles outside the maze could be traps or not, nbd
        else if (this.map[i][j].value !== ' ' && !this.map[i][j].onThePath) {

          rand = ROT.RNG.getUniform();
          if (rand < 0.40) {
            aChar = sector.traps[0];
            trap = true;
          }
          else if (rand < 0.80) {
            aChar = sector.traps[1];
            trap = true;
          }
          else {
            aChar = this.TILE.SAFE;
            trap = false;
          }

          this.map[i][j].value = aChar;
          this.map[i][j].isTrap = trap;
        }
      }
    }

  } // end sector generation

  // mark which tiles are initially visible
  this.markVisibleTiles();

  // set events at the center of the map
  this.setEvents(this.CENTER);

  // testing the pathfind function
  // var path = this.pathfind('N');
  // console.log(path);

  return this.map;
};

ROT.Map.Arkham.prototype.pathfind = function(direction) {
  var startPoint = [];
  var endPoint = [];

  if (direction === 'N') {
    startPoint = [71, 15];
    endPoint = [70, 6];
  } else if (direction === 'S') {
    startPoint = [71, 27];
    endPoint = [70, 33];
  } else if (direction === 'W') {
    startPoint = [46, 20];
    endPoint = [8, 20];
  } else if (direction === 'E') {
    startPoint = [96, 20];
    endPoint = [130, 21];
  }

  var visited = [];
  return this.pathfindGo(startPoint, endPoint, visited);
};

ROT.Map.Arkham.prototype.pathfindGo = function(aStart, anEnd) {
  console.log('start: ' + aStart[0] + ', ' + aStart[1] + '; end: ' + anEnd[0] + ', ' + anEnd[1]);
  var x = aStart[0];
  var y = aStart[1];

  if (aStart === anEnd) {
    console.log(anEnd);
    return true;
  }
  else if (this.map[x][y].pathfindVisited) {
    return false;
  }
  else if (this.map[x][y].value !== '.') {
    return false;
  }

  this.map[x][y].pathfindVisited = true;
  return this.pathfindGo([x + 1, y], anEnd) || this.pathfindGo([x - 1, y], anEnd) || this.pathfindGo([x, y + 1], anEnd) || this.pathfindGo([x, y - 1], anEnd);

};

ROT.Map.Arkham.prototype.markVisibleTiles = function() {
  for (var x = 1; x < this.WIDTH - 1; x += 1) {
    for (var y = 1; y < this.HEIGHT - 1; y += 1) {
      var outerWall = false;
      if (this.map[x + 1][y].value === ' ') { outerWall = true; }
      else if (this.map[x][y + 1].value === ' ') { outerWall = true; }
      else if (this.map[x - 1][y].value === ' ') { outerWall = true; }
      else if (this.map[x][y - 1].value === ' ') { outerWall = true; }

      if (outerWall) {
        this.map[x][y].visible = true;
      }
    }
  }

  // mark the four towers as visible
  this.map[70][0].visible = true;
  this.map[0][20].visible = true;
  this.map[71][40].visible = true;
  this.map[140][20].visible = true;
};

// places the scripted events in the center area of the map
ROT.Map.Arkham.prototype.setEvents = function() {
  var centerWidth = this.CENTER.upperRight[0] - this.CENTER.upperLeft[0] + 1;
  var centerHeight = this.CENTER.lowerLeft[1] - this.CENTER.upperLeft[1] + 1;
  var widthOffset = this.CENTER.upperLeft[0];
  var heightOffset = this.CENTER.upperLeft[1];
  var l = Object.keys(this.TILE.EVENT).length;

  // the starting tile is already taken
  var takenTiles = [[71, 20]];

  var randW;
  var randH;

  for (var key in this.TILE.EVENT) {
    var tileNotYetFound = true;
    while (tileNotYetFound) {
      randW = Math.floor(widthOffset + (ROT.RNG.getUniform() * centerWidth));
      randH = Math.floor(heightOffset + (ROT.RNG.getUniform() * centerHeight));

      if (takenTiles.indexOf([randW, randH]) === -1) {
        takenTiles.push([randW, randH]);
        // XXX
        // THIS IS UGLY
        // FIX IT
        this.map[randW][randH].setScene(this.TILE.EVENT[key], key);
        tileNotYetFound = false;
      }
    }
  }
};

// creates a Tile object and sets its color
// XXX
// Any way to do this within the Tile constructor...?
ROT.Map.Arkham.prototype.createTile = function(aValue) {
  tile = new Tile(aValue);
  tile.setColor();
  return tile;
};








