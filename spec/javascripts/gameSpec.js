describe ("a game's", function() {
  var game;

  beforeEach(function() {
    game = Game.init();
  });

  describe ("moveNorth function", function() {

    it ("moves the player up one tile if north tile is free", function() {
      this.game.currPos = [71, 21];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(this.game.currPos).toBe([71, 20]);
    });

    it ("does not move the player if the north tile is a wall", function() {
      this.game.currPos = [34, 6];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(this.game.currPos).toBe([34, 6]);
    });

  });

  describe ("moveSouth function", function() {

    it ("moves the player down one tile if south tile is free", function() {
      this.game.currPos = [71, 21];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(this.game.currPos).toBe([71, 22]);
    });

    it ("does not move the player if the south tile is a wall", function() {
      this.game.currPos = [34, 6];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(this.game.currPos).toBe([34, 6]);
    });

  });

  describe ("moveWest function", function() {

    it ("moves the player left one tile if west tile is free", function() {
      this.game.currPos = [71, 21];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(this.game.currPos).toBe([71, 20]);
    });

    it ("does not move the player if the west tile is a wall", function() {
      this.game.currPos = [34, 6];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(this.game.currPos).toBe([34, 6]);
    });

  });

  describe ("moveEast function", function() {

    it ("moves the player right one tile if east tile is free", function() {
      this.game.currPos = [71, 21];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(this.game.currPos).toBe([71, 20]);
    });

    it ("does not move the player if the east tile is a wall", function() {
      this.game.currPos = [34, 6];
      var e = jQuery.Event("keydown");
      e.which = 38;
      $(window).trigger(e);
      expect(this.game.currPos).toBe([34, 6]);
    });

  });

  describe ("move function", function() {

  });

});