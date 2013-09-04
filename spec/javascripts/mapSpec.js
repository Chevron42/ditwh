var emptyMap = [];

jQuery.get('http://localhost/index.html', function(data) {
  emptyMap = data;
});

var map = new ROT.Map.Arkham(141, 41, emptyMap);
map.create();

describe("a map of Arkham", function() {

  it("is 141 characters wide and 41 characters high", function() {
    expect(map._width).toEqual(141);
    expect(map._height).toEqual(41);
  });

  xit("always has a path to the eastern tower", function() {
    var path = true;
    for (var i = 0; i < 1000; i += 1) {
      map.create();
      if (!map.pathfind('E')) {
        path = false;
        break;
      }
    }
    expect(path).toBe(true);
  });

  xit("always has a path to the western tower", function() {
    var path = true;
    for (var i = 0; i < 1000; i += 1) {
      map.create();
      if (!map.pathfind('W')) {
        path = false;
        break;
      }
    }
    expect(path).toBe(true);
  });

  xit("always has a path to the southern tower", function() {
    var path = true;
    for (var i = 0; i < 1000; i += 1) {
      map.create();
      if (!map.pathfind('S')) {
        path = false;
        break;
      }
    }
    expect(path).toBe(true);
  });

  xit("always has a path to the northern tower", function() {
    var path = true;
    // for (var i = 0; i < 1000; i += 1) {
      map.create();
      if (!map.pathfind('N')) {
        path = false;
        // break;
      // }
    }
    expect(path).toBe(true);
  });

  it("has 8 scripted events in the center section", function() {

    var eventCount = 0;

    for (var i = map.CENTER.upperLeft[0]; i < map.CENTER.upperRight[0]; i += 1) {
      for (var j = map.CENTER.upperLeft[1]; j < map.CENTER.lowerLeft[1]; j += 1) {
        if (map[i][j].value !== '.') { eventCount += 1; }
      }
    }

    expect(eventCount.toEqual(8));

  });

  it("has all unique events in the center section", function() {
    var allUnique = true;
    var events = [];

    for (var i = map.CENTER.upperLeft[0]; i < map.CENTER.upperRight[0]; i += 1) {
      for (var j = map.CENTER.upperLeft[1]; j < map.CENTER.lowerLeft[1]; j += 1) {
        var aVal = map[i][j].value;
        if (aVal !== '.') {
          if (events.indexOf(aVal) !== -1) {
            events.push(aVal);
          }
          else {
            allUnique = false;
            break;
          }
        }
      }
    }

    expect(allUnique).toBe(true);
  });

});