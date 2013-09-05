var Events = {
  startScene: function(sceneName) {
    console.log('window off');
    $(window).off();
    var anEvent = Events.Setpieces[sceneName];
    var passed = false;
    $('#narration').text(anEvent.text);
    passed = true;
    if (passed) {
      console.log('about to visify');
      Game.visifyTrap(anEvent.trapReward);
      this.goHome();
    }
  },

  goHome: function() {
    $('canvas').animate({opacity: '0'}, 1000, 'linear', function() {
      Game.currPos = [71, 20];
      Game.drawVisibleMap();
      $('canvas').css('opacity', '100');
      Game.addKeydownListener();
    });
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
    text: "gilman speaks with his friend, frank elwood.",
    trapReward: '#'
  },
  "iwanicki": {
    text: "father iwanicki gives gilman a crucifix.",
    trapReward: '<'
  },
  "library": {
    text: "gilman spends a late night studying at the library.",
    trapReward: '>'
  },
  "old woman": {
    text: "gilman sees an old woman in the alleyway.",
    trapReward: '*'
  },
  "statuette": {
    text: "gilman finds a strange statuette in his room.",
    trapReward: '\\'
  },
  "upham": {
    text: "gilman visits the office of professor upham.",
    trapReward: '+'
  },
  "doctor": {
    text: "the university doctor tells gilman he needs more rest.",
    trapReward: '='
  },
  "brown jenkin": {
    text: "gilman sees a rat with a human face.",
    trapReward: '/'
  }
};