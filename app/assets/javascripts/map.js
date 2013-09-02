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
    upperLeft: [9, 0],
    upperRight: [46, 0],
    lowerLeft: [9, 41],
    lowerRight: [46, 41],
    mazeUpperLeft: [19, 19],
    mazeWidth: 27,
    mazeHeight: 21,
    traps: [this.TILE.WEST_TRAP_1, this.TILE.WEST_TRAP_2]
  };

  // east sector
  this.ARKHAM_SQ = {
    upperLeft: [97, 0],
    upperRight: [130, 0],
    lowerLeft: [97, 41],
    lowerRight: [130, 41],
    mazeUpperLeft: [97, 11],
    mazeWidth: 23,
    mazeHeight: 21,
    traps: [this.TILE.EAST_TRAP_1, this.TILE.EAST_TRAP_2]
  };

  // south sector
  this.FOREST = {
    upperLeft: [46, 28],
    upperRight: [96, 28],
    lowerLeft: [46, 35],
    lowerRight: [96, 35],
    mazeUpperLeft: [55, 28],
    mazeWidth: 52,
    mazeHeight: 4,
    traps: [this.TILE.SOUTH_TRAP_1, this.TILE.SOUTH_TRAP_2]
  };

  // north sector
  this.MEADOW_HILL = {
    upperLeft: [46, 7],
    upperRight: [96, 7],
    lowerLeft: [46, 14],
    lowerRight: [96, 14],
    mazeUpperLeft: [46, 29],
    mazeWidth: 40,
    mazeHeight: 4,
    traps: [this.TILE.NORTH_TRAP_1, this.TILE.NORTH_TRAP_2]
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

ROT.Map.Arkham.prototype.create = function () {

  // we have to create a little submap prototype
  // in order for the callback to work
  // (since they're designed to bind this context)
  var Submap = function(width, height) {

    var myLilMap = [];

    var mazeCallback = function(x, y, value) {
      var tile;
      var rand;

      if (value === 0) {
        tile = new Tile('.');
        tile.onThePath = true;
      }
      else {
        // give the walls a placeholder value
        tile = new Tile('~');
      }
      this.myLilMap[x][y] = tile;
    };

    var em = new ROT.Map.EllerMaze(width, height);
    em.create(mazeCallback.bind(this));

  };

  // takes an Eller Maze and replaces the appropriate
  // section of the map
  // XXX
  // these submap variables are a dirty hack, any way around it...?
  var replaceSubsection = function(sector, submap) {
    var theMap = submap.myLilMap;

    var submapI = 0;
    for (var i = sector.mazeUpperLeft[0]; i < sector.mazeWidth; i += 1) {

      var submapJ = 0;
      for (var j = sector.mazeUpperLeft[1]; j < sector.mazeHeight; j += 1) {
        this.map[i][j] = submap[submapI][submapJ];
        submapJ += 1;
      }

      submapI += 1;
    }
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
    replaceSubsection(sector, mySubmap);

    // now let's fill in the non-path spaces with dense traps
    for (i = startWidth; i < endWidth; i += 1) {
      for (j = startHeight; j < endHeight; j += 1) {
        if (this.map[i][j].value !== ' ' && this.map[i][j].onThePath === false) {

          rand = ROT.RNG.getUniform();
          if (rand < 0.29) {
            aChar = sector.traps[0];
            trap = true;
          }
          else if (rand < 0.59) {
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
