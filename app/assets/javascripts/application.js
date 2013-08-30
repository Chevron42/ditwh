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

ROT.Map.Arkham = function(width, height) {
  ROT.Map.call(this, width, height);

  this._map = this._fillMap(0);
};

ROT.Map.Cellular.extend(ROT.Map);

$(function() {

  // debugger;

  var Game = {
    display: null,
    map: {},

    init: function() {
        this.display = new ROT.Display({ width: 130, height: 40, fontSize: 13 });
        document.body.appendChild(this.display.getContainer());
        this._generateMap();
    },

    _generateMap: function() {

      var w = 130, h = 40;
      var map = new ROT.Map(w, h);

      /* cells with 1/2 probability */
      map.randomize(0.5);

      var cellback = function(x, y, value) {
          if (value) { return; }

          var key = x+","+y;
          this.map[key] = ".";
      };

      map.create(cellback.bind(this));

      this._drawWholeMap();

    },

    _drawWholeMap: function() {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
        }
    }
  };

  Game.init();

});
