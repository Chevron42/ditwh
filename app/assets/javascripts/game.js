var Game = {
  display: null,
  map: [],
  MAP_WIDTH: 141,
  MAP_HEIGHT: 41,
  currPos: [71, 21], // initial player position

  init: function() {
    this.display = new ROT.Display({ width: this.MAP_WIDTH, height: this.MAP_HEIGHT, fontSize: 13 });
    document.body.appendChild(this.display.getContainer());
    this._generateMap();

    $(window).keydown(function(event) {
      var key = event.which;
      if (key === 38) {
        // up
      }
      else if (key === 40) {
        // down
        console.log('down');
      }
      else if (key === 37) {
        // left
        console.log('left');
      }
      else if (key === 39) {
        // right
        console.log('right');
      }
    });
  },

  _generateMap: function() {

    var arkham = new ROT.Map.Arkham(this.MAP_WIDTH, this. MAP_HEIGHT);
    arkham.create();

    // this._drawWholeMap(arkham);
    this._drawVisibleMap(arkham);

    this._drawPlayer(this.currPos);

  },

  _drawWholeMap: function(map) {
    for (var x = 0; x < map.WIDTH; x += 1) {
      for (var y = 0; y < map.HEIGHT; y += 1) {
        this.display.draw(x, y, map.map[x][y].value);
      }
    }
  },

  _drawVisibleMap: function(map) {
    for (var x = 0; x < map.WIDTH; x += 1) {
      for (var y = 0; y < map.HEIGHT; y += 1) {
        if (map.map[x][y].visible) {
          this.display.draw(x, y, map.map[x][y].value);
        }
      }
    }
  },

  _drawPlayer: function(pos) {
    this.display.draw(pos[0], pos[1], '@');
  },

  _moveNorth: function() {

  },

  _moveSouth: function() {

  },

  _moveWest: function() {

  },

  _moveEast: function() {

  },

  move: function() {

  }
};