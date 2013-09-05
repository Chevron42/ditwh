var emptyMap = [];

jQuery.get('http://localhost/index.html', function(data) {
  emptyMap = data;
});

var arkham = new ROT.Map.Arkham(141, 41, emptyMap);

xdescribe("a map of Arkham", function() {

  beforeEach(function() {
    arkham = new ROT.Map.Arkham(141, 41, emptyMap);
    arkham.create();
  });

  it("is 141 characters wide and 41 characters high", function() {
    expect(arkham._width).toEqual(141);
    expect(arkham._height).toEqual(41);
  });

  // xit("always has a path to the eastern tower", function() {
  //   var path = true;
  //   for (var i = 0; i < 1000; i += 1) {
  //     arkham.create();
  //     if (!arkham.pathfind('E')) {
  //       path = false;
  //       break;
  //     }
  //   }
  //   expect(path).toBe(true);
  // });

  // xit("always has a path to the western tower", function() {
  //   var path = true;
  //   for (var i = 0; i < 1000; i += 1) {
  //     arkham.create();
  //     if (!arkham.pathfind('W')) {
  //       path = false;
  //       break;
  //     }
  //   }
  //   expect(path).toBe(true);
  // });

  // xit("always has a path to the southern tower", function() {
  //   var path = true;
  //   for (var i = 0; i < 1000; i += 1) {
  //     arkham.create();
  //     if (!arkham.pathfind('S')) {
  //       path = false;
  //       break;
  //     }
  //   }
  //   expect(path).toBe(true);
  // });

  // xit("always has a path to the northern tower", function() {
  //   var path = true;
  //   // for (var i = 0; i < 1000; i += 1) {
  //     arkham.create();
  //     if (!arkham.pathfind('N')) {
  //       path = false;
  //       // break;
  //     // }
  //   }
  //   expect(path).toBe(true);
  // });

  it("always has 8 scripted events + the witch house in the center section", function() {
    var allCorrectCounts = true;

    for (var k = 0; k < 1000; k += 1) {
      arkham.create();
      var eventCount = 0;

      for (var i = arkham.CENTER.upperLeft[0]; i <= arkham.CENTER.upperRight[0]; i += 1) {
        for (var j = arkham.CENTER.upperLeft[1]; j <= arkham.CENTER.lowerLeft[1]; j += 1) {
          if (arkham.map[i][j].value !== '.') { eventCount += 1; }
        }
      }

      if (eventCount !== 9) {
        allCorrectCounts = false;
      }
    }

    expect(allCorrectCounts).toBe(true);
  });

  it("always has all unique events in the center section", function() {
    var alwaysAllUnique = true;
    var events = [];
    var aVal = '';

    for (var k = 0; k < 1000; k += 1) {
      console.log(k);
      arkham.create();
      events = [];

      for (var i = arkham.CENTER.upperLeft[0]; i < arkham.CENTER.upperRight[0]; i += 1) {
        for (var j = arkham.CENTER.upperLeft[1]; j < arkham.CENTER.lowerLeft[1]; j += 1) {
          aVal = arkham.map[i][j].value;
          if (aVal !== '.') {
            if (events.indexOf(aVal) === -1) { //
              events.push(aVal);
            }
            else {
              alwaysAllUnique = false;
            }
          }
        }
      }
    }

    expect(alwaysAllUnique).toBe(true);
  });

});