//= require rot

ROT.Map.Arkham = function(width, height, anEmptyMap) {
  this.WIDTH = width;
  this.HEIGHT = height;
  ROT.Map.call(this, this.WIDTH, this.HEIGHT);
  this._map = [];

  // generate an empty map from the given parameter
  for (var i=0; i<this.WIDTH; i+=1) {
    this._map[i] = [];
    for (var j=0; j<this.HEIGHT; j+=1) {
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
    upperLeft: [0, 0],
    upperRight: [46, 0],
    lowerLeft: [0, 40],
    lowerRight: [46, 40],
    traps: [this.TILE.WEST_TRAP_1, this.TILE.WEST_TRAP_2]
  };

  this.ARKHAM_SQ = {
    upperLeft: [93, 0],
    upperRight: [140, 0],
    lowerLeft: [93, 140],
    lowerRight: [140, 140],
    traps: [this.TILE.EAST_TRAP_1, this.TILE.EAST_TRAP_2]
  };

  this.HILLTOP = {
    upperLeft: [47, 125],
    upperRight: [92, 125],
    lowerLeft: [47, 140],
    lowerRight: [92, 140],
    traps: [this.TILE.SOUTH_TRAP_1, this.TILE.SOUTH_TRAP_2]
  };

  this.FOREST = {
    upperLeft: [47, 0],
    upperRight: [92, 0],
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

  this.SECTORS = [this.MISKATONIC_U, this.ARKHAM_SQ, this.FOREST, this.HILLTOP];

  return this;
};

ROT.Map.Arkham.extend(ROT.Map);

ROT.Map.Arkham.prototype.create = function() {

  // generate map for each sector

  for (var i = 0; i < this.SECTORS.length; i += 1) {
    var sector = this.SECTORS[i];
    for (var j = sector.upperLeft[0]; j < sector.upperRight[0]; i += 1) {
      for (var k = sector.upperLeft[1]; k < sector.lowerLeft[1]; k += 1) {
        var rand = Math.random();
        var tile;
        if (rand < 0.39) {
          tile = sector.traps[0];
        }
        else if (rand >= 0.39 && rand < 0.79) {
          tile = sector.traps[1];
        }
        else {
          tile = this.TILE.SAFE;
        }
        // this._map[j][k] = tile;
      }
    }
  }

  debugger;
  return _map;
};
