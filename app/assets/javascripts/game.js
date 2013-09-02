var Game = {
  display: null,
  map: [],
  MAP_WIDTH: 141,
  MAP_HEIGHT: 41,
  player: null,

  init: function() {
    this.display = new ROT.Display({ width: this.MAP_WIDTH, height: this.MAP_HEIGHT, fontSize: 13 });
    document.body.appendChild(this.display.getContainer());
    this._generateMap();
  },

  _generateMap: function() {

    var arkham = new ROT.Map.Arkham(this.MAP_WIDTH, this. MAP_HEIGHT);
    arkham.create();

    this._drawWholeMap(arkham);

    this._createPlayer();

  },

  _drawWholeMap: function(map) {
    for (var x = 0; x < map.WIDTH; x += 1) {
      for (var y = 0; y < map.HEIGHT; y += 1) {
        this.display.draw(x, y, map.map[x][y].value);
      }
    }
  }, // end drawWholeMap

  _createPlayer: function() {
    // MAKE THESE PARAMS DYNAMIC
    this.player = new Player(71, 21);
  }

};