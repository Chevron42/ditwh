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

  // this code is duplicated in map.js!
  // try to get rid of that later!
  TILE: {
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
      FRANK: 'F',
      IWANICKI: 'I',
      LIBRARY: 'L',
      OLD_WOMAN: 'W',
      STATUE: 'S',
      UPHAM: 'U',
      DOCTOR: 'D',
      BROWN_JENKIN: 'B'
    }
  },

  init: function() {
    this.display = new ROT.Display({ width: this.MAP_WIDTH, height: this.MAP_HEIGHT, fontSize: 13 });
    document.getElementById('map').appendChild(this.display.getContainer());
    this._generateMap();
    this._makeDialogWindow();

    // move the character when a key is pressed
    this.addKeydownListener();

    // for testing
    // click on a canvas spot and get its coordinates
    window.addEventListener("mousedown", getPosition, false);

    function getPosition(event)
    {
      var x = event.pageX;
      var y = event.pageY;

      var canvas = document.getElementsByTagName("canvas")[0];

      x -= canvas.offsetLeft;
      y -= canvas.offsetTop;

      x = Math.floor(x / 8);
      y = Math.floor(y / 13);

      console.log("x:" + x + " y:" + y);
    }
  },

  _makeDialogWindow: function() {
    var dialog = $('<div id="dialog"></div>');
    $('body').append(dialog);
  },

  addKeydownListener: function() {

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

    var arkham = new ROT.Map.Arkham(this.MAP_WIDTH, this.MAP_HEIGHT);
    this.map = arkham.create();
    this.gates = {
        north1: this.map[5][70],
        south1: this.map[34][70],
        south2: this.map[35][70]
      }

    //this._drawWholeMap(arkham);
    this.drawVisibleMap();

    this._drawPlayer(this.currPos);

  },

  _drawWholeMap: function() {
    for (var x = 0; x < this.MAP_WIDTH; x += 1) {
      for (var y = 0; y < this.MAP_HEIGHT; y += 1) {
        this.display.draw(x, y, this.map[x][y].value, this.map[x][y].color);
      }
    }
  },

  drawVisibleMap: function() {
    for (var x = 0; x < this.MAP_WIDTH; x += 1) {
      for (var y = 0; y < this.MAP_HEIGHT; y += 1) {
        if (this.map[x][y].visible) {
          this.display.draw(x, y, this.map[x][y].value, this.map[x][y].color);
        }
      }
    }
  },

  _drawPlayer: function() {
    this.display.draw(this.currPos[0], this.currPos[1], '@', '#3a3');
  },

  moveNorth: function(pos) {
    var x = pos[0];
    var y = pos[1];
    var target = Game.map[x][y - 1].value;
    if (target !== ' ' && target !== 'X') {
      Game.move(Game.NORTH);
    }
  },

  moveSouth: function(pos) {
    var x = pos[0];
    var y = pos[1];
    var target = Game.map[x][y + 1].value;
    if (target !== ' ' && target !== 'X') {
      Game.move(Game.SOUTH);
    }
  },

  moveWest: function(pos) {
    var x = pos[0];
    var y = pos[1];
    var target = Game.map[x - 1][y].value;
    if (target !== ' ' && target !== 'X') {
      Game.move(Game.WEST);
    }
  },

  moveEast: function(pos) {
    var x = pos[0];
    var y = pos[1];
    var target = Game.map[x + 1][y].value;
    if (target !== ' ' && target !== 'X') {
      Game.move(Game.EAST);
    }
  },

  move: function(direction) {
    Game.currPos[0] += direction[0];
    Game.currPos[1] += direction[1];
    Game.map[Game.currPos[0]][Game.currPos[1]].visible = true;
    Game.drawVisibleMap();
    Game._drawPlayer();
    Game.checkScene();
  },

  checkScene: function() {
    var currTile = Game.map[Game.currPos[0]][Game.currPos[1]];
    if (currTile.isTrap) {
      Events.trap();
    }
    else if (currTile.scene) {
      Events.startScene(currTile);
    }
  },

  visifyTrap: function(trapChar) {
    var tile;
    for (var x = 1; x < this.MAP_WIDTH - 1; x += 1) {
      for (var y = 1; y < this.MAP_HEIGHT - 1; y += 1) {
        tile = this.map[x][y];
        if (tile.value === trapChar) {
          this.map[x][y].visible = true;
        }
      }
    }
  },

  openGate: function(gateName) {
    var gateTile = this.gates[gateName];
    gateTile.value = ".";
  }
};
