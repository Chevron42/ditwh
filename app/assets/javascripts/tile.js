var Tile = function(aValue) {
  this.value = aValue;
  this.hasScene = (this.value === ' ') ? false : true;
  this.visited = false;
  // this.onThePath = false;
  this.isTrap = false;
  this.scene = null;
};