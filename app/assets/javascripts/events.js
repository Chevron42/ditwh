var Events = {
  startScene: function(sceneName) {
    $(window).off();
    var anEvent = Events.Setpieces[sceneName];
    var passed = false;

    $('#eventPanel .modal-title').text(anEvent.title);
    $('#eventPanel .modal-body').text(anEvent.text);
    $('#eventPanel').modal({ backdrop: 'static', keyboard: true });

    $('#guess-button').off();
    $('#guess-button').click(function() {
      var guess = $('#guess').val();
      passed = anEvent.answers.indexOf(guess) !== -1 ? true : false;

      if (passed) {
        Game.visifyTrap(anEvent.trapReward);
        $('#narration').text(anEvent.success);
      }
      else {
        $('#narration').text(anEvent.failure);
      }

      $('#eventPanel').modal('hide');
      $('#guess').val('');
      Events.goHome();
    });

  },

  checkGuess: function(answers) {
    var guess = $('#guess').val();
    return (answers.indexOf(guess) !== -1) ? true : false;
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
    title: "frank elwood",
    text: "gilman speaks with his friend, frank elwood.",
    trapReward: '#',
    answers: ['correct'],
    success: 'success',
    failure: 'failure'
  },

  "iwanicki": {
    title: "father iwanicki",
    text: "father iwanicki gives gilman a crucifix.",
    trapReward: '<',
    answers: ['correct'],
    success: 'success',
    failure: 'failure'
  },

  "library": {
    title: "miskatonic university library",
    text: "gilman spends a late night studying at the library.",
    trapReward: '>',
    answers: ['correct'],
    success: 'success',
    failure: 'failure'
  },

  "old woman": {
    title: "the old woman in the alley",
    text: "gilman sees an old woman in the alleyway.",
    trapReward: '*',
    answers: ['correct'],
    success: 'success',
    failure: 'failure'
  },

  "statuette": {
    title: "the strange statuette",
    text: "gilman finds a strange statuette in his room.",
    trapReward: '\\',
    answers: ['correct'],
    success: 'success',
    failure: 'failure'
  },

  "upham": {
    title: "professor upham",
    text: "\"i won't tell you again, gilman, that book is off limits to students.\" " +
    "gilman could see this wasn't getting him anywhere. but what if he tried a different tactic? " +
    "he relaxed into his chair and began to discuss...",
    trapReward: '+',
    answers: ['poker', 'cards', 'gambling'],

    success: "suddenly, professor upham seemed to open up. \"alright, boy, i'll tell you this, and only this. " +
    "'at the clock's clockwise three, where science and stories meet.' " +
    "it's all my adviser told me, and it's all you're getting. i won't be responsible for what happens to you if " +
    "you open that book.\"",

    failure: "professor upham quickly shuttled gilman out the door."
  },

  "doctor": {
    title: "arkham town doctor",
    text: "the university doctor tells gilman he needs more rest.",
    trapReward: '=',
    answers: ['correct'],
    success: 'success',
    failure: 'failure'
  },

  "brown jenkin": {
    title: "brown jenkin",
    text: "gilman sees a rat with a human face.",
    trapReward: '/',
    answers: ['correct'],
    success: 'success',
    failure: 'failure'
  }
};