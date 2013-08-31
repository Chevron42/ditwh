// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function() {

  var Game = {
    display: null,
    map: [],
    MAP_WIDTH: 140,
    MAP_HEIGHT: 40,

    init: function() {
        this.display = new ROT.Display({ width: this.MAP_WIDTH, height: this.MAP_HEIGHT, fontSize: 13 });
        document.body.appendChild(this.display.getContainer());
        this._generateMap();
    },

    _generateMap: function() {

      var arkham = new ROT.Map.Arkham(anEmptyMap);

      map.create(this.arkhamCallback.bind(this));
      this._drawWholeMap();

    },

    arkhamCallback: function(x, y, value) {
      this.map[i][j] = value;
    },

    _drawWholeMap: function() {
      for (var x=0; x<this.MAP_WIDTH; x+=1) {
        for (var y=0; y<this.MAP_HEIGHT; y+=1) {
          this.display.draw(x, y, this.map[x][y]);
        }
      }
    } // end drawWholeMap

  };

  Game.init();

});
