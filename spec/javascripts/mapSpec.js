var emptyMap = [];

jQuery.get('http://localhost/index.html', function(data) {
  emptyMap = data;
});

var map = new ROT.Map.Arkham(141, 41, emptyMap);

describe("a map of Arkham", function() {

  it("is 141 characters wide and 41 characters high", function() {
    expect(map._width).toEqual(141);
    expect(map._height).toEqual(41);
  });

  it("always has a path to the eastern tower", function() {
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

  it("always has a path to the western tower", function() {
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

  it("always has a path to the southern tower", function() {
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

  it("always has a path to the northern tower", function() {
    var path = true;
    for (var i = 0; i < 1000; i += 1) {
      map.create();
      if (!map.pathfind('N')) {
        path = false;
        break;
      }
    }
    expect(path).toBe(true);
  });

});