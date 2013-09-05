var Events = {
  eventPanel: $('#eventPanel'),
  eventTitle: $('#eventPanel.modal-title'),
  eventContent: $('#eventPanel.modal-body'),

  startScene: function(sceneName) {
    console.log('window off');
    $(window).off();
    var anEvent = Events.Setpieces[sceneName];
    var passed = false;
    $('#narration').text(anEvent.text);

    eventTitle.text(anEvent.title);
    eventContent.text(anEvent.text);
    eventPanel.modal('show');

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
    text: "\"i won't tell you again, gilman, that book is off limits to students.\" " +
    "gilman could see this wasn't getting him anywhere. but what if he tried a different tactic? " +
    "he relaxed into his chair and began to discuss...",
    trapReward: '+',
    answers: ['poker', 'cards', 'gambling'],

    success: "suddenly, professor upham seemed to open up. \"alright, boy, i'll tell you this, and only this. " +
    "'the gate lies where science and superstition meet, at the clock's clockwise three.' " +
    "it's all my adviser told me, and it's all you're getting. i won't be responsible for what happens to you if " +
    "you open that book.",

    failure: "professor upham quickly shuttled gilman out the door."
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