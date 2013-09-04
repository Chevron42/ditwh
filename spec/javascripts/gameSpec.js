describe ("A game's", function() {

  describe ("moveNorth function", function() {

    beforeEach(function() {
      Game.init();
    });

    it ("moves the player up one tile if north tile is free", function() {
      Game.currPos = [71, 20];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(Game.currPos).toEqual([71, 19]);
    });

    it ("does not move the player if the north tile is a wall", function() {
      Game.currPos = [34, 6];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(Game.currPos).toEqual([34, 6]);
    });

  });

  describe ("moveSouth function", function() {

    beforeEach(function() {
      Game.init();
    });

    it ("moves the player down one tile if south tile is free", function() {
      Game.currPos = [71, 20];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(Game.currPos).toEqual([71, 21]);
    });

    it ("does not move the player if the south tile is a wall", function() {
      Game.currPos = [38, 32];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(Game.currPos).toEqual([38, 32]);
    });

  });

  describe ("moveWest function", function() {

    beforeEach(function() {
      Game.init();
    });

    it ("moves the player left one tile if west tile is free", function() {
      Game.currPos = [71, 20];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(Game.currPos).toEqual([70, 20]);
    });

    it ("does not move the player if the west tile is a wall", function() {
      Game.currPos = [93, 7];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(Game.currPos).toEqual([93, 7]);
    });

  });

  describe ("moveEast function", function() {

    beforeEach(function() {
      Game.init();
    });

    it ("moves the player right one tile if east tile is free", function() {
      Game.currPos = [71, 20];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(Game.currPos).toEqual([72, 20]);
    });

    it ("does not move the player if the east tile is a wall", function() {
      Game.currPos = [95, 7];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(Game.currPos).toEqual([95, 7]);
    });

  });

  describe ("move function", function() {

  });

});