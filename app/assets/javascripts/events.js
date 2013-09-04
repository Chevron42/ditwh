var Events = {
  startScene: function(sceneName) {
    var anEvent = Events.Setpieces[sceneName];
    $('#narration').text(anEvent.text);
  },
  trap: function() {
    $('#narration').text('walter gilman awakens in his bed at the witch house.');
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