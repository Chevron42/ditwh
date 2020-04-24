var Tile = function(aValue) {

  this.value = aValue;
  this.visible = false;
  this.onThePath = false;
  this.isTrap = false;
  this.isGate = false;
  this.scene = null;
  this.color = '#fff';

  this.setScene = function(char, scene) {
    this.value = char;
    this.scene = scene;
  };

  this.setColor = function() {
    var val = this.value;
    if (val === '&' || val === '?') {
      this.color = '#3a3';
    }
    else if (val === '‡') {
      this.color = '#0cf';
    }
    else if (val === 'Ω') {
      this.color = '#c3c';
    }
  };

  this.goDark = function() {
    this.color = '#555';
    this.scene = null;
  };

};