//= require rot

// XXX
// Clean up this constructor!
// get rid of those w and h params
ROT.Map.Arkham = function (width, height) {
  var i = 0,
    this_width = width,
    j,
    this_height,
    anEmptyMap;

  $.ajax({
    url: '/map.json',
    async: false
  }).done(function(data) {
    anEmptyMap = data;
  });

  this.WIDTH = width;
  this.HEIGHT = height;
  ROT.Map.call(this, this.WIDTH, this.HEIGHT);
  this.map = [];

  // generate an empty map from the given parameter

  for (i; i < this_width; i += 1) {
    this_height = this.HEIGHT;
    this.map[i] = [];
    for (j = 0; j < this_height; j += 1) {
      this.map[i].push(new Tile(anEmptyMap[i][j]));
    }
  }

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
    FRANK: 'F',
    IWANICKI: 'I',
    LIBRARY: 'L',
    OLD_WOMAN: 'W',
    STATUE: 'S',
    UPHAM: 'U',
    DOCTOR: 'D',
    BROWN_JENKIN: 'B'
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
    mazeHeight: 21,
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
    mazeWidth: 24,
    mazeHeight: 21,
    traps: [this.TILE.EAST_TRAP_1, this.TILE.EAST_TRAP_2],
    horizontalEndPath: [[121, 20], [139, 20]],
    verticalEndPath: [[121, 14], [121, 30]]
  };

  // south sector
  this.FOREST = {
    name: 'Forest',
    upperLeft: [46, 27],
    upperRight: [96, 27],
    lowerLeft: [46, 34],
    lowerRight: [96, 34],
    mazeUpperLeft: [48, 28],
    mazeWidth: 44,
    mazeHeight: 5,
    traps: [this.TILE.SOUTH_TRAP_1, this.TILE.SOUTH_TRAP_2],
    horizontalEndPath: [[50, 33], [94, 33]],
    verticalEndPath: [[70, 32], [70, 33]]
  };

  // north sector
  this.MEADOW_HILL = {
    name: 'Meadow Hill',
    upperLeft: [46, 7],
    upperRight: [96, 7],
    lowerLeft: [46, 14],
    lowerRight: [96, 14],
    mazeUpperLeft: [46, 8],
    mazeWidth: 52,
    mazeHeight: 7,
    traps: [this.TILE.NORTH_TRAP_1, this.TILE.NORTH_TRAP_2],
    horizontalEndPath: [[53, 8], [99, 8]],
    verticalEndPath: [[70, 6], [70, 7]]
  };

  this.CENTER = {
    upperLeft: [47, 15],
    upperRight: [92, 15],
    lowerLeft: [47, 124],
    lowerRight: [92, 124]
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
    this.map[i][sector.horizontalEndPath[0][1]].onThePath = true;
  }

  // make the necessary vertical path
  for (var j = sector.verticalEndPath[0][1]; j < sector.verticalEndPath[1][1]; j += 1) {
    this.map[sector.verticalEndPath[0][0]][j].onThePath = true;
  }
};

ROT.Map.Arkham.prototype.create = function() {

  // we have to create a little submap prototype
  // in order for the callback to work
  // (since they're designed to bind this context
  var Submap = function(aWidth, aHeight) {
    // we need to add 2 because the Eller Maze
    // adds an outer boundary of walls
    // and we don't need that
    this.width = aWidth + 2;
    this.height = aHeight + 2;

    // make the map the size we want it to be
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

    var rand;
    var aChar;
    var trap = false;

    // first, let's generate a maze submap for this sector
    mySubmap = new Submap(sector.mazeWidth, sector.mazeHeight).myLilMap;

    // then, replace the corresponding section of the map with the maze
    this.replaceSubsection(sector, mySubmap);

    // great! now that we've got some mazes, it's time to tend to those
    // odd tendrils at the four corners of the map.
    // let's make some guaranteed paths from each maze to each tower
    this.makePathEnds(sector);

    // now let's fill in the non-path spaces with dense traps
    for (i = startWidth; i < endWidth; i += 1) {
      for (j = startHeight; j < endHeight; j += 1) {
        if (this.map[i][j].value !== ' ' && !this.map[i][j].onThePath) {

          rand = ROT.RNG.getUniform();
          if (rand < 0.39) {
            aChar = sector.traps[0];
            trap = true;
          }
          else if (rand < 0.69) {
            aChar = sector.traps[1];
            trap = true;
          }
          else {
            aChar = this.TILE.SAFE;
          }

          this.map[i][j].value = aChar;
          this.map[i][j].isTrap = trap;
        }
      }
    }

  }

  return this.map;
};