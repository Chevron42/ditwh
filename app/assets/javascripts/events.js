var Events = {
  startScene: function(sceneName) {
    var anEvent = Events.Setpieces[sceneName];
    $('#narration').text(anEvent.text);
  },
  trap: function() {
    $(window).off();
    $('#narration').text('gilman hits a trap...');
    $('canvas').animate({opacity: '0'}, 1000, 'linear', function() {
      Game.currPos = [71, 20];
      Game.drawVisibleMap();
      $('#narration').html('gilman hits a trap...<br>he awakens in his bed at the witch house.');
      $('canvas').css('opacity', '100');
      Game.addKeydownListener();
    });
  }
};

Events.Setpieces = {
  "frank": {
    text: "gilman speaks with his friend, frank elwood."
  },
  "iwanicki": {
    text: "father iwanicki gives gilman a crucifix."
  },
  "library": {
    text: "gilman spends a late night studying at the library."
  },
  "old woman": {
    text: "gilman sees an old woman in the alleyway."
  },
  "statuette": {
    text: "gilman finds a strange statuette in his room."
  },
  "upham": {
    text: "gilman visits the office of professor upham."
  },
  "doctor": {
    text: "the university doctor tells gilman he needs more rest."
  },
  "brown jenkin": {
    text: "gilman sees a rat with a human face."
  }
};