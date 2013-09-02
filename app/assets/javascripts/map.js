//= require rot

ROT.Map.Arkham = function (width, height, anEmptyMap) {
  var i = 0,
    this_width = width,
    j,
    this_height;
  this.WIDTH = width;
  this.HEIGHT = height;
  ROT.Map.call(this, this.WIDTH, this.HEIGHT);
  this._map = [];

  // generate an empty map from the given parameter

  for (i; i < this_width; i += 1) {
    this_height = this.HEIGHT;
    this._map[i] = [];
    for (j = 0; j < this_height; j += 1) {
      this._map[i].push(anEmptyMap[i][j]);
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
    SOUTH_TRAP_2: ':',
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

  this.MISKATONIC_U = {
    upperLeft: [9, 0],
    upperRight: [46, 0],
    lowerLeft: [9, 41],
    lowerRight: [46, 41],
    traps: [this.TILE.WEST_TRAP_1, this.TILE.WEST_TRAP_2]
  };

  this.ARKHAM_SQ = {
    upperLeft: [94, 0],
    upperRight: [130, 0],
    lowerLeft: [94, 130],
    lowerRight: [130, 130],
    traps: [this.TILE.EAST_TRAP_1, this.TILE.EAST_TRAP_2]
  };

  this.MEADOW_HILL = {
    upperLeft: [16, 125],
    upperRight: [92, 125],
    lowerLeft: [16, 131],
    lowerRight: [92, 131],
    traps: [this.TILE.SOUTH_TRAP_1, this.TILE.SOUTH_TRAP_2]
  };

  this.FOREST = {
    upperLeft: [47, 7],
    upperRight: [92, 7],
    lowerLeft: [47, 14],
    lowerRight: [92, 14],
    traps: [this.TILE.NORTH_TRAP_1, this.TILE.NORTH_TRAP_2]
  };

  this.CENTER = {
    upperLeft: [47, 15],
    upperRight: [92, 15],
    lowerLeft: [47, 124],
    lowerRight: [92, 124]
  };

  this.SECTORS = [this.MISKATONIC_U, this.ARKHAM_SQ, this.MEADOW_HILL, this.FOREST];

  return this;
};

ROT.Map.Arkham.extend(ROT.Map);

ROT.Map.Arkham.prototype.create = function() {

  for (var s = 0; s < this.SECTORS.length; s += 1) {
    var sector = this.SECTORS[s];
    var startWidth = sector.upperLeft[0];
    var endWidth = sector.upperRight[0];
    var startHeight = sector.upperLeft[1];
    var endHeight = sector.lowerRight[1];
    var rand;
    var tile;
    for (var i = startWidth; i < endWidth; i += 1) {
      for (var j = startHeight; j < endHeight; j += 1) {
        if (this._map[i][j] !== ' ') {

          rand = ROT.RNG.getUniform();
          if (rand < 0.19) { tile = sector.traps[0]; }
          else if (rand < 0.39) { tile = sector.traps[1]; }
          else { tile = this.TILE.SAFE; }

          this._map[i][j] = tile;

        }
      }
    }
  }

  return this._map;
};
