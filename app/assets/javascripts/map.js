//= require rot

ROT.Map.Arkham = function(anEmptyMap) {
  var WIDTH = 140;
  var HEIGHT = 40;
  ROT.Map.call(this, this.WIDTH, this.HEIGHT);
  for (var i=0; i<WIDTH; i+=1) {
    for (var j=0; j<HEIGHT; j+=1) {
      this._map[i][j] = anEmptyMap[i][j];
    }
  }
  return this;
};

ROT.Map.Arkham.extend(ROT.Map);

ROT.Map.Arkham.prototype.create = function(callback) {

  this._map = this._fillMap(1);
  var w = this._width - 1;
  var h = this._height - 1;

  //this will be where random gen of map quadrants occurs

  if (callback) {
    for (var i = 0; i <= w; i++) {
      for (var j = 0; j <= h; j++) {
        // debugger;
        callback(i, j, this._map[i][j]);
      }
    }
  }

  return this;
};
