var Game = {
  display: null,
  map: [],
  MAP_WIDTH: 141,
  MAP_HEIGHT: 41,
  currPos: [71, 20], // initial player position

  NORTH: [0, -1],
  SOUTH: [0, 1],
  EAST: [1, 0],
  WEST: [-1, 0],

  init: function() {
    this.display = new ROT.Display({ width: this.MAP_WIDTH, height: this.MAP_HEIGHT, fontSize: 13 });
    document.body.appendChild(this.display.getContainer());
    this._generateMap();

    $(window).keydown(function(event) {
      var key = event.which;
      if (key === 38) {
        // up
        Game.moveNorth(Game.currPos);
      }
      else if (key === 40) {
        // down
        Game.moveSouth(Game.currPos);
      }
      else if (key === 37) {
        // left
        Game.moveWest(Game.currPos);
      }
      else if (key === 39) {
        // right
        Game.moveEast(Game.currPos);
      }
      else {}
    });
  },

  _generateMap: function() {

    var arkham = new ROT.Map.Arkham(this.MAP_WIDTH, this. MAP_HEIGHT);
    this.map = arkham.create();

    this._drawWholeMap(arkham);
    // The following function expects arkham, not arkham.map
    // this._drawVisibleMap();

    this._drawPlayer(this.currPos);

  },

  _drawWholeMap: function(map) {
    for (var x = 0; x < map.WIDTH; x += 1) {
      for (var y = 0; y < map.HEIGHT; y += 1) {
        this.display.draw(x, y, map.map[x][y].value);
      }
    }
  },

  _drawVisibleMap: function() {
    for (var x = 0; x < this.MAP_WIDTH; x += 1) {
      for (var y = 0; y < this.MAP_HEIGHT; y += 1) {
        if (this.map[x][y].visible) {
          this.display.draw(x, y, this.map[x][y].value);
        }
      }
    }
  },

  _drawPlayer: function() {
    this.display.draw(this.currPos[0], this.currPos[1], '@');
  },

  moveNorth: function(pos) {
    var x = pos[0];
    var y = pos[1];
    if (Game.map[x][y - 1].value !== ' ') {
      Game.move(Game.NORTH);
    }
  },

  moveSouth: function(pos) {
    var x = pos[0];
    var y = pos[1];
    if (Game.map[x][y - 1].value !== ' ') {
      Game.move(Game.SOUTH);
    }
  },

  moveWest: function(pos) {
    var x = pos[0];
    var y = pos[1];
    if (Game.map[x][y - 1].value !== ' ') {
      Game.move(Game.WEST);
    }
  },

  moveEast: function(pos) {
    var x = pos[0];
    var y = pos[1];
    if (Game.map[x][y - 1].value !== ' ') {
      Game.move(Game.EAST);
    }
  },

  move: function(direction) {
    Game.currPos[0] += direction[0];
    Game.currPos[1] += direction[1];
    Game.map[Game.currPos[0]][Game.currPos[1]].visible = true;
    // Game.checkScene();
    Game._drawVisibleMap();
    Game._drawPlayer();
  }
};