//= require rot
//= require_ tree .

var Player = function(pos) {
    this._x = pos[0];
    this._y = pos[1];
    this._draw();
};

Player.prototype._draw = function() {
  Game.display.draw(this._x, this._y, "@", "#fff");
};

Player.prototype.handleEvent = function(e) {
    var keyMap = {};
    keyMap[38] = 0;
    keyMap[39] = 2;
    keyMap[40] = 4;
    keyMap[37] = 6;

    var code = e.keyCode;
    /* one of numpad directions? */
    if (!(code in keyMap)) { return; }

    /* is there a free space? */
    var dir = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + dir[0];
    var newY = this._y + dir[1];
    var newKey = newX + "," + newY;
    if (!(newKey in Game.map)) { return; }

    Game.display.draw(this._x, this._y, Game.map[this._x+","+this._y]);
    this._x = newX;
    this._y = newY;
    this._draw();

    window.removeEventListener("keydown", this);
    Game.engine.unlock();
};