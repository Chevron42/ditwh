var Tile = function(aValue) {
  this.value = aValue;
  this.visible = false;
  this.onThePath = false;
  this.isTrap = false;
  this.scene = null;

  this.setScene = function(char, scene) {
    this.value = char;
    this.scene = scene;
  };
};