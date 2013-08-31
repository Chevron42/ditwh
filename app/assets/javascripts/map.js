//= require rot

ROT.Map.Arkham = function(width, height, anEmptyMap) {
  this.WIDTH = width;
  this.HEIGHT = height;
  ROT.Map.call(this, this.WIDTH, this.HEIGHT);
  this._map = [];
  for (var i=0; i<this.HEIGHT; i+=1) {
    this._map[i] = [];
    for (var j=0; j<this.WIDTH; j+=1) {
      this._map[i].push(anEmptyMap[i][j]);
    }
  }
  return this;
};

ROT.Map.Arkham.extend(ROT.Map);

ROT.Map.Arkham.prototype.create = function(callback) {

  // this._map = this._fillMap(1);
  // var w = this._width - 1;
  // var h = this._height - 1;

  //this will be where random gen of map quadrants occurs

  if (callback) {
    for (var i = 0; i <= h; i++) {
      for (var j = 0; j <= w; j++) {
        callback(j, i, this._map[j][i]);
      }
    }
  }
  return this;
};
